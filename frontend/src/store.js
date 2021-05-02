import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  quizListReducer,
  quizAuthorListReducer,
  quizAuthorListDeleteReducer,
  quizDetailsReducer,
  quizDeleteReducer,
  quizCreateReducer,
  quizUpdateReducer,
} from './reducers/quizReducers'
import { paramsReducers } from './reducers/paramsReducers'
import { mailReducer } from './reducers/mailReducers'
import quizData from './data/quizData'

const reducer = combineReducers({
  quizList: quizListReducer,
  quizAuthorList: quizAuthorListReducer,
  quizDetails: quizDetailsReducer,
  quizDelete: quizDeleteReducer,
  quizAuthorDelete: quizAuthorListDeleteReducer,
  quizCreate: quizCreateReducer,
  quizUpdate: quizUpdateReducer,
  quizParams: paramsReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  mail: mailReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const quizParamsFromStorage = localStorage.getItem('quizParams')
  ? JSON.parse(localStorage.getItem('quizParams'))
  : {
      currentAnswer: null,
      userAnswers: [],
      currentIndex: 0,
      question: null,
      answer: null,
      options: [],
      quizEnd: false,
      score: 0,
      disabled: true,
      radioActive: false,
      result: [],
    }

const quizDataFromStorage = localStorage.getItem('quizData')
  ? JSON.parse(localStorage.getItem('quizData'))
  : quizData

const initialState = {
  quizParams: quizParamsFromStorage,
  quizDetails: { quiz: quizDataFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
