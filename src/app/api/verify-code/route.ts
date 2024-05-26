import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


    export async function POST(request: Request){
    await dbConnect();

    try {


;
        const { username, code}= await request.json();


        const decodedUserName= decodeURIComponent(username);


        const user= await UserModel.findOne({ username: decodedUserName});

        



        if(!user){
            return Response.json({
                success: false,
                message: "user does not exists"
            },
        {
            status:501
        })
        };

if( !code){
    return Response.json({
        success: false,
        message: "did not provide code"
    },
    {
        status:500
    }
);
}

console.log(user.verifyCode);
console.log(code);
const isCodeValid= user.verifyCode ===code;

console.log(user.verfifyCode ===code);

if(isCodeValid){


    user.isVerified = true;

await user.save();

return Response.json({
    success: true,
    message: " User verifed "
})



  
};



return Response.json({
    success: false,
    message: "Token does not match"
},
{
    status:500
}
);

        
    } catch (error) {

        console.error("Error while checking username"+error);

        return Response.json({
            success: false,
            message: "error while sending token "+ error
        },
        {
            status:500
        }
    );
        
    }
    
}