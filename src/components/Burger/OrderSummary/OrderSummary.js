import React from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = ({ ingredients, price, purchaseCancelled, purchaseContinued }) => {
    const ingredientSummary = Object.keys(ingredients)
    .map(key => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize'}}>{key}</span>: {ingredients[key]}
    </li>
      )
    )
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
      </React.Fragment>
    )
}

export default OrderSummary