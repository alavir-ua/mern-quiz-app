import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const NotFoundScreen = ({ history }) => {
  let location = useLocation()

  const clickHandler = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <Row
      style={{
        background: '#16181d',
      }}
    >
      <Col>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <span
            style={{ color: '#2c4866', fontSize: '10rem', marginTop: '1rem' }}
          >
            404
          </span>
          <h2>
            Page <code style={{ color: '#b30000' }}>{location.pathname}</code>{' '}
            not found...
          </h2>
          <Button
            onClick={(e) => clickHandler(e)}
            style={{ marginTop: '2rem' }}
          >
            Back Home
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default NotFoundScreen
