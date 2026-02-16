import express from 'express';
import { getAllProducts, getProductById, getProductsByRestaurant } from '../controllers/productController.js';
// import { authentication, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getAllProducts);

router.get('/restaurant/:restaurantId', getProductsByRestaurant);

router.get('/:id', getProductById);


// router.post('/', authentication, authorize('admin'), createProduct);  

// router.put('/:id', authentication, authorize('admin'), updateProduct);  

// router.delete('/:id', authentication, authorize('admin'), deleteProduct);  

export default router;