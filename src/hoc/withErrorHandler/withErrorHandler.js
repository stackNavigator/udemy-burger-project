import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios)
    const errorMessage = error ? error.error.message : null
    return (
      <React.Fragment>
        <Modal
          show={error}
          modalClosed={clearError}>
          {errorMessage}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}

export default withErrorHandler