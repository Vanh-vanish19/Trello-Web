import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import { useEffect } from 'react'
import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI } from '~/apis'
// import { mockData } from '../../apis/mock-data.js'
import { cloneDeep } from 'lodash'
import { fetchBoardDetailsAPI, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner.jsx'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard.jsx'

function Board() {
  // const [board, setBoard] = useState(null)
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()
  useEffect(() => {
    // const boardId = '6909c9dd5ca852601ed8d268'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds } )
  }

  const moveCardInColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //update state
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find( c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    //call api
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  const moveCardToDifferentColumn = ( currentCardId, prevColumnId, nextColumnId, dndOrderedColumns ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    //call api
    let prevCardOrderIds = dndOrderedColumns.find( c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds?.[0]?.includes('placeholder-card')) prevCardOrderIds = []
    let nextCardOrderIds = dndOrderedColumns.find( c => c._id === nextColumnId)?.cardOrderIds
    if (nextCardOrderIds?.[0]?.includes('placeholder-card')) nextCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds
    })
  }
  if (!board) {
    return (
      <PageLoadingSpinner captions= 'LoadingBoard...'></PageLoadingSpinner>
    )
  }
  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        backgroundColor : 'primary.main'
      }}>
      {/*Modal activecard, check đóng mở dựa theo điều kiện nó có tồn tại data activeCard lưu trong redux hay không thì mới render, tại 1 thời điểm thì chỉ tồn tại 1 modal card đang active  */}
      <ActiveCard/>

      <AppBar />
      <BoardBar board = { board }/>
      <BoardContent
        board = { board }

        moveColumns = { moveColumns }
        moveCardInColumn = { moveCardInColumn }
        moveCardToDifferentColumn = { moveCardToDifferentColumn }
      />
    </Container>
  )
}

export default Board