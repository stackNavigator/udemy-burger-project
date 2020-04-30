import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import axios from 'axios'

import { logoutSucceeded, authStart, authSuccess, authFail, checkAuthTimeout, logout } from '../actions'

export function* logoutSaga() {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(logoutSucceeded())
}

export function* checkAuthTimeoutSaga({ expirationTime }) {
  yield delay(expirationTime * 1000)
  yield put(logoutSucceeded())
}

export function* authUserSaga({ email, password, isSignup }) {
  try {
    yield put(authStart())
    const url = isSignup
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    const { data: { idToken, localId, expiresIn } } = yield axios
      .post(url, {
        email,
        password,
        returnSecureToken: true
      })
    yield localStorage.setItem('token', idToken)
    yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + expiresIn * 1000))
    yield localStorage.setItem('userId', localId)
    yield put(authSuccess(idToken, localId))
    yield put(checkAuthTimeout(expiresIn))
  }
  catch (err) {
    const { response: { data: { error } } } = err
    yield put(authFail(error))
  }
}

export function* authCheckStateSaga() {
  const expDate = new Date(localStorage.getItem('expirationDate'))
  if (!localStorage.getItem('token'))
    yield put(logout())
  else if (expDate > new Date()) {
    yield put(authSuccess(localStorage.getItem('token'), localStorage.getItem('userId')))
    yield put(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
  }
  else
    yield put(logout())
}