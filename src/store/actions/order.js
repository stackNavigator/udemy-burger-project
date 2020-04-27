import * as actionTypes from './actionTypes'

const { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE, PURCHASE_BURGER_START,
  PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_ORDERS_START,
  PURCHASE_BURGER, FETCH_ORDERS } = actionTypes
export const purchaseBurgerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData
})
export const purchaseBurgerFailure = error => ({ type: PURCHASE_BURGER_FAILURE, error })
export const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START })
export const purchaseBurger = (orderData, token) => ({ type: PURCHASE_BURGER, orderData, token })
export const purchaseInit = () => ({ type: PURCHASE_INIT })
export const fetchOrdersSuccess = orders => ({ type: FETCH_ORDERS_SUCCESS, ordersList: orders })
export const fetchOrdersFailure = error => ({ type: FETCH_ORDERS_FAILURE, error })
export const fetchOrdersStart = () => ({ type: FETCH_ORDERS_START })
export const fetchOrders = (token, userId) => ({ type: FETCH_ORDERS, token, userId })