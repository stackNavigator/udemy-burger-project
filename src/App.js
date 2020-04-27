import React, { useEffect, Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))

const App = ({ isAuthenticated, onTryAutoSignup }) => {
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  const routes = isAuthenticated
    ? <Switch>
      <Route path="/checkout" render={props => <Checkout {...props} />} />
      <Route path="/orders" render={props => <Orders {...props} />} />
      <Route path="/logout" component={props => <Logout {...props} />} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    : <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = ({ auth: { token } }) => ({ isAuthenticated: token !== null })
const mapDispatchToProps = dispatch => {
  const { authCheckState } = actions
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))