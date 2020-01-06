import blogServices from '../services/blogs'
import { initializeUsers } from './usersReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'UPDATE_BLOG': {
    const id = action.data.id
    const updatedPost = action.data
    return state.map(blog => blog.id !== id ? blog : updatedPost)
  }
  default:
    return state
  }
}

export default reducer

const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogServices.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogServices.submitPost(blog)
    initializeUsers()
    dispatch({
      type: 'NEW_BLOG',
      data: response.data
    })
  }
}

const deleteBlog = (id) => {
  return async dispatch => {
    await blogServices.deletBlog(id)
    initializeUsers()
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

const updateBlog = (blog) => {
  return async dispatch => {
    const response = await blogServices.updateBlog(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: response.data
    })
  }
}

const addBlogComment = (id, comment) => {
  return async dispatch => {
    const response = await blogServices.addBlogComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: response.data
    })
  }
}

export {
  initializeBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  addBlogComment
}