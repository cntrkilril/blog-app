import {body} from 'express-validator'

export const registrationValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 6 символов").isLength({min: 6}),
    body('username', "Имя пользователя должно иметь от 3 до 15 символов").isLength({min: 3, max: 15}),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
];