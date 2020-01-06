import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogsReducer'

const Blogs = ({ blogs, onBlogClick }) => {

  useEffect(() => {
    initializeBlogs()
  }, [])

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '32px' }}>Blogs</Typography>
      {_.isEmpty(blogs) ? <Typography variant="h6">No blogs yet in the application! <Link to="/create">Create one?</Link></Typography> :
        <List>
          {_.map(blogs, blog =>
            <ListItem key={blog.id} divider button>
              <ListItemText primary={blog.title} secondary={`Author: ${blog.author}`} onClick={() => onBlogClick(blog.id)} />
            </ListItem>
          )}
        </List>}
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { initializeBlogs })(Blogs)

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  onBlogClick: PropTypes.func.isRequired
}