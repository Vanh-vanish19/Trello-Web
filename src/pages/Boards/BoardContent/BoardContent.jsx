import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2a2668ff' : '#0d67c0ff',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex'
      //alignItems: 'center'
    }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardContent
