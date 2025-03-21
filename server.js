import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import { main } from './src/config/db.config.js';
import userRoutes from './src/routes/userRoutes.js'
import errorHandler from './src/middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import feedbackRouter from './src/routes/feedbackrouts.js';
import questionRouter from './src/routes/questionroutes.js';



const app=express()
dotenv.config()


const port=process.env.PORT || 7000

app.use(cors(
    {
      // origin:'http://localhost:5173',
      origin:'https://mcq-frontend-murex.vercel.app',
      credentials:true
    }
  ));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


main().catch(err => console.log(err));

app.use('/api/user',userRoutes)
app.use('/api/question',questionRouter)
app.use('/api/feedback',feedbackRouter)




app.get('/',(req,res)=>{
    res.send("llooii")
    console.log("hello")
})

app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})