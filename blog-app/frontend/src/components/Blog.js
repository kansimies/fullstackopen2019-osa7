import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlog, addBlogComment } from '../reducers/blogsReducer'
import { useField } from '../hooks'
import '../App.css'
import { Grid, Typography, Button, TextField, Container, List, ListItem, ListItemText, IconButton } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { setErrorMessage } from '../reducers/notificationReducer'

const Blog = ({ updateBlog, onDeleteBlog, blog, addBlogComment, isRemovable }) => {
  const comment = useField('text')

  const addComment = async () => {
    try {
      await addBlogComment(blog.id, { content: comment.value, author: 'anonymous' })
      comment.reset()
    } catch (err) {
      setErrorMessage(err.response.data.error)
    }
  }

  const handleUpdate = async (updatedBlog) => {
    try {
      await updateBlog(updatedBlog)
    } catch (err) {
      setErrorMessage(err.reponse.data.error)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Container>
      <Grid item container justify="space-between" alignItems="center" style={{ marginBottom: '16px' }}>
        <Typography variant="h5">{blog.title} <i>by {blog.author}</i></Typography>
        {isRemovable && <Button variant="outlined" color="secondary" onClick={() => onDeleteBlog(blog.id)}>Delete blog</Button>}
      </Grid>
      <Typography variant="body1">URL: {blog.url}</Typography>
      <Typography variant="body1">Likes: {blog.likes}</Typography>
      <IconButton onClick={() => handleUpdate({ ...blog, likes: (blog.likes + 1) })} color="primary"><ThumbUpIcon /></IconButton>
      <IconButton onClick={() => handleUpdate({ ...blog, likes: (blog.likes - 1) })} color="secondary"><ThumbDownIcon /></IconButton>
      <Typography variant="h6" margin="normal" style={{ marginBottom: '16px' }}>Comments</Typography>
      {_.isEmpty(blog.comments) ? <Typography variant="body1">No one has commented yet.</Typography> :
        <List>
          {_.map(blog.comments || [], (comment, index) =>
            <ListItem key={index} divider>
              <ListItemText primary={comment.content} secondary={comment.author} />
            </ListItem>)}
        </List>}
      <Grid item container alignItems="baseline" wrap="nowrap">
        <TextField
          id="comment"
          margin="normal"
          label="Add comment"
          placeholder="Type here..."
          multiline
          fullWidth
          value={comment.value}
          onChange={comment.onChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button variant="outlined" size="small" color="primary" onClick={addComment} style={{ marginLeft: '16px' }}>Add</Button>
      </Grid>
    </Container>
  )
}

export default connect(null, { updateBlog, addBlogComment })(Blog)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isRemovable: PropTypes.bool.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  addBlogComment: PropTypes.func.isRequired
}