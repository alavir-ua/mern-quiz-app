import express from 'express'
const router = express.Router()
import {
  getQuizzes,
  getAuthorQuizzes,
  getQuizById,
  deleteQuiz,
  deleteQuizzesOfAuthor,
  createQuiz,
  updateQuiz,
} from '../controllers/quizController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/author/:authorId')
  .get(getAuthorQuizzes)
  .delete(protect, admin, deleteQuizzesOfAuthor)
router.route('/').get(getQuizzes).post(protect, admin, createQuiz)
router
  .route('/:id')
  .get(getQuizById)
  .delete(protect, admin, deleteQuiz)
  .put(protect, admin, updateQuiz)

export default router
