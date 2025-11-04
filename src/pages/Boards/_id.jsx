import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnApi, createNewCardApi } from '~/apis'
// import { mockData } from '../../apis/mock-data.js'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6909c9dd5ca852601ed8d268'

    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  //func call api to create col and reload stateBoard
  const createNewCol = async (newColData) => {
    const createdCol = await createNewColumnApi({
      ...newColData,
      boardId: board._id
    })
    console.log('createdCol :', createdCol)

    // update state

  }
  //func call api to create card and reload stateBoard
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard :', createdCard)

    // update state

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
      />
    </Container>
  )
}

export default Board