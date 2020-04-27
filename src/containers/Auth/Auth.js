import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkValidity } from '../../shared/validation'
import * as actions from '../../store/actions'

const Auth = ({ building, authRedirectPath, loading, error, isAuthenticated, onAuth,
  onSetAuthRedirectPath }) => {
  const [isSignup, setIsSignup] = useState(false)
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    }
  })

  useEffect(() => {
    if (!building && authRedirectPath)
      onSetAuthRedirectPath('/')
  }, [onSetAuthRedirectPath])

  const inputChangedHandler = ({ target: { value } }, inputKey) => {
    const { validation } = controls[inputKey]
    const newControls = {
      ...controls,
      [inputKey]: {
        ...controls[inputKey],
        value,
        valid: checkValidity(value, validation),
        touched: true
      }
    }
    setControls(newControls)
  }

  const submitHandler = e => {
    const { email, password } = controls
    e.preventDefault()
    onAuth(email.value, password.value, isSignup)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  const formElements = loading
    ? <Spinner />
    : Object.keys(controls).map(key => ({
      id: key,
      config: controls[key]
    })).map(({ id, config: { elementType, elementConfig, value, valid, validation, touched } }) => (
      <Input
        key={id}
        elementType={elementType}
        elementConfig={elementConfig}
        value={value}
        invalid={!valid}
        shouldValidate={validation}
        touched={touched}
        changed={e => inputChangedHandler(e, id)} />)
    )
  const buttonName = isSignup ? 'SIGNIN' : 'SIGNUP'
  const errorMessage = error && <p>{error.message}</p>
  const authRedirect = isAuthenticated && <Redirect to={authRedirectPath} />
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {formElements}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        btnType="Danger"
        clicked={switchAuthModeHandler}>
        SWITCH TO {buttonName}
      </Button>
    </div>
  )
}

const mapStateToProps = ({ auth: { loading, error, token, authRedirectPath },
  burgerBuilder: { building } }) => ({
    loading,
    error,
    isAuthenticated: token !== null,
    building,
    authRedirectPath
  })
const mapDispatchToProps = dispatch => {
  const { auth, setAuthRedirectPath } = actions
  return {
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)