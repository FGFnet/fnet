import React from 'react'
import { styled, OutlinedInputProps, TextField, Typography, Button, Box, Container } from '@mui/material'
import { Colors } from '../../constant'
import { useNavigate } from "react-router-dom"

const TextFieldStyle = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: Colors.white,
    boxShadow: `${Colors.primary_lighter} 0 0 2px 2px`,
    borderRadius: 10,
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: Colors.white,
      boxShadow: `${Colors.primary_lighter} 0 0 2px 2px`,
    },
  },
})

export default function SignInScreen() {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h5" sx={{color: Colors.primary, marginBottom: 5}}>Login</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '60%', marginBottom: 5}}>
          <TextFieldStyle 
            variant="filled"
            label="이름"
            style={{marginBottom: 8}}
            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
          />
          <TextFieldStyle 
            variant="filled"
            label="학번"
            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
          />
        </Box>
        <Button onClick={()=>navigate('/')}>로그인</Button>
      </Container>
    </React.Fragment>
  )
}
