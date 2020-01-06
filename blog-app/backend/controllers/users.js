const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {

  const body = request.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password has to be at least 3 characters.' })
    }

    if (body.username.length < 3) {
      return response.status(400).json({ error: 'Username has to be at least 3 characters.' })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    return response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter