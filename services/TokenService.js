import jwt from "jsonwebtoken"
import {TokenModel} from "../models/TokenModel.js";
import {} from 'dotenv/config.js'


export class TokenService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    static validateAccessToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return user
        } catch (e) {
            return null
        }
    }

    static validateRefreshToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return user
        } catch (e) {
            return null
        }
    }

    static async saveToken(userId, refreshToken) {
        const token = await TokenModel.findOne({where: {user_id: userId}})
        if (token) {
            token.refresh_token = refreshToken
            return token.save()
        }
        const tokenObject = await TokenModel.create({user_id: userId, refresh_token: refreshToken})
        return tokenObject
    }

    static async removeToken(refreshToken) {
        const token = TokenModel.destroy({where: {refresh_token: refreshToken}})
        return token
    }

    static async findToken(refreshToken) {
        const token = TokenModel.findOne({where: {refresh_token: refreshToken}})
        return token
    }


}