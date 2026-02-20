import { Category, Restaurant } from '../Models/Associations.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { isActive: true },
            order: [['displayOrder', 'ASC'], ['name', 'ASC']],
            include: [{
                model: Restaurant,
                as: 'restaurants',
                where: { isActive: true },
                required: false,
                attributes: ['id', 'name', 'image', 'rating']
            }]
        });

        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories'
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            include: [{
                model: Restaurant,
                as: 'restaurants',
                where: { isActive: true },
                required: false
            }]
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch category'
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, icon, description, image, displayOrder } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                error: 'Category name is required'
            });
        }

        const category = await Category.create({
            name,
            icon,
            description,
            image,
            displayOrder: displayOrder || 0
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        console.error('Create category error:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'Category name already exists'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create category'
        });
    }
};


