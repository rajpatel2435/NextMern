import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"


export async function POST(request: Request){
    await dbConnect()

    try {
        // destructuring assignment
        // request.json() returns an object with properties username, email, and password
        const {username,email,password}=await request.json();



        const existingUserVerified= await UserModel.findOne({ username });

if(existingUserVerified){

    if(existingUserVerified.isVerified){
    return Response.json({
        message:"user is already registered with this username"
    },
{
    status:201
})
    }else{
        return Response.json({
            message:"user is already registered. please verify this"
        },
    {
        status:201
    })
    }
}

const existingUserEmail=await UserModel.findOne({email});

const verifyCode= Math.floor(100000+ Math.random()*900000).toString();

if(existingUserEmail){

    if(existingUserEmail.isVerified){
        return Response.json({
            success:true,
            message:"user registered"
        },{status:400})
    }else{
        const hashedPassword = await bcrypt.hash(password,10);
        existingUserEmail.password= hashedPassword;
        existingUserEmail.verifyCode= verifyCode;
        existingUserEmail.verifyCodeExpiry=new Date(Date.now()+ 3600000);

        await existingUserEmail.save();

    }

}else{

    const hashedPassword = await bcrypt.hash(password,10);
// change the const because we are having the object as it is referencing the object and we can change the value of object
    const expiryDate= new Date();
    expiryDate.setHours(expiryDate.getHours()+1);

    const newUser=  new UserModel({
        username,
        email,
        password:hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified:false,
        isAcceptingMessage: true,
        messages: []
    });

    await newUser.save();

}

// const emailResponse= await sendVerificationEmail(email,username,verifyCode);

// if(!emailResponse.success){
//     return Response.json({
//         success:false,
//         message:emailResponse.message
//     },{status:500})
// }

return Response.json({
    success:true,
    message:"user registered successfully . Please verify your email"
},{status:201});


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