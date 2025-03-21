import AppError from "../middlewares/Apperror.js";
import Question from "../model/questionModel.js";

export const createQuestionService = async (data) => {
  const { question, answer, options } = data;

  const existquestion = await Question.findOne({ question });
  if (existquestion) {
    throw new AppError(`Question already exists`, 400);
  }

  const questionCreate = await Question.create({ question, answer, options }); 
  if (!questionCreate) {
    throw new AppError(`Question didn't get created`);
  }

  return questionCreate;
};

export const getAllQuestionService = async (page) => {
  const questions = await Question.find();
  const totalQuestions = await Question.countDocuments();
  return { questions, totalQuestions };
};
