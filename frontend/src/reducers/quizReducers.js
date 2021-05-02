import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_AUTHOR_LIST_REQUEST,
  QUIZ_AUTHOR_LIST_SUCCESS,
  QUIZ_AUTHOR_LIST_FAIL,
  QUIZ_AUTHOR_LIST_DELETE_REQUEST,
  QUIZ_AUTHOR_LIST_DELETE_SUCCESS,
  QUIZ_AUTHOR_LIST_DELETE_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_RESET,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
  QUIZ_UPDATE_RESET,
} from '../constants/quizConstants.js'

export const quizListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return { loading: true, quizzes: [] }
    case QUIZ_LIST_SUCCESS:
      return {
        loading: false,
        quizzes: action.payload.quizzes,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case QUIZ_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const quizAuthorListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_AUTHOR_LIST_REQUEST:
      return { loading: true, quizzes: [] }
    case QUIZ_AUTHOR_LIST_SUCCESS:
      return {
        loading: false,
        quizzes: action.payload.quizzes,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case QUIZ_AUTHOR_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const quizDetailsReducer = (
  state = { quiz: { questions: [] } },
  action
) => {
  switch (action.type) {
    case QUIZ_DETAILS_REQUEST:
      return { ...state, loading: true }
    case QUIZ_DETAILS_SUCCESS:
      return { loading: false, quiz: action.payload }
    case QUIZ_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const quizDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_DELETE_REQUEST:
      return { loading: true }
    case QUIZ_DELETE_SUCCESS:
      return { loading: false, success: true }
    case QUIZ_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const quizAuthorListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_AUTHOR_LIST_DELETE_REQUEST:
      return { loading: true }
    case QUIZ_AUTHOR_LIST_DELETE_SUCCESS:
      return { loading: false, success: true }
    case QUIZ_AUTHOR_LIST_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const quizCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_CREATE_REQUEST:
      return { loading: true }
    case QUIZ_CREATE_SUCCESS:
      return { loading: false, success: true, quiz: action.payload }
    case QUIZ_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case QUIZ_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const quizUpdateReducer = (state = { quiz: {} }, action) => {
  switch (action.type) {
    case QUIZ_UPDATE_REQUEST:
      return { loading: true }
    case QUIZ_UPDATE_SUCCESS:
      return { loading: false, success: true, quiz: action.payload }
    case QUIZ_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case QUIZ_UPDATE_RESET:
      return { quiz: {} }
    default:
      return state
  }
}
