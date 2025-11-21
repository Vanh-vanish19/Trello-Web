import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentActiveCard: null
}

// init Slice in redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // reducers xử lý đồng bộ
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      // action.payload : chuẩn đặt tên nhận dữ liệu reducer
      const card = action.payload
      //update currentActiveCard
      state.currentActiveCard = card
    }
  }
})

// Action là nơi dành cho các components bên dưới gọi dispatch để update data vào redux store qua reducers
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions

//selector là nơi cho các components bên dưới gọi hoo useSelector() để get data trong redux store ra để sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}
// export default activeCardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer