import React, { useState } from 'react'
import { connect } from 'react-redux'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = ({ children, isAuthenticated }) => {
  const [showSideDrawer, setSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawer(!showSideDrawer)
  }

  return (
    <React.Fragment>
      <Toolbar
        isAuthenticated={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuthenticated={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {children}
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = ({ auth: { token } }) => ({ isAuthenticated: token !== null })

export default connect(mapStateToProps)(Layout)