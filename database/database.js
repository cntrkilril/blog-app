import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('blog-db', 'admin', 'admin', {
    dialect: "sqlite",
    host: "./database/db.sqlite",
})