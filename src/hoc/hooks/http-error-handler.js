import { useState, useEffect } from 'react'

export default httpClient => {
  const [error, setError] = useState(null)

  const { interceptors: { request, response } } = httpClient
  const reqInterceptor = request.use(req => {
    setError(null)
    return req
  })
  const resInterceptor = response.use(res => res, error => setError({ error }))

  useEffect(() => {
    return () => {
      request.eject(reqInterceptor)
      response.eject(resInterceptor)
    }
  }, [reqInterceptor, resInterceptor])

  const errorConfirmedHandler = () => setError(null)

  return [error, errorConfirmedHandler]
}