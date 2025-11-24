import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { genPlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
const initialState = {
  currentActiveBoard: null
}

// hành động call api dể update data vào redux, dùng middleware createAsyncThunk với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)


// init Slice in redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducers xử lý đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload : chuẩn đặt tên nhận dữ liệu reducer
      const board = action.payload
      // xử lý data nếu cần
      // ...
      //update currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      //update nested data
      const inActiveCard = action.payload
      // tim tu board -> col -> card
      const column = state.currentActiveBoard.columns.find(col => col._id === inActiveCard.columnId)
      if (column) {
        const card = column.cards.find(card => card._id === inActiveCard._id)
        if (card) {
          // card.title = inActiveCard.title
          Object.keys(inActiveCard).forEach(key => {
            card[key] = inActiveCard[key]
          })
        }
      }
    }
  },
  // extraReducres xl bdb
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload : reponse.data
      let board = action.payload

      // thành viên trong board gộp lại của 2 mảng onwer vs member
      board.FE_allUsers = board.owners.concat(board.members)

      // xử lý data nếu cần
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach( column => {
        if (isEmpty(column.cards)) {
          column.cards = [genPlaceholderCard(column)]
          column.cardOrderIds = [genPlaceholderCard(column)._id]
        }
        else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      //update currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action là nơi dành cho các components bên dưới gọi dispatch để update data vào redux store qua reducers
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

//selector là nơi cho các components bên dưới gọi hoo useSelector() để get data trong redux store ra để sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer