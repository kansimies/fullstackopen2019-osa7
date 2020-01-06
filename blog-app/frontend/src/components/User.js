import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from '@material-ui/core'

const User = ({ user, onBlogClick, onCreateClick, canCreate }) => {

  if (!user) {
    return null
  }

  return (
    <Container>
      <Typography variant="h4">{user.name}</Typography>
      <Grid item container justify="space-between" alignItems="center" style={{ marginBottom: '32px', marginTop: '32px' }}>
        <Typography variant="h6">Added blogs</Typography>
        {!!canCreate && <Button color="primary" variant="outlined" onClick={onCreateClick}>Create new blog</Button>}
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Title
            </TableCell>
            <TableCell>
              Author
            </TableCell>
            <TableCell>
              Likes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.isEmpty(user.blogs) ?
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="body2" align="center" style={{ margin: '16px' }}>{user.name} does not have any blogs yet.</Typography>
              </TableCell>
            </TableRow>
            :
            _.map(user.blogs, blog =>
              <TableRow key={blog.id} onClick={() => onBlogClick(blog.id)} hover>
                <TableCell>
                  {blog.title}
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
                <TableCell>
                  {blog.likes}
                </TableCell>
              </TableRow>)}
        </TableBody>
      </Table>
    </Container>
  )
}

export default User

User.propTypes = {
  user: PropTypes.object.isRequired,
  onBlogClick: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
  canCreate: PropTypes.bool.isRequired
}