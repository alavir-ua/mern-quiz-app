import {
  MAIL_SEND_REQUEST,
  MAIL_SEND_SUCCESS,
  MAIL_SEND_FAIL,
} from '../constants/mailConstants.js'
import axios from 'axios'

export const mailSend = (mail) => async (dispatch) => {
  try {
    dispatch({ type: MAIL_SEND_REQUEST })

    const { data } = await axios.post('/api/sendmail', mail)

    dispatch({
      type: MAIL_SEND_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MAIL_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
