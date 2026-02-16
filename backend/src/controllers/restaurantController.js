import { Restaurant, Category, Product } from '../Models/Associations.js';
import { Op } from 'sequelize';

export const getAllRestaurants = async (req, res) => {
    try {
        const { categoryId, district, search, minRating, isActive } = req.query;

        const where = {};

        if (isActive !== undefined) {
            where.isActive = isActive === 'true';
        }

        if (categoryId) {
            where.categoryId = parseInt(categoryId);
        }

        if (district) {
            where.district = district;
        }

        if (minRating) {
            where.rating = { [Op.gte]: parseFloat(minRating) };
        }

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
                { cuisineType: { [Op.iLike]: `%${search}%` } }
            ];

        }
        console.log('Query filters:', where);

        const restaurants = await Restaurant.findAll({
            where,
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'icon']
            }],
            order: [
                ['rating', 'DESC'],
                ['name', 'ASC']
            ]
        });

        res.json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        console.error('Get restaurants error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch restaurants'
        });
    }
};

export const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'icon']
                },
                {
                    model: Product,
                    as: 'products',
                    where: { isAvailable: true },
                    required: false,
                    order: [['isPopular', 'DESC'], ['name', 'ASC']]
                }
            ]
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: 'Restaurant not found'
            });
        }

        res.json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        console.error('Get restaurant error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch restaurant'
        });
    }
};

export const getRestaurantsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const restaurants = await Restaurant.findAll({
            where: {
                categoryId,
                isActive: true
            },
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'icon']
            }],
            order: [['rating', 'DESC'], ['name', 'ASC']]
        });

        res.json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        console.error('Get restaurants by category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch restaurants'
        });
    }
};


