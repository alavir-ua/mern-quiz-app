import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import moment from 'moment'
import 'moment/locale/en-gb'
import { listUsers, deleteUser } from '../actions/userActions'
import { deleteAuthorQuizzes } from '../actions/quizActions'

const UserListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete, userId } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers('', pageNumber))
    } else {
      history.push('/login')
    }
    if (successDelete) {
      dispatch(deleteAuthorQuizzes(userId))
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber, userId])

  const deleteHandler = (id, name) => {
    if (window.confirm(`Really delete the ${name}'s profile?`)) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title="Admin Users" />
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>REGISTERED</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{8 * (pageNumber - 1) + index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{moment(user.createdAt).format('LLL')}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id, user.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin={true} type="users" pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default UserListScreen
