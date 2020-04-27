import * as actionTypes from './actionTypes'

const { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED,
  INIT_INGREDIENTS } = actionTypes
export const addIngredient = ingredientName => ({ type: ADD_INGREDIENT, ingredientName })
export const removeIngredient = ingredientName => ({ type: REMOVE_INGREDIENT, ingredientName })
export const setIngredients = ingredientsList => ({ type: SET_INGREDIENTS, ingredientsList })
export const fetchIngredientsFailed = () => ({ type: FETCH_INGREDIENTS_FAILED })
export const initIngredients = () => ({ type: INIT_INGREDIENTS })