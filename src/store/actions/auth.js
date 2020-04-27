import * as actionTypes from '../actions/actionTypes'

const { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, AUTH_INIT_LOGOUT,
  SET_AUTH_REDIRECT_PATH, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE } = actionTypes
export const authStart = () => ({ type: AUTH_START })
export const authSuccess = (token, userId) => ({ type: AUTH_SUCCESS, token, userId })
export const authFail = error => ({ type: AUTH_FAILURE, error })
export const setAuthRedirectPath = path => ({ type: SET_AUTH_REDIRECT_PATH, path })
export const checkAuthTimeout = expirationTime => ({ type: AUTH_CHECK_TIMEOUT, expirationTime })
export const logout = () => ({ type: AUTH_INIT_LOGOUT })
export const logoutSucceeded = () => ({ type: AUTH_LOGOUT })
export const auth = (email, password, isSignup) => ({ type: AUTH_USER, email, password, isSignup })
export const authCheckState = () => ({ type: AUTH_CHECK_STATE })