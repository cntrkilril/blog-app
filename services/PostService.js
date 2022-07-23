import {PostModel} from "../models/PostModel.js";
import {ApiError} from "../exceptions/index.js";
import * as fs from "fs";

export class PostService {
    static async create(body, media, userId) {
        const newPost = await PostModel.create({body, media, user_id: userId})
        const postObj = {
            id: newPost.id,
            body: newPost.body,
            media: newPost.media,
            userId: newPost.user_id,
            created: newPost.createdAt,
            updated: newPost.updatedAt,
        }
        return {...postObj}
    }

    static async update(postId, userId, body, media) {
        const post = await PostModel.findOne({where: {id: postId}})
        if (!post) {
            throw ApiError.badRequest("Поста с таким идентификатором нет")
        }

        if (post.user_id !== userId) {
            throw ApiError.forbidden()
        }

        const newBody = body === null ? post.body : body
        const newMedia = media === null ? post.media : media

        const updatedPost = await PostModel.update({body: newBody, media: newMedia}, {where: {id: postId}})

        if (media !== null) {
            fs.unlink(`./media/${post.media}`, (err) => {
                if (err) {
                    throw new Error()
                }
            })
        }

        return updatedPost
    }

    static async delete(postId, userId) {
        const post = await PostModel.findOne({where: {id: postId}})
        if (!post) {
            throw ApiError.badRequest("Поста с таким идентификатором нет")
        }

        if (post.user_id !== userId) {
            throw ApiError.forbidden()
        }

        const deletePost = await PostModel.destroy({where: {id: postId}})

        return deletePost
    }

    static async getAll() {
        const posts = await PostModel.findAll()
        return posts
    }

}