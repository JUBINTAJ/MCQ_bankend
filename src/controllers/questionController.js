import { createQuestionService, getAllQuestionService } from "../service/question.js";

export const addQuestion = async (req, res) => {
  await createQuestionService(req.body);
  res.status(200).json({ message: "Question created successfully" });
};

export const getAllQuestion = async (req, res) => {
  const { page } = req.query;
  const { questions = [], totalQuestions } = await getAllQuestionService(Number(page));
  res.status(200).json({ message: "Questions fetched successfully", data: { questions, totalQuestions } });
};
