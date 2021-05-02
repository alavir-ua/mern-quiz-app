import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'

// @desc    Send a mail
// @route   POST /api/sendmail
// @access  Public
const sendMail = asyncHandler(async (req, res) => {
  const { email, text } = req.body

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_NAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const data = {
    from: process.env.SMTP_NAME,
    to: process.env.ADMIN_MAIL,
    subject: `Mail from user ${email}`,
    html: `<p>${text}</p>`,
  }

  transporter.sendMail(data, (error, result) => {
    if (error) {
      res
        .status(400)
        .json({ message: 'Some error occurred while sending the message...' })
    }
    res.json(result)
  })
})

export { sendMail }
