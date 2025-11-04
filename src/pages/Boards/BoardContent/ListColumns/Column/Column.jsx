import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import React from 'react'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

function Column({ column, createNewCard }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data : { ...column }
  })

  const dndKitColumnStyle = {
    touchAction : 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id' )

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }
  const addNewCard = async () => {
    if (!newCardTitle) return

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)

    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          p:'0 2px',
          m:'0 2px',
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        {/*HEADER*/}
        <Box
          sx={{
            display : 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: (theme) => theme.trello.colHeaderHeight,
            p:2
          }}>
          <Typography
            variant=''
            sx={{
              fontWeight:'Bold',
              cursor:'pointer'
            }}
          >{ column?.title }</Typography>
          <Box>
            <Tooltip title="More Options">
              <ExpandMoreIcon
                sx={{ color: 'primary.main' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} />
            </Tooltip>
            <Menu
              id="basic-menu-workspace"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant="body2" color="text.secondary">
                ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant="body2" color="text.secondary">
                ⌘C
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant="body2" color="text.secondary">
                ⌘V
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PostAddIcon></PostAddIcon>
                </ListItemIcon>
                <ListItemText>Add this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon></DeleteIcon>
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/*CONTENT*/}
        <ListCards cards={orderedCards}/>
        {/*FOOTER*/}
        <Box
          sx={{
            minHeight: (theme) => theme.trello.colFooterHeight,
            p:2
          }}>
          {!openNewCardForm
            ?<Box sx={{
              display : 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <Button
                startIcon={<AddCardIcon/>}
                onClick={toggleOpenNewCardForm}
              >
                Add New Card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon
                  sx={{
                    cursor:'grab',
                    color: 'text.primary'
                  }}
                />
              </Tooltip>
            </Box>
            :<Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                size="small"
                placeholder="Enter a title..."
                variant="outlined"
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                autoFocus
                data-no-dnd="true"
                sx={{
                  minWidth: 'auto',
                  flex: 1,
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
              <Button
                onClick={addNewCard}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  color: 'white',
                  boxShadow: 'none',
                  minWidth: 'auto',
                  px: 2,
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Add
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={toggleOpenNewCardForm}
              />
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column