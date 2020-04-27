import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actionTypes from '../actions'
const { setIngredients, fetchIngredientsFailed } = actionTypes

export function* initIngredientsSaga() {
  try {
    const { data } = yield axios.get('/ingredients.json')
    yield put(setIngredients(data))
  }
  catch (err) {
    yield put(fetchIngredientsFailed())
  }
}