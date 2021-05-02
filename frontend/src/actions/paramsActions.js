import {
  SAVE_QUIZ_PARAMS,
  RESET_QUIZ_PARAMS,
} from '../constants/paramsConstants'

export const saveQuizParams = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_QUIZ_PARAMS,
    payload: data,
  })
  localStorage.setItem('quizParams', JSON.stringify(data))
}

export const resetQuizParams = (data) => async (dispatch) => {
  dispatch({
    type: RESET_QUIZ_PARAMS,
    payload: data,
  })
  localStorage.removeItem('quizParams')
}
