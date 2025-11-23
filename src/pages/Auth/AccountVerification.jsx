import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner.jsx'
import { verifyUserAPI } from '../../apis'
function AccountVerification() {
  // lấy email và token từ url
  let [SearchParams] = useSearchParams()
  // const email = SearchParams.get('email')
  // const token = SearchParams.get('token')
  const { email, token } = Object.fromEntries([...SearchParams])
  // console.log(email, token)

  // tạo state để xác nhận tài khoản
  const [verified, setVerified] = useState()

  useEffect(() => {
    if (email && token ) {
      // call api to verify
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to= '/404'/>
  }

  if (verified) {
    return <PageLoadingSpinner captions= 'Verifying your account...'></PageLoadingSpinner>
  }

  return <Navigate to={`/login?verifiedEmail=${email}`}/>
}

export default AccountVerification