import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/User.js';


const generateToken = (user) => {
    return Jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log('📝 Registration attempt:', { name, email, phone, });

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Name, Email and password are required'
            });
        }

        console.log('🔍 Checking for existing user:', email);
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.log('❌ User already exists');
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }
        console.log('🔍 Existing user check: not found');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('🔐 Password hashed successfully');

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone: phone || null,
            address: address || null,
            role: 'customer',
            isActive: true
        });

        console.log('✅ User created:', user.id, user.email);

        const token = Jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        console.log('✅ Token generated');


        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                isActive: user.isActive
            }

        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: 'Register failed'
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('📝 Login attempt:', email);


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }
        const user = await User.findOne({ where: { email: email.toLowerCase() } });


        console.log('🔍 User found:', user ? 'Yes' : 'No');

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                error: 'Account has been deactivated'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('🔐 Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        await user.update({ lastLogin: new Date() });

        const token = Jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }

        );
        console.log('✅ Login successful:', user.email);
        const { password: _, ...userWithoutPassword } = user.toJSON();


        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'login failed'
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                lastLogin: user.lastLogin
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;


        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    error: 'Email already taken by another user'
                });
            }

        }
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.json({
            message: 'Profil updated successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            error: 'Server error during profile update'
        });
    }
}



export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;



        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(401).json({
                error: 'Current password is incorrect'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();


        res.json({
            message: 'Password change successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            error: 'Server error during password change'
        });
    }


};
export const logout = (req, res) => {
    res.json({
        message: 'Logout successful'
    });
};