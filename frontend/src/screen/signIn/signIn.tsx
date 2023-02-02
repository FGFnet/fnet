import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useMutation } from 'react-query'

import { styled, OutlinedInputProps, TextField, Typography, Button, Box, Container, Alert, Dialog } from '@mui/material'
import { Colors } from '../../constant'
import { userState, accesstoken } from '../../store'
import { UserService } from '../../service'


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
  const setUser = useSetRecoilState(userState)
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [error, setError] = useState(false)
  const setToken = useSetRecoilState(accesstoken)

  const login = useMutation(UserService.login,{
    onSuccess: (data) => {
      setUser(data.data.user)
      setToken(data.data.token)
    }
  });

  const submit = async () => {
    if (name === '' || studentId === '') {
      setError(true)
      return
    }
    try {
      login.mutate({name: name, password: studentId});
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <React.Fragment>
      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: Colors.primary, marginBottom: 5 }}>
          Login
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', marginBottom: 5 }}>
          <TextFieldStyle
            variant="filled"
            label="이름"
            style={{ marginBottom: 8 }}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
          />
          <TextFieldStyle
            variant="filled"
            label="학번"
            value={studentId}
            onChange={(event) => {
              setStudentId(event.target.value)
            }}
            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
          />
        </Box>
        <Button onClick={submit}>로그인</Button>
        <Dialog open={error} onClose={() => setError(false)}>
          <Alert severity="error" onClose={() => setError(false)}>
            모든 항목을 입력해 주세요.
          </Alert>
        </Dialog>
      </Container>
    </React.Fragment>
  )
}
