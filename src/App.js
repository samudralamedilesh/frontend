import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Home_page from './components/Home_page'
import Ask from './components/Ask'
import navbar from './components/Navbar'
import WriteBlog from './components/WriteBlog'
import QuestionState from './context questions/QuestionState'
import BlogState from './context blogs/BlogState'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <QuestionState>
        <BlogState>
        <Routes>
          <Route path='/' exact Component={Home_page}></Route>
          <Route path = '/login' exact Component={Login}></Route>
          <Route path = '/createuser' exact Component={Register}></Route>
          <Route path = '/homepage' exact Component = {Home_page}></Route>
          <Route path='/ask' exact Component = {Ask}></Route>
          <Route path='/navbar' exact Component = {navbar}></Route>
          <Route path='/writeblog' exact Component = {WriteBlog}></Route>

          
        </Routes>
        </BlogState>
        </QuestionState>
      </BrowserRouter>
    </>
  )
}

export default App

