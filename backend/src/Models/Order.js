import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        field: 'user_id'
    },
    restaurantId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'restaurants',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        field: 'restaurant_id'
    },
    orderNumber: {
        type: DataTypes.STRING, allowNull: false, unique: true,
        field: 'order_number',
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'VALIDATED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'), defaultValue: 'PENDING',
        allowNull: false,
        comment: 'Order lifecycle status'
    },
    deliveryDriverName: {
        type: DataTypes.STRING, allowNull: true,
        field: 'delivery_driver_name',
        comment: 'Fictitious driver name assigned to order'
    },

    deliveryDistrict: {
        type: DataTypes.ENUM('Casa Port', 'Gauthier', 'Maârif', 'Anfa', 'Other'),
        allowNull: false,
        field: 'delivery_district'
    },
    customerName: {
        type: DataTypes.STRING, allowNull: false,
        field: 'customer_name'
    },
    customerPhone: {
        type: DataTypes.STRING, allowNull: false, field: 'customer_phone'
    },


    total: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false,
        validate: {
            min: 0
        },
        comment: 'Final total (subtotal + delivery - discount)'
    },
    paymentMethod: {
        type: DataTypes.ENUM('CASH', 'CARD', 'ONLINE'),
        defaultValue: 'CASH',
        field: 'payment_method'
    },


    cancelReason: {
        type: DataTypes.TEXT, allowNull: true,
        field: 'cancel_reason',
    },
    deliveredAt: {
        type: DataTypes.DATE, allowNull: true, field: 'delivered_at'
    }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['user_id']
        },
        {
            fields: ['restaurant_id']
        },
        {
            fields: ['status']
        },
        {
            fields: ['order_number'],
            unique: true
        },
        {
            fields: ['created_at']
        }
    ]
});

export default Order;