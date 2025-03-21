// import { required } from "joi";
import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     phoneNumber:{
        type:Number,
        required:true
    },password:{
        type:String,
        required:true
    },status:{
        type:String,
        enum:['student','Employee'],
        default:'student'
    }
},{
    timestamps:true
})

const User=mongoose.model('user',userSchema)
export default User;



