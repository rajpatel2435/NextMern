import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs"

interface UserSchema {
    userName: string;
    // Add other properties if necessary
  }


export async function GET(request: Request) {
    // not wokring new next js functionality
    if(request.method !== 'GET'){
        return Response.json({
            success: false,
            messsage: 'We are not acceoting the POST Method'
        },{
            status:405        })
    };

    await dbConnect();

    try {
  
        const { searchParams }= new URL( request.url);
        const queryParams = {
            username: searchParams.get('username')
        };

        const result:any  = usernameValidation.safeParse(queryParams.username);



        if(!result.success){

            return Response.json({
                success: false,
                message:result.error.format()
            })

        }

        // object destrucring

 
     
          
          const { userName } = result.data;


        const checkUserExists= await UserModel.findOne({ userName , isVerified: true });

        if(checkUserExists){
            return Response.json({
                success: false,
                messgae: 'username is taken'
            },{
                status: 404
            })
        }

        return Response.json({
            success: true,
            messgae: 'Bravo Your username is unique'
        },{
            status: 404
        })


    } catch (error) {
        console.error("Error while checking username"+error);

        return Response.json({
            success: false,
            message: "error while checking"
        },
        {
            status:200
        }
    );

    }
}