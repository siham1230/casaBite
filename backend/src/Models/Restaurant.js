import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Restaurant = sequelize.define('Restaurant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Resturant name is required'
            },
        }
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    categoryId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        field: 'category_id'
    },
    image: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: false },
    district: {
        type: DataTypes.ENUM('Casa Port', 'Gauthier', 'Maârif', 'Anfa', 'Other'),
        allowNull: false,
        defaultValue: 'Other',
    },
    phone: { type: DataTypes.STRING, allowNull: true },
    rating: {
        type: DataTypes.DECIMAL(2, 1), allowNull: true,
        validate: {
            min: 0,
            max: 5,
        },
    },
    deliveryTime: {
        type: DataTypes.INTEGER, allowNull: false, defaultValue: 30,
        field: 'delivery_time'
    },
    deliveryCost: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 15.00,
        field: 'Delivery_cost'
    },
    openingTime: {
        type: DataTypes.TIME, allowNull: true, field: 'opening_time',
    },
    closingTime: {
        type: DataTypes.TIME, allowNull: true, field: 'closing_time',
    },
    isActive: {
        type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false, field: 'is_active',
    },

    cuisineType: {
        type: DataTypes.STRING, allowNull: true, field: 'cuisine_type',
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true,
        defaultValue: [],
    },
}, {
    tableName: 'restaurants',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['category_id']
        },
        {
            fields: ['district']
        },
        {
            fields: ['rating']
        },
        {
            fields: ['is_active']
        },
    ]
});

export default Restaurant;