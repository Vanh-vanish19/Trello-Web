import Box from '@mui/material/Box'
import TrelloCard from './Card/Card'

function ListCards() {
  return (
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
        ${theme.trello.colHeaderHeight} -
        ${theme.trello.colFooterHeight})`
      }}>
      <TrelloCard/>
      <TrelloCard temporaryHideMedia/>
      <TrelloCard temporaryHideMedia/>
      <TrelloCard temporaryHideMedia/>
      <TrelloCard temporaryHideMedia/>
    </Box>
  )
}

export default ListCards