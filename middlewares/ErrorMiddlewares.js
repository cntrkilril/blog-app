import {ApiError} from "../exceptions/index.js"

export const errorMiddlewares = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err)
    return res.status(500).json({message: 'Непредвиденная ошибка'})
};