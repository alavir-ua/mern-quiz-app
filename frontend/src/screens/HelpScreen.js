import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Meta from '../components/Meta'

const HelpScreen = () => {
  return (
    <>
      <Meta title="Help" />
      <h2>Help</h2>
      <Row
        style={{
          fontSize: '1.2rem',
          border: '1px solid #375a7f',
          padding: '1.5rem',
          borderRadius: '4px',
        }}
      >
        <Col>
          This site is a repository of quizzes on completely different topics.
          Anyone can go through a quiz in the area that is most interesting for
          him, while registration on the site is not required. The process is
          intuitive, at the end you will receive a score and a table with
          answers for comparison.
          <br />
          Quizzes were drawn up both by the developer of this site and by
          everyone who wants to join the co-authors.
          <br />
          If you would like to become one of the authors:
          <ul>
            <li>Go through the registration process.</li>
            <li>
              Write to the moderator about your desire, give your name when
              registering.
            </li>
          </ul>
          May luck be on your side!
          <br />
          <span style={{ color: 'red', fontSize: '1.0rem' }}>
            In the presentation version of the site, all data is randomly
            generated, quizzes do not carry a semantic load *
          </span>
        </Col>
      </Row>
    </>
  )
}

export default HelpScreen
