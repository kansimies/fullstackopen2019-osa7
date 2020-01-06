import axios from 'axios'
import _ from 'lodash'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBlog = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }
  return await axios.put(`${baseUrl}/${blog.id}`, _.omit(blog, 'user'), config)
}

const submitPost = async (newPost) => {

  const config = {
    headers: { Authorization: token },
  }

  return await axios.post(baseUrl, newPost, config)
}

const deletBlog = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  return await axios.delete(`${baseUrl}/${id}`, config)

}

const addBlogComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.put(`${baseUrl}/${id}/comments`, comment, config)

}


export default { getAll, submitPost, setToken, updateBlog, deletBlog, addBlogComment }