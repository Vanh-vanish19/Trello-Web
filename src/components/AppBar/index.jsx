import { useState } from 'react'
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
import CreateIcon from '@mui/icons-material/Create'
import CloseIcon from '@mui/icons-material/Close'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  fontSize: '0.875rem',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
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

const CloseIconWrapper = styled('div')(() => ({
  position: 'absolute',
  right: 8,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}))


const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'white',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  fontSize: '0.875rem',
  width: '100%',
  paddingRight: theme.spacing(4),
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '18ch'
      }
    }
  }
}))

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => { theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0' }
    }}>
      <Box sx={{ color : 'white', display: 'flex', alignItems: 'center', gap : 2 }}>
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
          <Button startIcon={<CreateIcon/>} sx={{ color: 'white', border: 'none', '& .hover': { border :'none' } }}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Search sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
          <CloseIconWrapper
            sx={{
              color : searchValue ? 'white' : 'transparent'
            }}
            onClick={() => setSearchValue('')}>
            <CloseIcon />
          </CloseIconWrapper>
        </Search>
        <ModeSelect/>
        <ToolTip title="Notifications" sx={{ cursor : 'pointer' }}>
          <Badge color="warning" variant='dot'>
            <NotificationsIcon sx={{ color: 'white' }}/>
          </Badge>
        </ToolTip>
        <ToolTip title="Help" sx={{ cursor : 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </ToolTip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar