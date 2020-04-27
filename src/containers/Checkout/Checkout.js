import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = ({ history, match, ingredients, purchased }) => {
  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  const summary = ingredients
    ? <div>
      {purchased && <Redirect to="/" />}
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler} />
      <Route
        path={`${match.url}/contact-data`}
        component={ContactData} />
    </div>
    : <Redirect to="/" />
  return summary
}

const mapStateToProps = ({ burgerBuilder: { ingredients }, order: { purchased } }) => ({
  ingredients,
  purchased
})

export default connect(mapStateToProps)(Checkout)