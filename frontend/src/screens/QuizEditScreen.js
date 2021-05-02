import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import { listQuizDetails, updateQuiz } from '../actions/quizActions'
import { QUIZ_UPDATE_RESET } from '../constants/quizConstants'

const QuizEditScreen = ({ match, history }) => {
  const quizId = match.params.id
  const pageNumber = match.params.pageNumber || 1

  const [name, setName] = useState('')
  const [asks, setAsks] = useState([])
  const [alarm, setAlarm] = useState('')

  const [inputList, setInputList] = useState([])

  const dispatch = useDispatch()

  const quizDetails = useSelector((state) => state.quizDetails)
  const { loading, error, quiz } = quizDetails

  const { questions } = quiz
  const pageSize = 5
  const pages = Math.ceil(questions.length / pageSize)

  const quizUpdate = useSelector((state) => state.quizUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = quizUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUIZ_UPDATE_RESET })
      setInputList([])
      setAlarm('')
      history.push(`/admin/quiz/${quiz._id}/edit`)
    } else {
      if (!quiz.name || quiz._id !== quizId) {
        dispatch(listQuizDetails(quizId))
      } else {
        setName(quiz.name)
      }
    }

    const questionsCopy = [...questions].reverse()

    setAsks(
      questionsCopy.slice(
        pageSize * pageNumber - pageSize,
        pageSize * pageNumber
      )
    )
  }, [dispatch, history, quizId, quiz, successUpdate, questions, pageNumber])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      inputList.length !== 0 &&
      (inputList[0].question === '' ||
        inputList[0].answer === '' ||
        inputList[0].options.length === 0)
    ) {
      setAlarm('Questions form fields cannot be empty!')
    } else if (inputList.length === 0) {
      dispatch(
        updateQuiz({
          _id: quizId,
          name,
          questions,
        })
      )
    } else {
      const questionsCopy = [...questions]
      const updatedQuestions = questionsCopy.concat(inputList)
      dispatch(
        updateQuiz({
          _id: quizId,
          name,
          questions: updatedQuestions,
        })
      )
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = name === 'options' ? value.split(',') : value
    setInputList(list)
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([...inputList, { question: '', answer: '', options: [] }])
  }

  const deleteHandler = (quizId, questionId) => {
    if (window.confirm(`Really delete the question id=${questionId}?`)) {
      const questionsCopy = [...questions]

      const newQuestions = questionsCopy.filter((q) => {
        return q._id !== questionId
      })

      dispatch(
        updateQuiz({
          _id: quizId,
          name: quiz.name,
          questions: newQuestions,
        })
      )
    }
  }

  return (
    <>
      <LinkContainer to={'/admin/quizlist'}>
        <Button className="btn btn-outline-light my-3">Go Back</Button>
      </LinkContainer>

      <h1>Edit Quiz</h1>
      <Meta title="Admin Edit Quiz" />
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              {alarm && <Message variant="danger">{alarm}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>
                    <h4>Name</h4>
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {inputList.map((x, i) => {
                  return (
                    <Form.Group key={i} controlId="questions">
                      <Form.Label>
                        <h4>Question</h4>
                      </Form.Label>
                      <Form.Control
                        name="question"
                        placeholder="Enter question"
                        value={x.question}
                        onChange={(e) => handleInputChange(e, i)}
                      ></Form.Control>
                      <Form.Control
                        name="answer"
                        placeholder="Enter answer"
                        value={x.answer}
                        onChange={(e) => handleInputChange(e, i)}
                      ></Form.Control>
                      <Form.Control
                        name="options"
                        placeholder="Enter options, comma separated"
                        value={x.options}
                        onChange={(e) => handleInputChange(e, i)}
                      ></Form.Control>
                      {inputList.length !== 0 && (
                        <Button
                          variant="primary"
                          style={{ marginTop: '0.5rem' }}
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove question fields
                        </Button>
                      )}
                    </Form.Group>
                  )
                })}

                <Button type="submit" variant="primary">
                  Update
                </Button>
                <Button
                  variant="primary"
                  style={{ marginLeft: '0.2rem' }}
                  onClick={handleAddClick}
                >
                  Add question fields
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              {questions.length !== 0 ? (
                <>
                  <h4 style={{ marginTop: '1.2rem' }}>Questions</h4>
                  <Table
                    style={{ marginBottom: '1.2rem' }}
                    striped
                    bordered
                    hover
                    responsive
                    className="table-sm"
                  >
                    <thead>
                      <tr>
                        <td>#</td>
                        <th>ID</th>
                        <th>QUESTION</th>
                        <th>ANSWER</th>
                        <th>OPTIONS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asks.map((q, index) => (
                        <tr key={q._id}>
                          <td>{pageSize * (pageNumber - 1) + index + 1}</td>
                          <td>{q._id}</td>
                          <td>{q.question}</td>
                          <td>{q.answer}</td>
                          <td>{q.options.join(', ')}</td>
                          <td>
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteHandler(quiz._id, q._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate
                    isAdmin={true}
                    pages={pages}
                    page={pageNumber}
                    id={quizId}
                  />
                </>
              ) : (
                <h4 style={{ marginTop: '1.2rem' }}>No questions yet...</h4>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default QuizEditScreen
