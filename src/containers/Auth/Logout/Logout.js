import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions'

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
  const { logout } = actions
  return {
    onLogout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)