import {PostService} from "../services/PostService.js";

export class PostController {
    static async create(req, res, next) {
        try {
            const body = req.body.body || null
            const media = req.file ? req.file.filename : null
            console.log(req)
            const userId = req.user.id
            const post = await PostService.create(body, media, userId)
            return res.json(post)
        } catch (e) {
            return next(e)
        }
    }

    static async update(req, res, next) {
        try {
            const postId = req.params.id
            const userId = req.user.id
            const body = req.body.body || null
            const media = req.file ? req.file.filename : null
            await PostService.update(postId, userId, body, media)
            return res.json({
                message: "Пост успешно изменен"
            });
        } catch (e) {
            return next(e)
        }
    }

    static async delete(req, res, next) {
        try {
            const postId = req.params.id
            const userId = req.user.id
            await PostService.delete(postId, userId)
            return res.json({
                message: "Пост успешно удален"
            });
        } catch (e) {
            return next(e)
        }
    }

    static async getAll(req, res, next) {
        try {
            const posts = await PostService.getAll()
            return res.json(posts)
        } catch (e) {
            return next(e)
        }
    }
}