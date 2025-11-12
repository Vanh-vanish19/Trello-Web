import { Box, CircularProgress, Typography } from '@mui/material'
function PageLoadingSpinner({ captions }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap : 2
    }}>
      <CircularProgress />
      <Typography>{captions}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner