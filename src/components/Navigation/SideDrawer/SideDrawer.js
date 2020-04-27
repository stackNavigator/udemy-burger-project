import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = ({ closed, open, isAuthenticated }) => {
  const { SideDrawer, Close, Open } = classes
  const attachedClasses = open ? [SideDrawer, Open] : [SideDrawer, Close]
  return (
    <React.Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  )
}

export default SideDrawer