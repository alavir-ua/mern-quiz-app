import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  isAdmin,
  pages,
  page,
  id = '',
  type = '',
  keyword = '',
}) => {
  const link = (x) => {
    if (isAdmin) {
      if (id) {
        return `/admin/quiz/${id}/edit/page/${x + 1}`
      } else if (type === 'users') {
        return `/admin/userlist/page/${x + 1}`
      } else {
        return `/admin/quizlist/page/${x + 1}`
      }
    } else {
      if (id) {
        return `/quiz/${id}/page/${x + 1}`
      } else if (keyword) {
        return `/search/${keyword}/page/${x + 1}`
      } else {
        return `/page/${x + 1}`
      }
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={link(x)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
