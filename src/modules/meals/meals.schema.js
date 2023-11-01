import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'


const mealsSchema = z.object({
    name: z.string().min(3, {message: 'Name is to short'}),
    price: z.number().positive()
})

export const validateMeal = (data) => {
    const result = mealsSchema.safeParse(data)
    const {hasError, errorMessage, data: mealData} = extractValidationData(result)

    return {
        hasError, errorMessage, mealData
    }
}