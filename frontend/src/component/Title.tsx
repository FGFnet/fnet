import { Colors } from '../constant'
import { Typography } from '@mui/material'

type titleProp = {
  title: string
  background: string
  variant?: Variant
  style?: Object
}

type Variant =
  "body1"
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "overline"
  | "subtitle1"
  | "subtitle2"
  | undefined;



export default function Title(props: titleProp) {
  const title = props.title
  const backgroundColor = props.background
  const variant: Variant = props.variant ?? "h4"

  const basicStyle = {
    fontWeight: 'bold',
    backgroundColor: { backgroundColor },
    textShadow: `2px 2px ${Colors.dark}`,
    display: 'inline-block',
    paddingRight: 2,
    ...props?.style
  }

  return (
    <Typography
      component="h4"
      variant={variant}
      letterSpacing={3}
      noWrap
      sx={basicStyle}
    >
      {title}
    </Typography>
  )
}
