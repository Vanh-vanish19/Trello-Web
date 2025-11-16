import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'

const initialState = {
  currentUser: null
}

// hành động call api dể update data vào redux, dùng middleware createAsyncThunk với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logout success')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

// init Slice in redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducers xử lý đồng bộ
  reducers: {
  },
  // extraReducres xl bdb
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload : reponse.data
      const user = action.payload
      //update currentUser
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer