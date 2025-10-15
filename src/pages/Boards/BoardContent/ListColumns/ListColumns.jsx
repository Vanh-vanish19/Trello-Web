import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    <SortableContext
      items = {columns?.map(c => c._id)}
      strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          marginTop: 2,
          bgcolor : 'inherit',
          width : '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
        { columns?.map((column) =>
          ( <Column key={ column._id } column={column}/> )
        )}
        <Box
          sx={{
            mx:2,
            borderRadius: '8px',
            height: 'fit-content',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'
          }}
        >
          <Button
            sx={{
              minWidth: '180px',
              maxWidth: '180px'
            }}
            startIcon={<NoteAddIcon/>}>Add New Column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns