import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import MessageIcon from '@mui/icons-material/Message'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TrelloCard({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data : { ...card }
  })

  const dndKitCardStyle = {
    touchAction : 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '1px solid grey' : undefined
  }

  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <Card ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
        overflow: 'unset',
        display: card?.FE_PLACEHOLDER_CARD ? 'none' : 'block'
      }}
    >{card?.cover &&
      <CardMedia
        sx={{ height: 140 }}
        image={ card?.cover }
        title = "Goku"
      />}
      <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
        <Typography>
          {card?.title}
        </Typography>
      </CardContent>
      {shouldShowCardAction() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length &&
        <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>}
        {!!card?.comments?.length &&
        <Button size="small" startIcon={<MessageIcon />}>{card?.comments?.length}</Button>}
        {!!card?.attachments?.length &&
        <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>}
      </CardActions>}
    </Card>
  )
}

export default TrelloCard
