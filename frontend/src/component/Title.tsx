import { Colors } from '../constant'
import { Typography } from '@mui/material'

type titleProp = {
  title: string
  background: string
}

export default function Title(props: titleProp) {
  const title = props.title
  const backgroundColor = props.background

  return (
    <Typography
      component="h3"
      variant="h3"
      letterSpacing={3}
      noWrap
      sx={{
        fontWeight: 'bold',
        backgroundColor: { backgroundColor },
        textShadow: `2px 2px ${Colors.dark}`,
        display: 'inline',
      }}
    >
      {title}
    </Typography>
  )
}
