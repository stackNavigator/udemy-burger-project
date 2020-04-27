import React from 'react'

import classes from './Order.css'
import Button from '../UI/Button/Button'

const Order = ({ price, ingredients }) => {
  const ingredientList = Object.keys(ingredients).map(i => <span
    key={i}
    style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }}>
    {i} ({ingredients[i]})
    </span>)
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientList}</p>
      <div className={classes.ActionRow}>
        <p >Price: <strong>USD {price.toFixed(2)}</strong></p>
        <Button btnType="Danger">Delete Order</Button>
      </div>
    </div>
  )
}

export default Order