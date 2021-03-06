import React from 'react'
import { NavLink } from 'react-router-dom'

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo = () => (
  <div className={classes.Logo}>
    <NavLink to='/' exact={true}>
      <img src={burgerLogo} alt='MyBurger' />
    </NavLink>
  </div>
)

export default Logo