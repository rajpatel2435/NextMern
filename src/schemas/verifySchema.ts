import {z} from 'zod'

export const verifySchema= z.object({
    code: z.string().length(6,'verification code must be 6 digits')
})



// About ZOD
// similar to joi object schema to check the validation for schema
// dont need to define the hard conditon

