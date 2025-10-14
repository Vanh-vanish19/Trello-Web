import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import ToolTip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { capitalizeFirstLetter } from '../../../utils/formatters'

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
      borderBottom:'1px solid #ffffffff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={Menu_Styles}
          icon={<SpaceDashboardIcon />}
          label= { capitalizeFirstLetter(board?.title) }
          clickable
        />
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
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: 'pointer',
              '&:first-of-type': { bgcolor:'#a4b0be' }
            }
          }}
        >
          <ToolTip title="Vanish">
            <Avatar alt="Vanish" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/489293505_1782538675643056_7982346829686967285_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=UR9NLe4QopYQ7kNvwGUP12V&_nc_oc=AdlW-I4EDoQL3Kyjoe1ueK-IcKmJljVQhJOUxED3OXxlH-Ixhx1OTESHfpdqVCeQssL0Gw5315I55WWZh7K6GSAL&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=_jaWhORRJgyyq83WDojxhQ&oh=00_Afdsn6CapiHJFDm3Wq2T9ZggbkBy9kaaGriaudoMtQFgpQ&oe=68F163FB" />
          </ToolTip>
          <ToolTip title="Goku">
            <Avatar alt="Goku" src="https://tse3.mm.bing.net/th/id/OIP.GRg94jpgShjt_WoH4OdaaQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" />
          </ToolTip>
          <ToolTip title="Gojo">
            <Avatar alt="Gojo" src="https://tse1.mm.bing.net/th/id/OIP.QQT-0tYqyjJrBA1paJ1GwQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" />
          </ToolTip>
          <ToolTip title="Vanish">
            <Avatar alt="Vanish" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/489293505_1782538675643056_7982346829686967285_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=UR9NLe4QopYQ7kNvwGUP12V&_nc_oc=AdlW-I4EDoQL3Kyjoe1ueK-IcKmJljVQhJOUxED3OXxlH-Ixhx1OTESHfpdqVCeQssL0Gw5315I55WWZh7K6GSAL&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=_jaWhORRJgyyq83WDojxhQ&oh=00_Afdsn6CapiHJFDm3Wq2T9ZggbkBy9kaaGriaudoMtQFgpQ&oe=68F163FB" />
          </ToolTip>
          <ToolTip title="Vanish">
            <Avatar alt="Vanish" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/489293505_1782538675643056_7982346829686967285_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=UR9NLe4QopYQ7kNvwGUP12V&_nc_oc=AdlW-I4EDoQL3Kyjoe1ueK-IcKmJljVQhJOUxED3OXxlH-Ixhx1OTESHfpdqVCeQssL0Gw5315I55WWZh7K6GSAL&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=_jaWhORRJgyyq83WDojxhQ&oh=00_Afdsn6CapiHJFDm3Wq2T9ZggbkBy9kaaGriaudoMtQFgpQ&oe=68F163FB" />
          </ToolTip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar