import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {isAuthenticated
    ? <NavigationItem link="/orders">Orders</NavigationItem>
    : null}
    {isAuthenticated
      ? <NavigationItem link="/logout">Log out</NavigationItem>
      : <NavigationItem link="/auth">Authenticate</NavigationItem>}
  </ul>
)

export default NavigationItems