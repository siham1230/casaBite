import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        defaultValue: 'customer',
        allowNull: false
    },
    phone: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
    lastLogin: { type: DataTypes.DATE, allowNull: true, field: 'last_login' },


}, {

    tableName: 'users',
    timestamps: true,
    underscored: true,


});
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};
export default User;