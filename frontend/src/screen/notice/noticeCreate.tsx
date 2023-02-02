import React, { useState } from 'react'
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material'
import { Header } from '../../component'
import { Colors } from '../../constant'
import { Link } from 'react-router-dom'
import { NoticeService} from '../../service'
import { useMutation } from 'react-query'
import { accesstoken } from '../../store'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

// check admin

export default function NoticeCreateScreen() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const token = useRecoilValue(accesstoken)

  const createMutation = useMutation(
    'createNotice',
    async (param: any) => {return await NoticeService.create(param.data, param.token)}, 
    {
      onSuccess: (data) => {
        console.log(data)
        setTitle('')
        setContent('')
        navigate('/notice')
      }
    }
  );

  const CreateNewPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (title.trim() === '') alert('제목을 입력해 주세요')
    else if (content.trim() === '') alert('내용을 입력해 주세요')
    else {
      const postData = {
        title: title,
        content: content,
      }
      createMutation.mutate({data: postData, token: token})
    }
  }

  const BackBtn = () => {
    return (
      <Box textAlign="right">
        <Button variant="outlined" component={Link} to="../notice" sx={{ color: Colors.black }}>
          취소
        </Button>
      </Box>
    )
  }
  const SavePostBtn = () => {
    return (
      <Box textAlign="right">
        <Button variant="outlined" onClick={CreateNewPost} sx={{ color: Colors.black }}>
          등록
        </Button>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항 작성" />
        <Divider />
        <Grid container alignItems="center" sx={{ display: 'flex' }}>
          <Grid item xs={2} sm={1}>
            <Box textAlign="center">
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                제목
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={10} sm={11}>
            <TextField fullWidth margin="normal" label="제목" onChange={(event) => setTitle(event.target.value)} />
          </Grid>
          <Grid item xs={2} sm={1}>
            <Box textAlign="center">
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                내용
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} paddingLeft={5}>
            <Box textAlign="right">
              <TextField
                multiline
                rows={10}
                margin="normal"
                label="내용"
                sx={{ width: '100%', alignContent: 'center' }}
                onChange={(event) => setContent(event.target.value)}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item paddingLeft={5}>
            <BackBtn />
          </Grid>
          <Grid item>
            <SavePostBtn />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
