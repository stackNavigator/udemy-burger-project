import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actionTypes from '../actions'
const { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFailure, fetchOrdersStart, 
  fetchOrdersSuccess, fetchOrdersFailure } = actionTypes

export function* purchaseBurgerSaga({ orderData, token }) {
  try {
    yield put(purchaseBurgerStart())
    const { data: { name } } = yield axios.post(`/orders.json?auth=${token}`, orderData)
    yield put(purchaseBurgerSuccess(name, orderData))
  }
  catch (err) {
    yield put(purchaseBurgerFailure(err))
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  try {
    yield put(fetchOrdersStart())
    const { data } = yield axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
    const orders = Object.keys(data).map(key => ({ ...data[key], id: key }))
    yield put(fetchOrdersSuccess(orders))
  }
  catch (err) {
    yield put(fetchOrdersFailure(err))
  }
}