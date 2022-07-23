import {UserService} from "../services/UserService.js";
import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/index.js";

export class  UserController {
    static async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            }
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const userData = await UserService.registration(username, email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return next(e)
        }
    }

    static async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            }
            const email = req.body.email
            const password = req.body.password
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return next(e)
        }
    }

    static async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({
                message: "Пользователь успешно вышел"
            });
        } catch (e) {
            return next(e)
        }
    }

    static async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            return next(e)
        }
    }
}