import express from "express"
import {UserController} from "../controllers/UserController.js";
import {loginValidation, registrationValidation} from "../validator/index.js";
import {errorMiddlewares} from "../middlewares/ErrorMiddlewares.js";
import {mediaUpload} from "../middlewares/FileMiddlewares.js";
import {PostController} from "../controllers/PostController.js";
import {authMiddlewares} from "../middlewares/AuthMiddlewares.js";

const router = new express.Router()

router.post('/registration', registrationValidation, UserController.registration, errorMiddlewares)
router.post('/login', loginValidation, UserController.login, errorMiddlewares)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

router.post('/post', authMiddlewares, mediaUpload.single('media'), PostController.create, errorMiddlewares)
router.delete('/post/:id', authMiddlewares, PostController.delete, errorMiddlewares)
router.patch('/post/:id', authMiddlewares, mediaUpload.single('media'), PostController.update, errorMiddlewares)
router.get('/post', authMiddlewares, PostController.getAll, errorMiddlewares)
//
// router.get('/get_photo', function(req, res) {
//     var images = [];
//     var fullUrl = req.protocol + '://' + req.get('host') + '/';
//
//     fs.readdir('./media/', function(err, items) {
//         for (var i=0; i<items.length; i++) {
//             images.push(fullUrl + 'media/' + items[i]);
//             // images.push(fullUrl + items[i]);
//         }
//
//         var JSONstr = JSON.stringify(images);
//         res.send(JSONstr);
//     });
// });

export default router