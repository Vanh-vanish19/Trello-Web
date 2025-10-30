import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar/BoardBar.jsx'
import BoardContent from './BoardContent/BoardContent.jsx'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const { board, setBoard } = useState(null)
  useEffect( () => {
    const boardId = '6902f95c68a195ae666af12d'

    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  })
  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        backgroundColor : 'primary.main'
      }}>
      <AppBar />
      <BoardBar board ={ board }/>
      <BoardContent board ={ board }/>
    </Container>
  )
}

export default Board