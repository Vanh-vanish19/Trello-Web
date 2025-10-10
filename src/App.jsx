import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import {
  useColorScheme,
} from '@mui/material/styles'
import Container from '@mui/material/Container'

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    const value = event.target.value;
    setMode(value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="">Mode</InputLabel>
        <Select
          labelId=""
          id=""
          value={mode}
          label=""
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1}}>
              <LightModeIcon fontSize='small'/>
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1}}>
              <DarkModeIcon fontSize='small'/> 
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1}}>
              <Brightness5Icon fontSize='small'/>
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor : 'primary.main'}}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme)=> theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect/>
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme)=> theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
          BoardBar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight}))`,
        display: 'flex',
        alignItems: 'center'
      }}>
          Content
      </Box>
    </Container>
  )
}

export default App
