import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../axios-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

export const BurgerBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false)

  const ingredients = useSelector(({ burgerBuilder: { ingredients } }) => ingredients)
  const totalPrice = useSelector(({ burgerBuilder: { totalPrice } }) => totalPrice)
  const error = useSelector(({ burgerBuilder: { error } }) => error)
  const isAuthenticated = useSelector(({ auth: { token } }) => token !== null)

  const dispatch = useDispatch()
  const { addIngredient, removeIngredient, initIngredients, purchaseInit,
    setAuthRedirectPath } = actions
  const onIngredientAdded = ingredientName => dispatch(addIngredient(ingredientName))
  const onIngredientRemoved = ingredientName => dispatch(removeIngredient(ingredientName))
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [])
  const onInitPurchase = () => dispatch(purchaseInit())
  const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const purchasableHandler = ingredients => {
    return Object.values(ingredients)
      .reduce((acc, amount) => acc + amount, 0) > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated)
      setPurchasing(true)
    else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => setPurchasing(false)

  const purchaseContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout')
  }

  const disabledInfo = { ...ingredients }
  for (let ingredient in ingredients)
    disabledInfo[ingredient] = ingredients[ingredient] <= 0
  const orderSummary = !ingredients
    ? <Spinner />
    : <OrderSummary
      ingredients={ingredients}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={totalPrice} />
  const burger = ingredients
    ? <React.Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        isAuthenticated={isAuthenticated}
        ingredientAdded={onIngredientAdded}
        ingredientRemoved={onIngredientRemoved}
        purchasable={purchasableHandler(ingredients)}
        ordered={purchaseHandler}
        disabled={disabledInfo}
        price={totalPrice} />
    </React.Fragment>
    : error
      ? <p>Ingredients cannot be loaded!</p>
      : <Spinner />
  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  )
}

export default withErrorHandler(BurgerBuilder, axios)