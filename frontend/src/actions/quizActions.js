import axios from 'axios'
import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_AUTHOR_LIST_REQUEST,
  QUIZ_AUTHOR_LIST_SUCCESS,
  QUIZ_AUTHOR_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  QUIZ_AUTHOR_LIST_DELETE_REQUEST,
  QUIZ_AUTHOR_LIST_DELETE_SUCCESS,
  QUIZ_AUTHOR_LIST_DELETE_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_FAIL,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
} from '../constants/quizConstants.js'
import { logout } from './userActions'

export const listQuizzes = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: QUIZ_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/quizzes?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: QUIZ_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAuthorQuizzes = (authorId = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: QUIZ_AUTHOR_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/quizzes/author/${authorId}?pageNumber=${pageNumber}`
    )

    dispatch({
      type: QUIZ_AUTHOR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: QUIZ_AUTHOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listQuizDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUIZ_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/quizzes/${id}`)

    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('quizData', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteQuiz = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/quizzes/${id}`, config)

    dispatch({
      type: QUIZ_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: QUIZ_DELETE_FAIL,
      payload: message,
    })
  }
}

export const deleteAuthorQuizzes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_AUTHOR_LIST_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/quizzes/author/${id}`, config)

    dispatch({
      type: QUIZ_AUTHOR_LIST_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: QUIZ_AUTHOR_LIST_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createQuiz = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/quizzes`, {}, config)

    dispatch({
      type: QUIZ_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: QUIZ_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateQuiz = (quiz) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/quizzes/${quiz._id}`, quiz, config)

    dispatch({
      type: QUIZ_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: QUIZ_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: QUIZ_UPDATE_FAIL,
      payload: message,
    })
  }
}
