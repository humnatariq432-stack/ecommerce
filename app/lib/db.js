import mongoose from "mongoose";

export async function connectDb(){
    try{
        if(!global.connection){
            global.connection = await mongoose.connect('mongodb://localhost:27017/catDb')
            // global.connection = await mongoose.connect('mongodb+srv://humnatariq432_db_user:4lfl7k91VP44206j@cluster0.5gfw20c.mongodb.net/catDb')

            console.log("new connection created");
        }
        else{
            console.log("new connection reused")
        }
    }catch(e){
            console.log(e.message);
    }
}