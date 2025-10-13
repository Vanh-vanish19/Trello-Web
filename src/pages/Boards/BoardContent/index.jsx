import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import MessageIcon from '@mui/icons-material/Message'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLLUM_HEADER_HEIGHT = '50px'
const COLLUM_FOOTER_HEIGHT = '56px'

function BoardContent() {const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2a2668ff' : '#0d67c0ff',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
      //alignItems: 'center'
    }}>
      {/*COLUMN1*/}
      <Box sx={{
        p:'0 2px',
        m:'0 2px',
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
        ml: 2,
        marginTop: 2,
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
            height: COLLUM_HEADER_HEIGHT,
            p:2
          }}
        >
          <Typography
            variant=''
            sx={{
              fontWeight:'Bold',
              cursor:'pointer'
            }}
          >Column Title</Typography>
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
        <Box
          sx={{
            p : 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap : 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${
              theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLLUM_HEADER_HEIGHT} -
              ${COLLUM_FOOTER_HEIGHT})`
          }}>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://tse3.mm.bing.net/th/id/OIP.GRg94jpgShjt_WoH4OdaaQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
              title="green iguana"
            />
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
            <CardActions sx={{ p :'0 4px 8px 4px' }}>
              <Button size="small" startIcon={<GroupIcon/>}>20</Button>
              <Button size="small" startIcon={<MessageIcon/>}>15</Button>
              <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
            </CardActions>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/*FOOTER*/}
        <Box
          sx={{
            display : 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLLUM_FOOTER_HEIGHT,
            p:2
          }}>
          <Button startIcon={<AddCardIcon/>}>Add New Card</Button>
          <Tooltip title="Drag to move" sx={{ cursor:'grab' }}>
            <DragHandleIcon/>
          </Tooltip>
        </Box>
      </Box>
      {/*COLUMN2*/}
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
        ml: 2,
        marginTop: 2,
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
            height: COLLUM_HEADER_HEIGHT,
            p:2
          }}
        >
          <Typography
            variant=''
            sx={{
              fontWeight:'Bold',
              cursor:'pointer'
            }}
          >Column Title</Typography>
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
        <Box
          sx={{
            p : 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap : 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${
              theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLLUM_HEADER_HEIGHT} -
              ${COLLUM_FOOTER_HEIGHT})`
          }}>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://tse3.mm.bing.net/th/id/OIP.GRg94jpgShjt_WoH4OdaaQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
              title="green iguana"
            />
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
            <CardActions sx={{ p :'0 4px 8px 4px' }}>
              <Button size="small" startIcon={<GroupIcon/>}>20</Button>
              <Button size="small" startIcon={<MessageIcon/>}>15</Button>
              <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
            </CardActions>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
            overflow: 'unset'
          }}>
            <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
              <Typography>
                Goku
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/*FOOTER*/}
        <Box
          sx={{
            display : 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLLUM_FOOTER_HEIGHT,
            p:2
          }}>
          <Button startIcon={<AddCardIcon/>}>Add New Card</Button>
          <Tooltip title="Drag to move" sx={{ cursor:'grab' }}>
            <DragHandleIcon/>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
