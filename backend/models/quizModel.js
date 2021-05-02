import mongoose from 'mongoose'

const questionSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
)

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz
