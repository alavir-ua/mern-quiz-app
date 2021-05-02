import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { mailSend } from '../actions/mailActions'
import { MAIL_SEND_RESET } from '../constants/mailConstants'

const FeedbackScreen = () => {
  const [mail, setMail] = useState({ email: '', text: '' })
  const [alert, setAlert] = useState('')

  const dispatch = useDispatch()

  const sendMail = useSelector((state) => state.mail)
  const { loading, error, result } = sendMail

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(mailSend(mail))
  }

  useEffect(() => {
    if (result) {
      setMail({ email: '', text: '' })
      setAlert('Email was sent successfully')
    }
    dispatch({ type: MAIL_SEND_RESET })
  }, [dispatch, result])

  return (
    <FormContainer>
      <h1>Feedback</h1>
      <Meta title="Feedback" />
      {error && <Message variant="danger">{error}</Message>}
      {alert && <Message variant="success">{alert}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={mail.email}
            onChange={(e) => setMail({ ...mail, email: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Enter message"
            value={mail.text}
            onChange={(e) => setMail({ ...mail, text: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Send
        </Button>
      </Form>
    </FormContainer>
  )
}

export default FeedbackScreen
