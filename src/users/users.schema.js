import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'


const signupSchema = z.object({
    name: z.string().min(3, {message: 'Name is too short'}).max(120, {message: 'Name is too long'}),
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password is too short'}).max(20, {message: 'Password is too long'})
})

const loginSchema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password is to short'}).max(20, {message: 'Password is too long'})
})

export const validateSignup = (data) => {
    const result = signupSchema.safeParse(data)

    const {hasError, errorMessage, data: signupData} = extractValidationData(result)

    return {
        hasError, errorMessage, signupData
    }
}

export const validateLogin = (data) => {
    const result = signupSchema.safeParse(data)

    const {hasError, errorMessage, data: loginData} = extractValidationData(result)

    return {
        hasError, errorMessage, loginData
    }
}