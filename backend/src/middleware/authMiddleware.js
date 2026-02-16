import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authentication = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Please authenticate' });
        }
        const token = authHeader.replace('Bearer ', '');


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

export const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();

    };
};
