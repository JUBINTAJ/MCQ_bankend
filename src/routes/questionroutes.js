import express from 'express'
import { addQuestion, getAllQuestion } from '../controllers/questionController.js';
import { trycatch } from '../middlewares/trycatch.js';
const questionRouter = express.Router();


questionRouter.post('/add',addQuestion);
questionRouter.get('',trycatch(getAllQuestion));

export default questionRouter