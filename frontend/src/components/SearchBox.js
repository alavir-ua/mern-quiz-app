import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        style={{ borderRadius: '3px' }}
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search quiz..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" style={{ border: ' 1px solid #272b30' }}>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
