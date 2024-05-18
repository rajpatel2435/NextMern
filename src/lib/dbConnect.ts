 import mongoose from "mongoose";

 type ConnectionObject={
    isConnected? :number,
 }

 const connection: ConnectionObject= {};

 async function dbConnect():Promise<void>{
console.log(connection);

    if(connection.isConnected){
        console.log("already connected no need to re connect");
        return
    }

    try{
const db=await mongoose.connect(process.env.MONGODB_URI || '',{});

        connection.isConnected =db.connections[0].readyState;
    }catch (error){
        console.log("errororororororor");
        console.error(error);
        process.exit(1);
        // exit if it has error
    }
 }


 export default dbConnect;