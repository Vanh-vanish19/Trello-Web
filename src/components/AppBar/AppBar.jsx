import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect.jsx'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloIcon } from '~/assets/trelloIcon.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import ToolTip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import CreateIcon from '@mui/icons-material/Create'
import { Link } from 'react-router-dom'
import Notifications from './Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0' )
    }}>
      <Box sx={{ color : 'white', display: 'flex', alignItems: 'center', gap : 2 }}>
        <Link to = "/boards" style ={{ display: 'flex', alignItems: 'center', gap: '16px', color : 'inherit' }}>
          <ToolTip title="Boards list">
            <AppsIcon />
          </ToolTip>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SvgIcon component={trelloIcon} inheritViewBox />
            <Typography variant='span' sx={{ fontSize: 20, fontWeight: 'bold', gap : 1 }}>Trello</Typography>
          </Box>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Templates />
          <Button startIcon={<CreateIcon/>} sx={{ color: 'white', border: 'none', '& .hover': { border :'none' } }}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AutoCompleteSearchBoard/>
        <ModeSelect/>
        <Notifications/>
        <ToolTip title="Help" sx={{ cursor : 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </ToolTip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar