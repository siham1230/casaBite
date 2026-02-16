// src/models/Cart.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id'
    },
    productId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'product_id'
    },
    quantity: {
        type: DataTypes.INTEGER, allowNull: false,
        defaultValue: 1,
    },
    notes: {
        type: DataTypes.TEXT, allowNull: true,
        comment: 'Special instructions (e.g., "No onions", "Extra spicy")'
    }
}, {
    tableName: 'carts',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id'],
            name: 'unique_user_product'
        },
        {
            fields: ['user_id']
        }
    ]
});

export default Cart;