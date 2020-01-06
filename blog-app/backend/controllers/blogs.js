const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userId = decodedToken.id
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === userId.toString()) {
      await blog.delete()
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'You are not the creator of this blog.' })
    }

  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id/comments', async (request, response, next) => {
  const body = request.body
  try {
    const updatedBlog = await Blog.findById(request.params.id)
    updatedBlog.comments.push({ ...body, date: new Date() })
    await updatedBlog.save()
    return response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter