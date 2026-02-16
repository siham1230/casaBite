import sequelize from '../config/database.js';
import User from './User.js';
import Category from './Category.js';
import Restaurant from './Restaurant.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';


Category.hasMany(Restaurant, {
    foreignKey: 'category_id',
    as: 'restaurants',
    onDelete: 'RESTRICT'
});

Restaurant.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

Restaurant.hasMany(Product, {
    foreignKey: 'restaurant_id',
    as: 'products',
    onDelete: 'CASCADE'
});

Product.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
    as: 'restaurant'
});

User.hasMany(Cart, {
    foreignKey: 'user_id',
    as: 'cartItems',
    onDelete: 'CASCADE'
});

Cart.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Product.hasMany(Cart, {
    foreignKey: 'product_id',
    as: 'cartItems',
    onDelete: 'CASCADE'
});

Cart.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
    onDelete: 'RESTRICT'
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Restaurant.hasMany(Order, {
    foreignKey: 'restaurant_id',
    as: 'orders',
    onDelete: 'RESTRICT'
});

Order.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
    as: 'restaurant'
});

Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'items',
    onDelete: 'CASCADE'
});

OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order'
});

Product.hasMany(OrderItem, {
    foreignKey: 'product_id',
    as: 'orderItems',
    onDelete: 'RESTRICT'
});

OrderItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

export {
    sequelize, User, Category, Restaurant, Product, Cart, Order, OrderItem
};

export default {
    sequelize, User, Category, Restaurant, Product, Cart, Order, OrderItem
};




