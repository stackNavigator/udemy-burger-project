import * as actionTypes from '../actions/actionTypes'
import { updateObject, updateArray } from '../utility'

const initState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = state => updateObject(state, { purchased: false })
const purchaseBurgerStart = state => updateObject(state, { loading: true })
const purchaseBurgerSuccess = (state, orderId, orderData) => {
  const { orders } = state
  return updateObject(state, {
    loading: false,
    orders: updateArray(orders, { orderId, ...orderData }),
    purchased: true
  })
}
const purchaseBurgerFailure = state => updateObject(state, { loading: false })
const fetchOrdersStart = state => updateObject(state, { loading: true })
const fetchOrdersSuccess = (state, ordersList) => updateObject(state, {
  orders: ordersList,
  loading: false
})
const fetchOrdersFailure = state => updateObject(state, { loading: false })

export default (state = initState, { type, orderId, orderData, ordersList }) => {
  const { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE, PURCHASE_BURGER_START,
    PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } = actionTypes
  switch (type) {
    case PURCHASE_INIT:
      return purchaseInit(state)
    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state)
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, orderId, orderData)
    case PURCHASE_BURGER_FAILURE:
      return purchaseBurgerFailure(state)
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state)
    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, ordersList)
    case FETCH_ORDERS_FAILURE:
      return fetchOrdersFailure(state)
    default:
      return state
  }
}