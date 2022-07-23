import {sequelize} from "../database/database.js";
import {DataTypes, DATE} from "sequelize";

export const PostModel = sequelize.define("post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    media: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true
})