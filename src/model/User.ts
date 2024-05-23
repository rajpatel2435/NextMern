import mongoose, {Schema, Document} from "mongoose";

// make schema interface

export interface Message extends Document{
    content: string;
    createdAt: Date
}

// declare the mongooseschema for this model example user mode
// decalre name define type and assign the value

const MessageSchema: Schema<Message>= new Schema({
    content:{
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
});

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Message []

}

const UserSchema:Schema<User>= new Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,'please enter valid email'],
    },
    password:{
        type:String,
        required:[true,"password is requied"],
    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is requied"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifyCode is requied"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    
    },
    messages: [MessageSchema]
})


const UserModel= mongoose.models.User || mongoose.model<User>('User', UserSchema) ;

export default UserModel;