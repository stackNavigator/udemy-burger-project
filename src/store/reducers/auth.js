import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = state => updateObject(state, { error: null, loading: true })
const authSuccess = (state, token, userId) => updateObject(state, {
  token,
  userId,
  error: null,
  loading: false,
})
const authFail = (state, error) => updateObject(state, { error, loading: false })
const authLogout = state => updateObject(state, { token: null, userId: null })
const setAuthRedirectPath = (state, authRedirectPath) => updateObject(state, { authRedirectPath }) 

export default (state = initState, { type, token, userId, error, path }) => {
  const { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } = actionTypes
  switch (type) {
    case AUTH_START:
      return authStart(state)
    case AUTH_SUCCESS:
      return authSuccess(state, token, userId)
    case AUTH_FAILURE:
      return authFail(state, error)
    case AUTH_LOGOUT:
      return authLogout(state)
    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, path)
    default:
      return state
  }
}