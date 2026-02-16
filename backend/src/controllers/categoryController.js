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

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, description, image, displayOrder, isActive } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        await category.update({
            name: name || category.name,
            icon: icon !== undefined ? icon : category.icon,
            description: description !== undefined ? description : category.description,
            image: image !== undefined ? image : category.image,
            displayOrder: displayOrder !== undefined ? displayOrder : category.displayOrder,
            isActive: isActive !== undefined ? isActive : category.isActive
        });

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update category'
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        const restaurantCount = await Restaurant.count({
            where: { categoryId: id }
        });

        if (restaurantCount > 0) {
            return res.status(400).json({
                success: false,
                error: `Cannot delete category. ${restaurantCount} restaurant(s) are using this category.`
            });
        }

        await category.destroy();

        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete category'
        });
    }
};
