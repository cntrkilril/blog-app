import {UserModel} from "../models/UserModel.js";
import {ApiError} from "../exceptions/index.js";
import {TokenService} from "./TokenService.js";
import bcrypt from "bcrypt";

export class UserService {
    static async registration(username, email, password) {
        const user = await UserModel.findOne({where: {email: email}})
        if (user) {
            throw ApiError.badRequest(`Пользователь с ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const newUser = await UserModel.create({username, email, password: hashPassword})
        const userObj = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email

        }
        const tokens = TokenService.generateTokens({...userObj})
        await TokenService.saveToken(userObj.id, tokens.refreshToken);
        return {...tokens, user: {...userObj}}
    }

    static async login(email, password) {
        const user = await UserModel.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.badRequest(`Пользователь с ${email} не существует`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль');
        }
        const userObj = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        const tokens = TokenService.generateTokens({...userObj})
        await TokenService.saveToken(userObj.id, tokens.refreshToken);
        return {...tokens, user: {...userObj}}
    }

    static async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    static async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenDb) {
            throw ApiError.unauthorizedError()
        }
        const user = await UserModel.findByPk(userData.id)
        const userObj = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        const tokens = TokenService.generateTokens({...userObj})
        await TokenService.saveToken(userObj.id, tokens.refreshToken);
        return {...tokens, user: {...userObj}}
    }

}