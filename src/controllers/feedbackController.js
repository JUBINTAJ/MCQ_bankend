import { addFeedBackService } from "../service/feedbackservice.js";

export const addFeedBack = async (req, res) => {
  const { feedback, score } = req.body;
  const { _id } = req.user;

  await addFeedBackService(feedback, score, _id);
  res.status(200).json({ success: true, message: "Feedback added successfully" });
};
