import { Product, Restaurant, Category } from '../Models/Associations.js';
import { Op } from 'sequelize';

export const getAllProducts = async (req, res) => {
    try {
        const { restaurantId, category, search, minPrice, maxPrice, isAvailable } = req.query;

        const where = {};

        if (isAvailable !== undefined) {
            where.isAvailable = isAvailable === 'true';
        }

        if (restaurantId) {
            where.restaurantId = restaurantId;
        }

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
        }

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const products = await Product.findAll({
            where,
            include: [{
                model: Restaurant,
                as: 'restaurant',
                attributes: ['id', 'name', 'image', 'rating'],
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }]
            }],
            order: ['name']
        });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [{
                model: Restaurant,
                as: 'restaurant',
                include: [{
                    model: Category,
                    as: 'category'
                }]
            }]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product'
        });
    }
};

export const getProductsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const products = await Product.findAll({
            where: {
                restaurantId,
            },
            order: [['name', 'ASC']]
        });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Get products by restaurant error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
};

// export const createProduct = async (req, res) => {
//     try {
//         const {
//             restaurantId,
//             name,
//             description,
//             ingredients,
//             price,
//             image,
//             preparationTime,
//             category,
//             tags
//         } = req.body;

//         if (!restaurantId || !name || !price) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Restaurant, name, and price are required'
//             });
//         }

//         if (price <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Price must be greater than 0'
//             });
//         }

//         const restaurant = await Restaurant.findByPk(restaurantId);
//         if (!restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Restaurant not found'
//             });
//         }

//         const product = await Product.create({
//             restaurantId,
//             name,
//             description,
//             ingredients,
//             price,
//             image,
//             preparationTime: preparationTime || 15,
//             category,
//             tags: tags || []
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Product created successfully',
//             data: product
//         });
//     } catch (error) {
//         console.error('Create product error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to create product'
//         });
//     }
// };

