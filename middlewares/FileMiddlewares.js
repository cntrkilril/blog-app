import multer from "multer"
import {ApiError} from "../exceptions/index.js";
import {errorMiddlewares} from "./ErrorMiddlewares.js";

const mediaStorage = multer.diskStorage({
    destination(req, file,cb) {
        cb(null, path.resolve(__dirname, './media'))
    },
    filename(req, file,cb) {
        cb(null, Date.now() + file.originalname)
    }
})

export const mediaUpload = multer({
    storage: mediaStorage,
    fileFilter(req, file, cb) {
        if (
            file.originalname.match(/\.(mp4|MPEG-4|mkv)$/) || file.originalname.match(/\.(png|jpg|jpeg)$/) || !file
        ) {
            cb(null, true);
        } else {
            cb(ApiError.badRequest("Неподдерживаемый тип файла"), false)
        }
    }
})