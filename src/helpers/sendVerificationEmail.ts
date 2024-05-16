import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string
): Promise<ApiResponse> {
    
    try{
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Verify your account',
            react:VerificationEmail({username,otp: verifyCode}),
          });

        return {
            success: true, message: 'email sent successfully'
        }
    }catch (error){
        console.error("filed to send email");
        console.log(error);

        return {
            success: false, message: 'failed to send the email'
        }
    }
}