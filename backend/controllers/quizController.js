import asyncHandler from 'express-async-handler'
import Quiz from '../models/quizModel.js'

// @desc    Fetch all quizzes
// @route   GET /api/quizzes/search/:keyword/page/:pageNumber
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const pageSize = 8

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Quiz.countDocuments({ ...keyword })
  const quizzes = await Quiz.find({ ...keyword })
    .select(['_id', 'user', 'name', 'questions'])
    .sort({ createdAt: -1 })
    .populate('user', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ quizzes, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Get all the author's quizzes
// @route   GET /api/quizzes/author/:authorId/page/:pageNumber
// @access  Public
const getAuthorQuizzes = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const pageSize = 8

  const count = await Quiz.countDocuments({ user: req.params.authorId })
  const quizzes = await Quiz.find({ user: req.params.authorId })
    .select(['_id', 'user', 'name', 'questions'])
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ quizzes, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single quiz
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)

  if (quiz) {
    res.json(quiz)
  } else {
    res.status(404)
    throw new Error('Quiz not found')
  }
})

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)

  if (quiz) {
    if (
      (req.user._id.toString() === quiz.user.toString() && req.user.isAdmin) ||
      req.user.isModerator
    ) {
      await quiz.remove()
      res.json({ message: 'Quiz removed' })
    } else {
      res.status(404)
      throw new Error('Not authorized as quiz author')
    }
  } else {
    res.status(404)
    throw new Error('Quiz not found')
  }
})

// @desc    Delete all the author's quizzes
// @route   DELETE /api/quizzes/author/:id
// @access  Private/Admin
const deleteQuizzesOfAuthor = asyncHandler(async (req, res) => {
  const authorId = req.params.authorId

  const result = await Quiz.deleteMany({ user: authorId })
  if (result.deletedCount !== 0) {
    res.json({ message: `${result.deletedCount} quizzes removed successful` })
  } else {
    res.status(404)
    throw new Error('Quizzes not found')
  }
})

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = asyncHandler(async (req, res) => {
  const quiz = new Quiz({
    user: req.user._id,
    name: 'Quiz sample name',
    questions: [],
  })

  const createdQuiz = await quiz.save()
  res.status(201).json(createdQuiz)
})

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
  const { name, questions } = req.body

  const quiz = await Quiz.findById(req.params.id)

  if (quiz) {
    quiz.name = name
    quiz.questions = questions

    const updatedQuiz = await quiz.save()

    res.json(updatedQuiz)
  } else {
    res.status(404)
    throw new Error('Quiz not found')
  }
})

export {
  getQuizzes,
  getAuthorQuizzes,
  getQuizById,
  deleteQuiz,
  deleteQuizzesOfAuthor,
  createQuiz,
  updateQuiz,
}
