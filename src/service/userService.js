import bcrypt from 'bcrypt'
import User from '../model/userModels.js'
import CustomError from '../utils/customError.js'


export const userRegister=async(data)=>{

    const {phoneNumber,password,username,email,status}=data
    const userExists=await User.findOne({phoneNumber})
    if(userExists){
        throw new CustomError("user already exists",400)
    }
    const hashedpassword=await bcrypt.hash(password,8)
    const newuser=new User({
        username,
        email,
        phoneNumber,
        status,
        password:hashedpassword
    })
    const saveduser=await newuser.save()
    return saveduser;
}


export const loginUser=async (phoneNumber,password)=>{
    const userData =await User.findOne({phoneNumber})
    if(!userData){
        throw new CustomError("Please register ",400)
    }
    const isMatch =await bcrypt.compare(password ,userData.password);
    if(!isMatch){
        throw new CustomError("invalid password/phoneNumber ",400)
    }
    if(userData.isBlocked){
        throw new CustomError("your account is blocked ",403)
    }
    return userData
}

