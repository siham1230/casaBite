// src/models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    restaurantId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'restaurants',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'restaurant_id'
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    ingredients: {
        type: DataTypes.TEXT, allowNull: true,
        comment: 'Comma-separated list or JSON array of ingredients'
    },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: {
        type: DataTypes.STRING, allowNull: true,
        validate: {
            isUrl: {
                msg: 'Image must be a valid URL'
            }
        }
    },
    preparationTime: {
        type: DataTypes.INTEGER, allowNull: true,
        defaultValue: 15,
        field: 'preparation_time',
        comment: 'Preparation time in minutes'
    },
    isAvailable: {
        type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false,
        field: 'is_available',
        comment: 'Whether the product is currently available'
    },

    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true,
        defaultValue: [],
    }
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['restaurant_id']
        },
        // {
        //     fields: ['is_available']
        // },
        {
            fields: ['price']
        }
    ]
});

export default Product;