import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Table, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveQuizParams, resetQuizParams } from '../actions/paramsActions'
import { listQuizDetails } from '../actions/quizActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Paginate from '../components/Paginate'

const QuizScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const stateQuizParams = useSelector((state) => state.quizParams)

  const {
    currentAnswer,
    userAnswers,
    currentIndex,
    question,
    answer,
    options,
    quizEnd,
    score,
    disabled,
    radioActive,
    result,
  } = stateQuizParams

  const [finalResult, setFinalResult] = useState([])

  const stateQuizDetails = useSelector((state) => state.quizDetails)
  const { loading, error, quiz } = stateQuizDetails

  const { name, questions } = quiz

  const reset = () => {
    dispatch(
      resetQuizParams({
        currentIndex: 0,
        question: quiz.questions[0].question,
        options: quiz.questions[0].options,
        answer: quiz.questions[0].answer,
      })
    )
  }

  useEffect(() => {
    if (!quiz._id || quiz._id !== match.params.id) {
      dispatch(listQuizDetails(match.params.id))
    }
    dispatch(
      saveQuizParams({
        ...stateQuizParams,
        question: quiz.questions[currentIndex].question,
        options: quiz.questions[currentIndex].options,
        answer: quiz.questions[currentIndex].answer,
      })
    )
  }, [dispatch, match.params.id, currentIndex, quiz])

  const pageSize = 10
  const pages = Math.ceil(result.length / pageSize)

  useEffect(() => {
    setFinalResult(
      result.slice(pageSize * pageNumber - pageSize, pageSize * pageNumber)
    )
  }, [pageNumber, result])

  const writeAnswer = (choice) => {
    dispatch(
      saveQuizParams({
        ...stateQuizParams,
        currentAnswer: choice,
        userAnswers: [...userAnswers, choice],
        disabled: false,
        score: choice === answer ? score + 1 : score,
        radioActive: true,
      })
    )
  }

  const nextQuestionHandler = () => {
    dispatch(
      saveQuizParams({
        ...stateQuizParams,
        currentIndex: currentIndex + 1,
        disabled: true,
        radioActive: false,
      })
    )
  }

  const concat = (arr1, arr2) => {
    return arr1.map((obj, index) => {
      return {
        question: obj.question,
        rightAnswer: obj.answer,
        userAnswer: arr2[index],
      }
    })
  }

  const finishHandler = () => {
    if (currentIndex === questions.length - 1) {
      const result = concat(questions, userAnswers)
      dispatch(saveQuizParams({ ...stateQuizParams, quizEnd: true, result }))
    }
  }

  const rating = (score / questions.length) * 5

  const ratingText = (rating) => {
    if (rating <= 2) {
      return 'Poor'
    } else if (rating <= 3) {
      return 'Fair'
    } else if (rating <= 4) {
      return 'Good'
    } else if (rating < 5) {
      return 'Very Good'
    } else if (rating === 5) {
      return 'Excellent'
    }
  }

  return (
    <Row>
      {quizEnd ? (
        <Col>
          <Row>
            <Col>
              <h3 style={{ marginBottom: '1.2rem' }}>
                Quiz Over. Final score is {score} points from {questions.length}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Rating value={rating} text={ratingText(rating)} />
              <Button
                onClick={reset}
                style={{ float: 'right', marginBottom: '1rem' }}
              >
                Retry
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>QUESTION</th>
                    <th>RIGHT ANSWER</th>
                    <th>YOUR ANSWER</th>
                  </tr>
                </thead>
                <tbody>
                  {finalResult.map((item, index) => (
                    <tr key={index}>
                      <td>{pageSize * (pageNumber - 1) + index + 1}</td>
                      <td>{item.question}</td>
                      <td>{item.rightAnswer}</td>
                      <td>
                        {item.userAnswer !== item.rightAnswer ? (
                          <span style={{ color: 'red' }}>
                            {item.userAnswer}
                          </span>
                        ) : (
                          <span>{item.userAnswer}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate
                isAdmin={false}
                pages={pages}
                page={pageNumber}
                id={quiz._id}
              />
            </Col>
          </Row>
        </Col>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col>
          <h2>{name}</h2>
          <h3 style={{ marginBottom: '1rem' }}>{`Question ${
            currentIndex + 1
          } of ${questions.length}`}</h3>
          <h3>{question}</h3>
          <ListGroup className="quizzes-list" variant="flush">
            {options.map((option, idx) => (
              <ListGroup.Item key={idx}>
                <Button
                  className="check-btn"
                  value={option}
                  onClick={(e) => writeAnswer(e.target.value)}
                  disabled={radioActive}
                  style={{
                    background:
                      currentAnswer === option && radioActive ? '#006600' : '',
                  }}
                >
                  {option}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {currentIndex < questions.length - 1 && (
            <Button disabled={disabled} onClick={() => nextQuestionHandler()}>
              Next Question
            </Button>
          )}

          {currentIndex === questions.length - 1 && (
            <Button disabled={disabled} onClick={finishHandler}>
              Finish
            </Button>
          )}
        </Col>
      )}
    </Row>
  )
}

export default QuizScreen
