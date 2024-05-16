import { Resend } from "resend";

// have the resend formula to send email to users

export const resend = new Resend(process.env.RESEND_API_KEY);