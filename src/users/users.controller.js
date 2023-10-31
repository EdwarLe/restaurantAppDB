import { catchAsync } from "../errors/index.js";
import { validateLogin, validateSignup } from "./users.schema.js";
import { UsersService } from "./users.service.js";

const userService = new UsersService()

export const signup = catchAsync(async(req, res, next) => {
    const {hasError, errorMessage, signupData} = validateSignup(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessage
        })
    }

    const user = await userService.signup(signupData)
    return res.status(201).json(user)
})

export const login = catchAsync(async(req, res, next) => {
    const {hasError, errorMessage, loginData } = validateLogin(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessage
        })
    }

    
})