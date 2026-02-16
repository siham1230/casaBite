import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import { authentication } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authentication);

router.post('/', addToCart);
router.get('/', getCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

export default router;
