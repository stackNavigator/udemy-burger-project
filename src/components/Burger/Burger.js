import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ({ ingredients }) => {
  let ingredientList = Object.keys(ingredients)
    .map(ingredient => [...Array(ingredients[ingredient])]
      .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient}></BurgerIngredient>)
    )
    .reduce((acc, ingredientAmount) => [ ...acc, ...ingredientAmount], [])
  if (!ingredientList.length)
    ingredientList = <p>Please start adding ingredients!</p>
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientList}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger