import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = ({ token, userId, loading, orders, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders])

  const ordersList = loading
    ? <Spinner />
    : orders.map(({ id, ingredients, price }) => <Order
      key={id}
      ingredients={ingredients}
      price={+price} />)
  return (
    <div>
      {ordersList}
    </div>
  )
}

const mapStateToProps = ({ order: { orders, loading }, auth: { token, userId } }) => ({
  orders,
  loading,
  token,
  userId
})

const mapDispatchToProps = dispatch => {
  const { fetchOrders } = actions
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))