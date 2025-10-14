import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2a2668ff' : '#0d67c0ff',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex'
      //alignItems: 'center'
    }}>
      <ListColumns columns={orderedColumns}/>
    </Box>
  )
}

export default BoardContent
