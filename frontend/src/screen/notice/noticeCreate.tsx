import React, { useState } from 'react'
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material'
import Header from '../../component/Header'
import { Colors } from '../../constant/colors.constants'
import { Link } from 'react-router-dom'

// check admin

export default function NoticeCreateScreen() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const CreateNewPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (title.trim() === '') alert('제목을 입력해 주세요')
    else if (content.trim() === '') alert('내용을 입력해 주세요')
    else {
      const postData = {
        title: title,
        content: content,
      }
      console.log(postData)
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
