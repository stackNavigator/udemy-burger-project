import { takeEvery } from 'redux-saga/effects'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'
import * as actionTypes from '../actions/actionTypes'
const { AUTH_INIT_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE, INIT_INGREDIENTS,
  PURCHASE_BURGER, FETCH_ORDERS } = actionTypes

export function* watchAuth() {
  yield takeEvery(AUTH_INIT_LOGOUT, logoutSaga)
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(AUTH_USER, authUserSaga)
  yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
  yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga)
}