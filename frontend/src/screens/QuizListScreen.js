import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import {
  listQuizzes,
  listAuthorQuizzes,
  deleteQuiz,
  createQuiz,
} from '../actions/quizActions'
import { QUIZ_CREATE_RESET } from '../constants/quizConstants'

const QuizListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const quizList = useSelector((state) => state.quizList)
  const quizAuthorList = useSelector((state) => state.quizAuthorList)

  const { loading, error, quizzes, page, pages } =
    !userInfo || userInfo.isModerator ? quizList : quizAuthorList

  const quizDelete = useSelector((state) => state.quizDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = quizDelete

  const quizCreate = useSelector((state) => state.quizCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    quiz: createdQuiz,
  } = quizCreate

  useEffect(() => {
    dispatch({ type: QUIZ_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (!userInfo.isAdmin) {
      history.push('/')
    }

    if (successCreate) {
      history.push(`/admin/quiz/${createdQuiz._id}/edit`)
    } else {
      if (!userInfo || userInfo.isModerator) {
        dispatch(listQuizzes('', pageNumber))
      } else {
        dispatch(listAuthorQuizzes(userInfo._id, pageNumber))
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
    successDelete,
    successCreate,
    createdQuiz,
  ])

  const deleteHandler = (id, name) => {
    if (window.confirm(`Really delete the quiz "${name}" ?`)) {
      dispatch(deleteQuiz(id))
    }
  }

  const createQuizHandler = () => {
    dispatch(createQuiz())
  }

  return (
    <>
      <Meta title="Admin Quizzes" />
      <Row className="align-items-center">
        <Col>
          <h2>Quizzes</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createQuizHandler}>
            <i className="fas fa-plus"></i> Create Quiz
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
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
                <th>#</th>
                <th>ID</th>
                <th>NAME</th>
                {userInfo.isModerator && <th>AUTHOR</th>}
                <th>NUMBER OF QUESTIONS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{8 * (pageNumber - 1) + index + 1}</td>
                  <td>{quiz._id}</td>
                  <td>{quiz.name}</td>
                  {userInfo.isModerator && (
                    <th>{quiz.user && quiz.user.name}</th>
                  )}
                  <td>{quiz.questions.length}</td>
                  <td>
                    <LinkContainer to={`/admin/quiz/${quiz._id}/edit`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(quiz._id, quiz.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin={true} pages={pages} page={page} />
        </Row>
      )}
    </>
  )
}

export default QuizListScreen
