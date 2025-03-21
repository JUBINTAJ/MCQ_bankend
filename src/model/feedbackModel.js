import mongoose from 'mongoose';

const feedBackSchema = new mongoose.Schema(
  {
    userId: {
      ref: 'user',
      type: mongoose.Types.ObjectId,
    },
    feedBack: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedBackSchema);

export default Feedback;
