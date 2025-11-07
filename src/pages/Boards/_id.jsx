import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import {
  fetchBoardDetailsAPI,
  createNewColumnApi,
  createNewCardApi,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
// import { mockData } from '../../apis/mock-data.js'
import { genPlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { Box, Typography } from '@mui/material'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6909c9dd5ca852601ed8d268'

    fetchBoardDetailsAPI(boardId).then(board => {
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
      // console.log('board :', board)
      setBoard(board)
    })
  }, [])
  //func call api to create col and reload stateBoard
  const createNewCol = async (newColData) => {
    const createdCol = await createNewColumnApi({
      ...newColData,
      boardId: board._id
    })
    // console.log('createdCol :', createdCol)
    createdCol.cards = [genPlaceholderCard(createdCol)]
    createdCol.cardOrderIds = [genPlaceholderCard(createdCol)._id]
    // update state
    const newBoard = { ...board }
    newBoard.columns.push(createdCol)
    newBoard.columnOrderIds.push(createdCol._id)
    setBoard(newBoard)
  }
  //func call api to create card and reload stateBoard
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })
    // console.log('createdCard :', createdCard)
    // update state
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find( c => c._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds } )
  }

  const moveCardInColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //update state
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find( c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    //call api
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  const moveCardToDifferentColumn = ( currentCardId, prevColumnId, nextColumnId, dndOrderedColumns ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    //call api
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find( c => c._id === prevColumnId).cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find( c => c._id === nextColumnId).cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap : 2
      }}>
        <CircularProgress />
        <Typography>Loading Board....</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        backgroundColor : 'primary.main'
      }}>
      <AppBar />
      <BoardBar board = { board }/>
      <BoardContent
        board = { board }
        createNewCol = { createNewCol }
        createNewCard= { createNewCard }
        moveColumns = { moveColumns }
        moveCardInColumn = { moveCardInColumn }
        moveCardToDifferentColumn = { moveCardToDifferentColumn }
      />
    </Container>
  )
}

export default Board