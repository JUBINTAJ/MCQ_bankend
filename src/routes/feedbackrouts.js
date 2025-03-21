import express from 'express'
import { addFeedBack } from '../controllers/feedbackController.js'
import { trycatch } from '../middlewares/trycatch.js';
import authenticate from '../middlewares/authmiddleware.js';

const feedbackRouter = express.Router()

feedbackRouter.post('/submit',authenticate,trycatch(addFeedBack));

export default feedbackRouter