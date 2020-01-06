import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Button, TextField, Container } from '@material-ui/core'

const BlogForm = ({ onCreate, onCancel, title, author, url }) => {

  return (
    <Container>
      <Typography variant="h4">Create new blog</Typography>
      <form noValidate autoComplete="off" onSubmit={onCreate}>
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={title.onChange}
          value={title.value}
        />
        <TextField
          id="author"
          name="author"
          label="Author"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={author.onChange}
          value={author.value}
        />
        <TextField
          id="url"
          name="url"
          label="URL"
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          onChange={url.onChange}
          value={url.value}
        />
        <Grid item container justify="flex-end">
          <Button color="secondary" variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary" variant="contained" style={{ marginLeft: '8px' }}>Create</Button>
        </Grid>
      </form>
    </Container>
  )
}

export default BlogForm

BlogForm.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}
