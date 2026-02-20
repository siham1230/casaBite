import express from 'express';
import {
    getAllCategories, getCategoryById, createCategory
} from '../controllers/categoryController.js';
import { authentication, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);


router.post('/', authentication, authorize('admin'), createCategory);

export default router;