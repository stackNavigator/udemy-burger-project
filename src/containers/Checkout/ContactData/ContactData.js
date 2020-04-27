import React, { useState } from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { checkValidity } from '../../../shared/validation'
import * as orderActions from '../../../store/actions'

const ContactData = ({ ingredients, totalPrice, token, userId, loading, onOrderBurger }) => {
  const [isFormValid, setFormValidity] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  })

  const orderHandler = e => {
    e.preventDefault()
    const orderData = Object.keys(orderForm).reduce((acc, key) => (
      { ...acc, [key]: orderForm[key].value }
    ), {})
    onOrderBurger({ ingredients, price: totalPrice, orderData, userId }, token)
  }

  const inputChangedHandler = ({ target: { value } }, inputKey) => {
    const { validation } = orderForm[inputKey]
    const updatedInput = {
      ...orderForm[inputKey],
      value,
      valid: checkValidity(value, validation),
      touched: true
    }
    const newOrderForm = { ...orderForm, [inputKey]: updatedInput }
    const isFormValid = Object.keys(newOrderForm).every(key => newOrderForm[key].valid)
    setOrderForm(newOrderForm)
    setFormValidity(isFormValid)
  }

  const formElements = Object.keys(orderForm).map(key => ({
    id: key,
    config: orderForm[key]
  }))
  let form = loading
    ? <Spinner />
    : (
      <form onSubmit={orderHandler}>
        {formElements.map(({ id,
          config: { elementType, elementConfig, value, valid, validation, touched } }) => (
            <Input
              key={id}
              elementType={elementType}
              elementConfig={elementConfig}
              value={value}
              invalid={!valid}
              shouldValidate={validation}
              touched={touched}
              changed={e => inputChangedHandler(e, id)} />
          ))}
        <Button btnType="Success" disabled={!isFormValid}>ORDER</Button>
      </form>
    )
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  )
}

const mapStateToProps = ({ burgerBuilder: { ingredients, totalPrice }, order: { loading },
  auth: { token, userId } }) => ({
    ingredients,
    totalPrice,
    loading,
    token,
    userId
  })
const mapDispatchToProps = dispatch => {
  const { purchaseBurger } = orderActions
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))