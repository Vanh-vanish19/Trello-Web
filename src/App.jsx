import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
//route chỉ cho phép truy cập sau khi login
const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to ='/login' replace={true}/>
  return <Outlet/>
}
function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={
        /* Replace = true thay thế cho router '/' để đúng luồng */
        <Navigate to='/boards/6909c9dd5ca852601ed8d268' replace ={true}/> }>
      </Route>
      <Route element={<ProtectedRoutes user={ currentUser }/>}>
        <Route path='/boards/:boardId' element={<Board/>}/>
        <Route path='/settings/account' element={<Settings/>}/>
        <Route path='/settings/security' element={<Settings/>}/>
      </Route>
      <Route path='/login' element={<Auth/>}></Route>

      <Route path='/register' element={<Auth/>}></Route>
      <Route path='/account/verification' element={<AccountVerification/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  )
}

export default App