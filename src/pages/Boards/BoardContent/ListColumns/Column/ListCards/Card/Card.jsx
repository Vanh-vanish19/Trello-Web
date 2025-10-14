import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import MessageIcon from '@mui/icons-material/Message'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function TrelloCard({ temporaryHideMedia = false }) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
        overflow: 'unset'
      }}
    >
      {!temporaryHideMedia && (
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image="https://tse3.mm.bing.net/th/id/OIP.GRg94jpgShjt_WoH4OdaaQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Goku"
        />
      )}

      <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
        <Typography>
          Goku
        </Typography>
      </CardContent>

      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<MessageIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
