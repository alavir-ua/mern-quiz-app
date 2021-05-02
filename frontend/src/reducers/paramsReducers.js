import {
  SAVE_QUIZ_PARAMS,
  RESET_QUIZ_PARAMS,
} from '../constants/paramsConstants'

export const paramsReducers = (
  state = { options: [], userAnswers: [] },
  action
) => {
  switch (action.type) {
    case SAVE_QUIZ_PARAMS:
      return {
        ...state,
        currentAnswer: action.payload.currentAnswer,
        userAnswers: action.payload.userAnswers,
        currentIndex: action.payload.currentIndex,
        question: action.payload.question,
        answer: action.payload.answer,
        options: action.payload.options,
        quizEnd: action.payload.quizEnd,
        score: action.payload.score,
        disabled: action.payload.disabled,
        radioActive: action.payload.radioActive,
        result: action.payload.result,
      }
    case RESET_QUIZ_PARAMS:
      return {
        ...state,
        currentAnswer: null,
        userAnswers: [],
        currentIndex: action.payload.currentIndex,
        question: action.payload.question,
        answer: action.payload.answer,
        options: action.payload.options,
        quizEnd: false,
        score: 0,
        disabled: true,
        radioActive: false,
        result: [],
      }
    default:
      return state
  }
}
