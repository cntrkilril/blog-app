import {ApiError} from "../exceptions/index.js"
import {TokenService as tokenService} from "../services/TokenService.js";

export const authMiddlewares = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorizedError());
        }
        const user = tokenService.validateAccessToken(accessToken);
        if (!user) {
            return next(ApiError.unauthorizedError());
        }

        req.user = {...user};
        return next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
};