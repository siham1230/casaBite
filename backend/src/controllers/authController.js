import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../Models/User.js';


const generateToken = (user) => {
    return Jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export const register = async (req, res) => {
    try {
        console.log('📝 Registration attempt:', req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, Email and password are required' });
        }


        const existingUser = await User.findOne({ where: { email } });
        console.log('🔍 Existing user check:', existingUser ? 'Found' : 'Not found');
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already registered'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('🔐 Password hashed successfully');

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'customer'
        });

        console.log('✅ User created:', user.id, user.email);

        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });
    } catch (error) {
        console.error('Register error:', error);



        res.status(500).json({
            error: 'Server error during registration'
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.scope('WithPassword').findOne({ where: { email } });

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
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Server error during login'
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