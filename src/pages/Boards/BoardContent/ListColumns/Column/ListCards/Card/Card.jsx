import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            '&:last-child': {
              p: 1.5
            }
          }}
        >
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="data:image/png;base64,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"
      />
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5
          }
        }}
      >
        <Typography>MinhHieu MERN Stack Pro</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
