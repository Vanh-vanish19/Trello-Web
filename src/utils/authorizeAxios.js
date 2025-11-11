import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
let authorizeAxiosInstance = axios.create()

// thời gian chờ tối đa cho 1 request
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// cho phep axios auto gui cookie trong moi req den BE
authorizeAxiosInstance.defaults.withCredentials = true


authorizeAxiosInstance.interceptors.request.use( (config) => {
  // spam click blocked
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use( (response) => {
  interceptorLoadingElements(false)
  return response
}, (error) => {
  interceptorLoadingElements(false)
  // console.log(error)
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizeAxiosInstance