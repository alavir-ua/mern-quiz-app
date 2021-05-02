import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Quiz from './models/quizModel.js'
import connectDB from './config/db.js'
import faker from 'faker'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Quiz.deleteMany()
    await User.deleteMany()

    const userUuids = []

    //creating Admin
    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: '654321',
      isAdmin: true,
      isModerator: true,
    })

    const createdAdmin = await admin.save()
    const adminUuid = createdAdmin._id
    userUuids.push(adminUuid)
    console.log('Admin'.green, adminUuid)

    //creating of 20 users
    for (let i = 1; i < 21; i++) {
      const name = faker.name.findName()
      const email = (name + '@gmail.com').split(' ').join('')

      const user = new User({
        name,
        email: email.toLowerCase(),
        password: '123456',
        isAdmin: faker.random.boolean(),
        isModerator: false,
      })

      const createdUser = await user.save()
      const userUuid = createdUser._id
      if (createdUser.isAdmin) {
        userUuids.push(userUuid)
      }
      console.log(`User #${i}`.cyan, userUuid)
    }

    //creating of 40 quizzes
    for (let i = 1; i < 41; i++) {
      const randomUser = await User.findById(
        userUuids[Math.floor(Math.random() * userUuids.length)]
      )

      const name = faker.commerce.productName()

      const questions = []

      //creating 8 to 20 random questions
      const range = faker.random.number({
        min: 9,
        max: 21,
      })

      for (let i = 1; i < range; i++) {
        const question = faker.lorem.sentence().slice(0, -1) + '?'
        //const question = faker.random.words() + '?'

        const options = []

        const y = faker.random.number({
          min: 5,
          max: 6,
        })

        for (let i = 1; i < y; i++) {
          options.push(faker.random.word())
        }

        const answer = options[Math.floor(Math.random() * options.length)]

        questions.push({
          question,
          options,
          answer,
        })
      }

      const quiz = new Quiz({
        user: randomUser,
        name,
        questions,
      })

      const createdQuiz = await quiz.save()
      const createdQuizUuid = createdQuiz._id
      console.log(`Quiz #${i}`.blue, createdQuizUuid)
    }

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Quiz.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
