import { Cart, Product, Restaurant } from '../Models/Associations.js';

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['id', 'name', 'deliveryCost', 'minimumOrder']
                }]
            }],
            order: [['createdAt', 'ASC']]
        });

        let subtotal = 0;
        let deliveryCost = 0;

        cartItems.forEach(item => {
            subtotal += parseFloat(item.product.price) * item.quantity;
        });

        if (cartItems.length > 0) {
            deliveryCost = parseFloat(cartItems[0].product.restaurant.deliveryCost);
        }

        const total = subtotal + deliveryCost;

        res.json({
            success: true,
            data: {
                items: cartItems,
                summary: {
                    itemCount: cartItems.length,
                    subtotal: subtotal.toFixed(2),
                    deliveryCost: deliveryCost.toFixed(2),
                    total: total.toFixed(2)
                }
            }
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cart'
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1, notes } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                error: 'Product ID is required'
            });
        }

        if (quantity < 1 || quantity > 99) {
            return res.status(400).json({
                success: false,
                error: 'Quantity must be between 1 and 99'
            });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        if (!product.isAvailable) {
            return res.status(400).json({
                success: false,
                error: 'Product is currently unavailable'
            });
        }

        let cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            if (notes) cartItem.notes = notes;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                userId,
                productId,
                quantity,
                notes
            });
        }

        const updatedItem = await Cart.findByPk(cartItem.id, {
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['id', 'name']
                }]
            }]
        });

        res.status(201).json({
            success: true,
            message: 'Item added to cart successfully',
            data: updatedItem
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add item to cart'
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity, notes } = req.body;

        if (quantity && (quantity < 1 || quantity > 99)) {
            return res.status(400).json({
                success: false,
                error: 'Quantity must be between 1 and 99'
            });
        }

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Cart item not found'
            });
        }

        if (quantity !== undefined) cartItem.quantity = quantity;
        if (notes !== undefined) cartItem.notes = notes;

        await cartItem.save();

        res.json({
            success: true,
            message: 'Cart item updated successfully',
            data: cartItem
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update cart item'
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Cart item not found'
            });
        }

        await cartItem.destroy();

        res.json({
            success: true,
            message: 'Item removed from cart successfully'
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove item from cart'
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.destroy({
            where: { userId }
        });

        res.json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cart'
        });
    }
};