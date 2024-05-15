import {z} from 'zod'

export const messageSchema= z.object({
    content: z.string().min(10,{message: 'conetnt must be at least 10 characters'}),


})