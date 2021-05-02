const signupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty()
  req
    .check('name')
    .isLength({ min: 3 })
    .withMessage('Name must contain at least 3 characters')
    .matches('[A-Z]')
    .withMessage('Name must contain an uppercase letter')
  req.check('email', 'Email is required').notEmpty()
  req.check('email', 'Email is`t valid').isEmail()
  req.check('password', 'Password is required').notEmpty()
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches('[0-9]')
    .withMessage('Password must contain a number')
    .matches('[A-Z]')
    .withMessage('Password must contain an uppercase letter')
    .matches('[a-z]')
    .withMessage('Password must contain an lowercase letter')
  req
    .check('confirmPassword')
    .equals(req.body.password)
    .withMessage('Passwords do not match')
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    throw new Error(firstError)
  }
  next()
}

const mailValidator = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty()
  req.check('email', 'Email is`t valid').isEmail()
  req.check('text', 'Text is required').notEmpty()
  req
    .check('text')
    .isLength({ min: 3 })
    .withMessage('Text must contain at least 10 characters')
    .matches('[A-Z]')
    .withMessage('Text must contain an uppercase letter')
    .matches('[a-z]')
    .withMessage('Text must contain an lowercase letter')
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    throw new Error(firstError)
  }
  next()
}

export { signupValidator, mailValidator }
