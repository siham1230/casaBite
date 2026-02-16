import express from 'express';
import {
    getAllRestaurants, getRestaurantById, getRestaurantsByCategory
} from '../controllers/restaurantController.js';
// import { authentication, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getAllRestaurants);

router.get('/category/:categoryId', getRestaurantsByCategory);


router.get('/:id', getRestaurantById);






export default router;