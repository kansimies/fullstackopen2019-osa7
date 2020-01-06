import React from 'react'
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

const LoginForm = ({ onLogin, username, password }) => {

  return (
    <Grid container justify="center">
      <Grid item xs={5}>
        <Typography variant="h2" align="center">Log in to application</Typography>
        <Grid container direction="row" justify="center">
          <form noValidate autoComplete="off" onSubmit={onLogin}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={username.onChange}
              value={username.value}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={password.onChange}
              value={password.value}
            />
            <Button type="submit" color="primary" variant="contained">Log In</Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoginForm

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}