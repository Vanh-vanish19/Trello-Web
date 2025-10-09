import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import {
  useColorScheme,
} from '@mui/material/styles'
import { light } from '@mui/material/styles/createPalette'

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
    <>
      <ModeSelect/>
      <hr />
      <Typography varian="body2" color = "text.secondary">Vanishh</Typography>
      <Button variant="text" color = "success">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
