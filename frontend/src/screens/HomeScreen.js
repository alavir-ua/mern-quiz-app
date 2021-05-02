import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listQuizzes } from '../actions/quizActions'
import { resetQuizParams } from '../actions/paramsActions'

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const quizList = useSelector((state) => state.quizList)
  const { loading, error, quizzes, page, pages } = quizList

  useEffect(() => {
    dispatch(
      resetQuizParams({
        currentIndex: 0,
        question: null,
        answer: null,
        options: [],
      })
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(listQuizzes(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h2>Choose your quiz</h2>
      <Meta title="Quizzes List" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <ListGroup className="quizzes-list" variant="flush">
                {quizzes.map((quiz, idx) => (
                  <ListGroup.Item key={idx}>
                    <Link style={{ color: 'white' }} to={`/quiz/${quiz._id}`}>
                      {quiz.name}
                    </Link>{' '}
                    <span style={{ color: '#00bc8c' }}>
                      (author: {quiz.user && quiz.user.name}
                      {' , '}
                      {quiz.questions.length} questions)
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Paginate
            isAdmin={false}
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
