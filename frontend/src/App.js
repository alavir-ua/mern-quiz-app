import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import QuizListScreen from './screens/QuizListScreen'
import QuizEditScreen from './screens/QuizEditScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import HelpScreen from './screens/HelpScreen'
import FeedbackScreen from './screens/FeedbackScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/quiz/:id" component={QuizScreen} exact />
            <Route
              path="/quiz/:id/page/:pageNumber"
              component={QuizScreen}
              exact
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/admin/quizlist" component={QuizListScreen} exact />
            <Route
              path="/admin/quizlist/page/:pageNumber"
              component={QuizListScreen}
              exact
            />
            <Route
              path="/admin/quiz/:id/edit"
              component={QuizEditScreen}
              exact
            />
            <Route
              path="/admin/quiz/:id/edit/page/:pageNumber"
              component={QuizEditScreen}
              exact
            />
            <Route path="/admin/userlist" component={UserListScreen} exact />
            <Route
              path="/admin/userlist/page/:pageNumber"
              component={UserListScreen}
              exact
            />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/help" component={HelpScreen} exact />
            <Route path="/feedback" component={FeedbackScreen} exact />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
