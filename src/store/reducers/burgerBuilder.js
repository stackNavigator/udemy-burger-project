import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, ingredientName) => {
  const { ingredients, totalPrice } = state
  return updateObject(state, {
    ingredients: updateObject(ingredients, { [ingredientName]: ingredients[ingredientName] + 1 }),
    totalPrice: +(totalPrice + INGREDIENT_PRICES[ingredientName]).toFixed(2),
    building: true
  })
}
const removeIngredient = (state, ingredientName) => {
  const { ingredients, totalPrice } = state
  return updateObject(state, {
    ingredients: updateObject(ingredients, { [ingredientName]: ingredients[ingredientName] - 1 }),
    totalPrice: +(totalPrice - INGREDIENT_PRICES[ingredientName]).toFixed(2),
    building: true
  })
}
const setIngredients = (state, ingredientsList) => {
  const { salad, bacon, cheese, meat } = ingredientsList
  return updateObject(state, {
    ingredients: { salad, bacon, cheese, meat },
    totalPrice: 4,
    error: false,
    building: false
  })
}
const fetchIngredientsFailed = state => updateObject(state, { error: true })

export default (state = initState, { type, ingredientName, ingredientsList }) => {
  const { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } = actionTypes
  switch (type) {
    case ADD_INGREDIENT:
      return addIngredient(state, ingredientName)
    case REMOVE_INGREDIENT:
      return removeIngredient(state, ingredientName)
    case SET_INGREDIENTS:
      return setIngredients(state, ingredientsList)
    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state)
    default:
      return state
  }
}