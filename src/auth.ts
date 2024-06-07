import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import dbConnect from "./lib/dbConnect";
import UserModel from "./model/User";
import { use } from "react";
import { verify } from "crypto";
import { JWT } from "next-auth/jwt";

interface Credentials {
  email: string;
  password: string;
}

export const { handlers,signIn, signOut, auth } = NextAuth({
  providers: [Google,

    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      
      authorize: async (credentials:any): Promise<any> => {
     

        // logic to salt and hash password2.
        const salt=10;


 await dbConnect();

const salted=await bcrypt.genSalt(12);


  const user = await UserModel.findOne({ email: credentials.email });

  console.log(user);
 
 if (!user) {
  credentials.password= await bcrypt.hash(credentials.password,salted);
   const user = await UserModel.create({ email: credentials.email, password: credentials.password ,username:credentials.email,verifyCode: "20222525",verifyCodeExpiry:"2024/03/12"  });
   console.log("user created succesffullllyyyy");
 }else{

  console.log(user.password);
  console.log(credentials.password);
  const validPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if(validPassword){
    console.log("password matched");
    
  return user;
  }else{
    console.log("password mis matched");
    throw new Error('Invalid email or password');
  }

 }



      },
    }),
  ],
  pages:{
    signIn:'/sign-credentials',
    signOut:'/dashboard'
  },
  session:{
    jwt:true,
    session:true,
  },callbacks:{
    async jwt({ token, user }) {

      console.log(user);
      if (user) {
        // token._id = user._id?.toString();
        // token.isVerified = user.isVerified;
        // token.name = user.username;
        // token.email = user.email;
      }
      console.log('Token created:', token);
      return token;
    },
    async session({ session, token }) {
      // if (token) {
      //   console.log('Token in session callback:', token);
      //   session.user.email = token.email;
      //   // session.user.isVerified = token.isVerified;
      //   session.user.name = token.name;
      // }

      console.log('Session:', session);

      return session;

    },
  }
  
})