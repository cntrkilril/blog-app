import {sequelize} from "../database/database.js";
import {DataTypes} from "sequelize";

export const TokenModel = sequelize.define("token", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
})