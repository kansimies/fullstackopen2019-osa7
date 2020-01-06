import userServices from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default reducer

const initializeUsers = () => {
  return async dispatch => {
    const data = await userServices.getAll()
    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}

export {
  initializeUsers
}