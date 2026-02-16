import express from 'express';
import { register, login, getCurrentUser, updateProfile, changePassword, logout } from '../controllers/authController.js';
import { authentication } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authentication, getCurrentUser);
router.put('/profile', authentication, updateProfile);
router.put('/change-password', authentication, changePassword);
router.post('/logout', logout);

export default router;