import express from 'express';
import {
    getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory
} from '../controllers/categoryController.js';
import { authentication, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);


router.post('/', authentication, authorize('admin'), createCategory);
router.put('/:id', authentication, authorize('admin'), updateCategory);
router.delete('/:id', authentication, authorize('admin'), deleteCategory);

export default router;