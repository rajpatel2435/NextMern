import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next';

import { NextResponse } from 'next/server'
export async function POST(request: Request){
    await dbConnect()

    try {
        // destructuring assignment
        // request.json() returns an object with properties username, email, and password
        const {username,password}=await request.json();

console.log(username);

        const existingUserVerified: any= await UserModel.findOne({ username });
console.log(existingUserVerified);
if(existingUserVerified){

  const comparePassword= await bcrypt.compare(
    password, existingUserVerified.password
  );

  console.log(comparePassword);

  const token = jwt.sign({ user: existingUserVerified }, "fffffffzdvfgdngndncgm", {
    expiresIn: '60m',
  })

//   jwt.sign({ existingUserVerified }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//     if (err) {
//       res.send({ result: "Something went wrong" });
//     } else {
//       res.send({ user, auth: token });
//     }
//   });


  console.log({auth: token});

  return Response.json({
    success:true,
    message:"user sign in sccessfully",
    token: token,
},{status:201});

  
//   console.log(setCookie('auth', token));




}

// const emailResponse= await sendVerificationEmail(email,username,verifyCode);

// if(!emailResponse.success){
//     return Response.json({
//         success:false,
//         message:emailResponse.message
//     },{status:500})
// }




    } catch (error) {
        console.log(error);
        return Response.json({
            success:false,
            message:"Error registering user"
        },{
            status:500
        })

    }
}