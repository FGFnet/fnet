import Button from '@mui/material/Button'
import { Colors } from '../../constant'

type buttonProp = {
  text: string
}

function RoundedButton(props: buttonProp) {
  const style = {
    boxShadow: '0px 4px 12px rgba(21,76,0,0.25)',
    padding: 10,
    color: Colors.darker,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20,
    marginBottom: 10,
  }

  return <Button style={style}>{props.text}</Button>
}

export {RoundedButton};