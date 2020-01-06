import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import { removeMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = ({ notification, removeMessage }) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    removeMessage()
  }

  if (!notification) {
    return null
  }

  return  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={!!notification}
    autoHideDuration={6000}
    onClose={handleClose}
    message={notification.message}
    action={
      <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
  />
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, { removeMessage })(Notification)

Notification.propTypes = {
  notification: PropTypes.object,
  removeMessage: PropTypes.func.isRequired
}