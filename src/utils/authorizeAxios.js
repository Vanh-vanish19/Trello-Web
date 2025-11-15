import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { refreshTokenAPI} from '~/apis'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { logoutUserAPI } from '~/redux/user/userSlice'

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

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

let refreshTokenPromise = null

authorizeAxiosInstance.interceptors.response.use( (response) => {
  interceptorLoadingElements(false)

  return response
}, (error) => {

  // catch 401 => call api to logout
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }
  // 410 => call api refreshToken
  const originalRequests = error.config
  console.log('originnalRequests', originalRequests)

  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then((data) => {
          return data?.accessToken
        })
        .catch((_error) => {
          // nhận bất cứ lỗi gì thì logout luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }
    return refreshTokenPromise.then(() => {
      return authorizeAxiosInstance(originalRequests)
    })
  }

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