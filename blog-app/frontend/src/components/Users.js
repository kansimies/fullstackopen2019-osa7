import React, { useEffect } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import PropTypes from 'prop-types'
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography } from '@material-ui/core'

const Users = ({ users }) => {

  useEffect(() => {
    initializeUsers()
  }, [])

  return (
    <Container>
      <Typography variant="h4">Users in the application</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Number of blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(users, user => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Container>
  )
}

export default connect(null, { initializeUsers })(Users)

Users.propTypes = {
  users: PropTypes.array.isRequired
}