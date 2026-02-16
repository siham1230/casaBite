import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: {
        type: DataTypes.STRING, allowNull: true,
        comment: 'Icon/emoji representing the category'
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: {
        type: DataTypes.STRING, allowNull: true,
        comment: 'Category banner image URL'
    },
    displayOrder: {
        type: DataTypes.INTEGER, defaultValue: 0, field: 'display_order',
        comment: 'Order in which to display categories'
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
}, {
    tableName: 'categories',
    timestamps: true,
    underscored: true,

});
export default Category;
