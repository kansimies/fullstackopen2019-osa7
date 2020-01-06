const _ = require('lodash')
const Blog = require('../models/blog')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://wwwcs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const userArray = [{
  name: 'Arto Hellas',
  username: 'arto',
  password: 'sekret'
}]

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + (item.likes || 0), 0)
}

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max.apply(Math, blogs.map(blog => blog.likes))
  const blog = blogs.find(item => item.likes === maxLikes)
  return {
    author: blog.author,
    title: blog.title,
    likes: blog.likes
  }
}

const mostBlogs = (blogs) => {
  let mostBlogs
  let author
  const count = _.countBy(blogs, 'author')
  for (let item in count) {
    if (!mostBlogs || mostBlogs < count[item]) {
      mostBlogs = count[item]
      author = item
    }
  }
  return {
    author,
    blogs: mostBlogs
  }
}

const mostLikes = (blogs) => {
  let authors = {}
  _.forEach(blogs, item => {
    if (!authors[item.author]) {
      authors[item.author] = item.likes
    } else {
      authors[item.author] = authors[item.author] + item.likes
    }
  })
  let mostLikes
  let author
  for (let item in authors) {
    if (!mostLikes || mostLikes < authors[item]) {
      mostLikes = authors[item]
      author = item
    }
  }
  return {
    author,
    likes: mostLikes
  }
}

const validBlog = {
  author: 'Jonathan Schröder',
  title: 'To Code?',
  url: 'https://www.google.com'
}

const testUser = {
  name: 'Jonathan Test',
  username: 'testUser',
  password: 'test'
}

const blogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
  userArray,
  blogsinDb,
  validBlog,
  testUser
}