import { emitWarning } from 'process';
import {z} from 'zod';


// definig zod validation here
// just one string 
export const usernameValidation = z
.string()
.min(2,"username must be atleast 2")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special charaacters");

// object schema
export const signUpSchema= z.object({
    username: usernameValidation,
    email: z.string().email(),
    password:z.string().min(6,"password must be in between 6 digits")
})