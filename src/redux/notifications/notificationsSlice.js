import { createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

// init Slice in redux store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // reducers xử lý đồng bộ
  reducers: {
    clearCurrentNotifications : (state) => {
      state.currentNotifications = null
    },

    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      const incomingNotifications = action.payload
      state.currentNotifications.unshift(incomingNotifications)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingNotifications = action.payload
      state.currentNotifications = Array.isArray(incomingNotifications) ? incomingNotifications.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingNotification = action.payload

      const getInvitation = state.currentNotifications.find(i => i._id === incomingNotification._id)
      getInvitation.boardInvitation = incomingNotification.boardInvitation
    })
  }
})

// Action là nơi dành cho các components bên dưới gọi dispatch để update data vào redux store qua reducers
export const { updateCurrentNotifications, clearCurrentNotifications, addNotification } = notificationsSlice.actions

//selector là nơi cho các components bên dưới gọi hoo useSelector() để get data trong redux store ra để sử dụng
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}
// export default notificationsSlice.reducer
export const notificationsReducer = notificationsSlice.reducer