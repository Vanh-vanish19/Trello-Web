import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {
  return (
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
      { columns?.map((column, index) => {
        return ( <Column key={ index } column={column}/> )
      })}
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
  )
}

export default ListColumns