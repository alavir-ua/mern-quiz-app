import express from 'express'
const router = express.Router()
import { sendMail } from '../controllers/mailController.js'
import { mailValidator } from '../middleware/formMiddleware.js'

router.route('/').post(mailValidator, sendMail)

export default router
