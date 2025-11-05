import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnApi, createNewCardApi, updateBoardDetailsAPI } from '~/apis'
// import { mockData } from '../../apis/mock-data.js'
import { genPlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6909c9dd5ca852601ed8d268'

    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach( c => {
        if (isEmpty(c.cards)) {
          c.cards = [genPlaceholderCard(c)]
          c.cardOrderIds = [genPlaceholderCard(c)._id]
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

  const moveColumn = async(dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    await updateBoardDetailsAPI(newBoard._id, { dndOrderedColumnsIds: newBoard.columnOrderIds } )
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
        moveColumn = { moveColumn }
      />
    </Container>
  )
}

export default Board