import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController.js';
import { authentication } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authentication);

router.post('/', createOrder);

router.get('/', getUserOrders);

router.get('/:id', getOrderById);


export default router;


