import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Blogs from './components/Blogs'
import { useField } from './hooks'
import { initializeBlogs, createBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setErrorMessage } from './reducers/notificationReducer'
import {
  withRouter,
  Route, Redirect, Switch
} from 'react-router-dom'
import './App.css'
import { List, ListItem, ListItemText, Drawer, Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

const Menu = ({ user, history, onLogout }) => {
  return (
    <Drawer anchor="left" open={true} variant="permanent">
      <List>
        <ListItem button onClick={() => history.push('/users')}>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => history.push('/blogs')}>
          <ListItemText primary="Blogs" />
        </ListItem>
        <ListItem button onClick={() => history.push('/create')}>
          <ListItemText primary="Create New Blog" />
        </ListItem>
        <ListItem>
          <ListItemText secondary={`Logged in as ${user.name}`} />
        </ListItem>
        <ListItem>
          <Button color="inherit" onClick={onLogout} variant="outlined">Log out</Button>
        </ListItem>
      </List>
    </Drawer>
  )
}

const App = (props) => {

  const {
    users, blogs,
    history, initializeBlogs, initializeUsers,
    createBlog, deleteBlog, setErrorMessage
  } = props

  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    if (user) {
      initializeBlogs()
      initializeUsers()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginServices.login({ username: username.value, password: password.value })
      const user = response.data
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      password.reset()
      username.reset()
      history.push('/blogs')
    } catch (err) {
      setErrorMessage(err.response.data.error)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      await createBlog({ title: title.value, author: author.value, url: url.value })
      title.reset()
      author.reset()
      url.reset()
      history.push('/blogs')
    } catch (err) {
      if (err.response.status === 401) {
        handleLogout()
      }
      setErrorMessage(err.response.data.error || 'Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to remove this blog post?')) {
      try {
        history.push('/blogs')
        await deleteBlog(id)
      } catch (err) {
        setErrorMessage(err.response.data.error)
      }
    }
  }

  const handleCancel = () => {
    title.reset()
    author.reset()
    url.reset()
    history.push('/blogs')
  }

  const handleBlogClick = (id) => {
    history.push(`/blogs/${id}`)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    history.replace('/login')
  }

  const getUser = (id) => {
    return _.find(users, { id })
  }

  const getBlog = (id) => {
    return _.find(blogs, { id })
  }

  if (user === null) {

    return (
      <Switch>
        <Route path={'/login'} render={() =>
          <LoginForm
            onLogin={handleLogin}
            username={username}
            password={password}
          />}
        />
        <Route path={'/:any'} render={() => <Redirect to="/login" /> } />
      </Switch>

    )
  }

  return (
    <div>
      <Menu
        user={user}
        onLogout={handleLogout}
        history={history}
      />
      <Grid container>
        <Switch>
          <Route exact={true} path="/users" render={() => <Users users={users} />} />
          <Route path="/users/:id" render={({ match }) =>
            <User
              user={getUser(match.params.id)}
              canCreate={user.id === match.params.id}
              onBlogClick={handleBlogClick}
              onCreateClick={() => history.push('/create')}
            />}
          />
          <Route path="/create" render={() =>
            <BlogForm
              title={title}
              author={author}
              url={url}
              onCreate={handleCreateBlog}
              onCancel={handleCancel}
            />}
          />
          <Route exact={true} path="/blogs" render={() =>
            <Blogs
              onBlogClick={handleBlogClick}
              blogs={blogs}
            />}
          />
          <Route path="/blogs/:id" render={({ match }) => {

            const blog = getBlog(match.params.id)
            const isRemovable = blog.user === user.id

            return <Blog blog={blog} isRemovable={isRemovable} onDeleteBlog={handleDelete} />
          }}
          />
          <Route path="/:any?" render={() => <Redirect to="/blogs" />} />
        </Switch>
      </Grid>
    </div >
  )
}

const mapStateToProps = (state) => {
  const { users, blogs } = state
  return {
    users,
    blogs: _.orderBy(blogs, 'likes', 'desc')
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUsers, createBlog, deleteBlog, setErrorMessage })(withRouter(App))


App.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}