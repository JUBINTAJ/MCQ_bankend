import asyncHandler from "../middlewares/asyncHandler.js";
import { userRegister ,loginUser } from "../service/userService.js";
import { STATUS } from "../utils/constand.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";



export const regiseterUser=asyncHandler(async(req,res)=>{
    const data=req.body;
    
    const createuser=await userRegister(data)
    res.status(201).json({
        status:STATUS.SUCCESS,
        message:`user registered successfully`,
   
    })
    
})


export const userLogin=asyncHandler(async(req,res)=>{
    const {phoneNumber,password}=req.body;
    const user=await loginUser(phoneNumber,password)

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user) 

    res
       .cookie('accessToken',accessToken,{httpOnly : true , secure: false  , maxAge : 3 * 24 * 60 * 60 * 1000 , path:'/'})
       .cookie('refreshToken',refreshToken ,{httpOnly :true , secure : false , maxAge : 7 * 24 * 60 * 60 * 1000})
        
       .status(200).json({
        status : STATUS.SUCCESS,
        message:'user Logged in Successfull',
        user :{
            id :user._id,
            username:user.username,
            phoneNumber:user.phoneNumber,
            role:user.role
        },accessToken,
        // refreshToken


       })
    })


     
export const logout =asyncHandler(async(req,res)=>{
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
  
    res.status(200).json({ message: 'Logged out successfully' });
})  