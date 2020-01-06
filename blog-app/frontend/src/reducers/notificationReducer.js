const reducer = (state = null, action) => {
  switch (action.type) {
  case 'REMOVE_MESSAGE':
    return null
  case 'ADD_MESSAGE':
    return action.data
  default:
    return state
  }
}

export default reducer

const removeMessage = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_MESSAGE'
    })
  }
}

const setErrorMessage = (message) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: {
        message,
        type: 'error'
      }
    })
  }
}

export {
  setErrorMessage,
  removeMessage
}