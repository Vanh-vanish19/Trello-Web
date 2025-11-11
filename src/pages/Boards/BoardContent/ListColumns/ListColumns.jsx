import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { genPlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { createNewColumnApi } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


function ListColumns({ columns }) {
  const [openNewColForm, setOpenNewColForm] = useState(false)
  const [newColTitle, setNewColTitle] = useState('')
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const toggleOpenNewColForm = () => {
    setOpenNewColForm(!openNewColForm)
  }
  const addNewCol = async () => {
    if (!newColTitle) {
      toast.error('Column title is required')
      return
    }

    //create data to call Api
    const newColData = {
      title: newColTitle
    }

    //func call api to create col and reload stateBoard
    const createdCol = await createNewColumnApi({
      ...newColData,
      boardId: board._id
    })
    // console.log('createdCol :', createdCol)
    createdCol.cards = [genPlaceholderCard(createdCol)]
    createdCol.cardOrderIds = [genPlaceholderCard(createdCol)._id]
    // update state

    // dùng spread operator (shallow copy) sau đó dùng push của js, liên quan đến rule của redux nên ko dùng được => deepclone
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdCol)
    newBoard.columnOrderIds.push(createdCol._id)
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenNewColForm()
    setNewColTitle('')
  }

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
        { !openNewColForm
          ?<Box onClick={toggleOpenNewColForm}
            sx={{
              minWidth: '220px',
              maxWidth: '220px',
              mx:2,
              borderRadius: '8px',
              height: 'fit-content',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'
            }}>
            <Button
              startIcon={<NoteAddIcon/>}>Add New Column</Button>
          </Box>
          :<Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              placeholder='Enter column title...'
              type="text"
              size="small"
              value={newColTitle}
              onChange={(e) => setNewColTitle(e.target.value)}
              variant="outlined"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#444452' : '#ffffff',
                  fontSize: '0.875rem',
                  '& fieldset': {
                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#666666' : 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#999999' : 'primary.dark'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                },
                '& input': {
                  color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : 'inherit'
                },
                '& input::placeholder': {
                  color: (theme) => theme.palette.mode === 'dark' ? '#999999' : 'inherit'
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                className='interceptor-loading'
                onClick={addNewCol}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  color: 'white',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                Add Column
              </Button >
              <CloseIcon
                fontSize="small"
                sx={{
                  color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : 'text.primary',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.mode === 'dark' ? 'primary.light' : 'warning.dark'
                  }
                }}
                onClick={toggleOpenNewColForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns