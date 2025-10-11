import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloIcon } from '~/assets/trelloIcon.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ToolTip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  fontSize: '0.875rem',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1)
  },
  marginLeft: 10,
  width: '40%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.875rem',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '8ch',
      '&:focus': {
        width: '15ch'
      }
    }
  }
}))

function AppBar() {
  return (
    <Box px={2} sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ color : 'primary.main', display: 'flex', alignItems: 'center', gap : 2 }}>
        <AppsIcon />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={trelloIcon} inheritViewBox />
          <Typography variant='span' sx={{ fontSize: 20, fontWeight: 'bold', gap : 1 }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Templates />
          <Button variant='outlined'>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <ModeSelect/>
        <ToolTip alt="Notifications" title="Notifications" sx={{ cursor : 'pointer' }}>
          <Badge color="secondary" variant='dot'>
            <NotificationsIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </ToolTip>
        <ToolTip alt="Help" title="Help" sx={{ cursor : 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
        </ToolTip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar