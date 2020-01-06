const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      _id: '5e10d01ba8721275900992b3',
      username: 'june',
      name: 'Jonathan S'
    },
    comments: [{
      content: 'some random comment',
      author: 'anonymous',
      date: new Date()
    }]
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      _id: '5e10d01ba8721275900992b3',
      username: 'june',
      name: 'Jonathan S'
    },
    comments: [{
      content: 'some random comment',
      author: 'anonymous',
      date: new Date()
    }]
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://wwwcs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      _id: '5e10d01ba8721275900992b3',
      username: 'june',
      name: 'Jonathan S'
    },
    comments: [{
      content: 'some random comment',
      author: 'anonymous',
      date: new Date()
    }]
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return null
}

export default { getAll, setToken }