import {
  MAIL_SEND_REQUEST,
  MAIL_SEND_SUCCESS,
  MAIL_SEND_FAIL,
  MAIL_SEND_RESET,
} from '../constants/mailConstants.js'

export const mailReducer = (state = {}, action) => {
  switch (action.type) {
    case MAIL_SEND_REQUEST:
      return { loading: true }
    case MAIL_SEND_SUCCESS:
      return { loading: false, result: action.payload }
    case MAIL_SEND_FAIL:
      return { loading: false, error: action.payload }
    case MAIL_SEND_RESET:
      return {}
    default:
      return state
  }
}
