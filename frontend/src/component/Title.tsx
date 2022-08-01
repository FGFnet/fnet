import { Colors } from '../constant'

type titleProp = {
  title: string;
}

export default function Title(props: titleProp) {
  const title = props.title
  const titleStyle = {
    background: Colors.accent,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }

  return (
    <span style={titleStyle}>
      {title}
    </span>
  )
}
