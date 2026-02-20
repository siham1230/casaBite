import { Order, OrderItem, Cart, Product, Restaurant } from '../Models/Associations.js';
import sequelize from '../config/database.js';


export const createOrder = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { deliveryAddress, deliveryDistrict, customerName, customerPhone } = req.body;

        if (!deliveryAddress || !deliveryDistrict || !customerName || !customerPhone) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                error: 'Delivery address, district, name, and phone are required'
            });
        }

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: Restaurant,
                    as: 'restaurant'
                }]
            }],
            transaction: t
        });

        if (cartItems.length === 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                error: 'Cart is empty'
            });
        }

        const restaurantId = cartItems[0].product.restaurantId;
        const allSameRestaurant = cartItems.every(item => item.product.restaurantId === restaurantId);

        if (!allSameRestaurant) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                error: 'All items must be from the same restaurant'
            });
        }

        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += parseFloat(item.product.price) * item.quantity;
        });

        const restaurant = cartItems[0].product.restaurant;
        const deliveryCost = calculateDeliveryCost(deliveryDistrict);
        const total = subtotal + deliveryCost;

        if (restaurant.minimumOrder && subtotal < restaurant.minimumOrder) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                error: `Minimum order amount is ${restaurant.minimumOrder} MAD`
            });
        }

        const order = await Order.create({
            userId,
            restaurantId,
            orderNumber: generateOrderNumber(),
            status: 'PENDING',
            deliveryDriverName: null,
            deliveryAddress,
            deliveryDistrict,
            customerName,
            customerPhone,
            total: total.toFixed(2),

        }, { transaction: t });

        await Promise.all(
            cartItems.map(item =>
                OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    productName: item.product.name,
                    productImage: item.product.image,
                    quantity: item.quantity,
                    priceAtOrder: item.product.price,
                    subtotal: (parseFloat(item.product.price) * item.quantity).toFixed(2),
                    notes: item.notes
                }, { transaction: t })
            )
        );

        await Cart.destroy({
            where: { userId },
            transaction: t
        });

        await t.commit();

        const completeOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderItem,
                    as: 'items'
                },
                {
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['id', 'name', 'image', 'phone', 'address']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: completeOrder
        });
    } catch (error) {
        await t.rollback();
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create order'
        });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;

        const where = { userId };
        if (status) {
            where.status = status;
        }

        const orders = await Order.findAll({
            where,
            include: [
                {
                    model: OrderItem,
                    as: 'items'
                },
                {
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['id', 'name', 'image']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch orders'
        });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const order = await Order.findOne({
            where: { id, userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items'
                },
                {
                    model: Restaurant,
                    as: 'restaurant'
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch order'
        });
    }
};

