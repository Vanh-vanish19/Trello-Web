import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import ToolTip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { capitalizeFirstLetter } from '~/utils/formatters'
import BoardUserGroup from './BoardUserGroup'

const Menu_Styles = {
  color:'white',
  bgcolor:'transparent',
  border:'none',
  paddingX: '5px',
  borderRadius: '10px',
  '.MuiSvgIcon-root':{
    color: 'white'
  },
  '&:hover':{
    backgroundColor: 'primary.10'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      paddingX: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderTop:'1px solid #ffffffff',
      borderBottom:'1px solid #ffffffff',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0' )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolTip title={board?.description}>
          <Chip
            sx={Menu_Styles}
            icon={<SpaceDashboardIcon />}
            label= { capitalizeFirstLetter(board?.title) }
            clickable
          />
        </ToolTip>
        <Chip
          sx={Menu_Styles}
          icon={<VpnLockIcon />}
          label= {capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={Menu_Styles}
          icon={<AddToDriveIcon />}
          label="Add To Drive"
          clickable
        />
        <Chip
          sx={Menu_Styles}
          icon={<BoltIcon/>}
          label="Automation"
          clickable
        />
        <Chip
          sx={Menu_Styles}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color:'white',
            bgcolor:'transparent',
            borderColor: 'white',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root':{
              color: 'white'
            },
            '&:hover':{
              borderColor: 'white'
            }
          }}
          variant='outlined'
          startIcon={<AddIcon/>
          }>Invite</Button>
        <BoardUserGroup/>
      </Box>
    </Box>
  )
}

export default BoardBar