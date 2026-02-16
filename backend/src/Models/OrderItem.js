// src/models/OrderItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'order_id'
    },
    productId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        field: 'product_id',
        comment: 'Reference to product (for historical tracking)'
    },
    productName: {
        type: DataTypes.STRING, allowNull: false,
        field: 'product_name',
    },
    productImage: {
        type: DataTypes.STRING, allowNull: true,
        field: 'product_image',
        comment: 'Snapshot of product image at time of order'
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    priceAtOrder: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false,
        field: 'price_at_order',
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false,
        comment: 'quantity × priceAtOrder'
    },
    notes: {
        type: DataTypes.TEXT, allowNull: true,
        comment: 'Special instructions for this item'
    }
}, {
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['order_id']
        },
        {
            fields: ['product_id']
        }
    ]
});

export default OrderItem;