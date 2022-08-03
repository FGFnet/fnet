import React, { useState } from 'react'
import { Box, Button, Container, CssBaseline, Divider, Grid, TextField, Typography, FormControl } from '@mui/material'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import Header from '../../component/Header'
import { Colors } from '../../constant/colors.constants'
import { Link } from 'react-router-dom'

let defaultTheme = createTheme()
defaultTheme = responsiveFontSizes(defaultTheme)

// check admin

export default function NoticeCreateScreen() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function CreateNewPost(event: React.MouseEvent<HTMLButtonElement>) {
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

  function BackBtn() {
    return (
      <Box textAlign="right">
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="../notice"
          sx={{ fontSize: 20, color: Colors.black }}
        >
          취소
        </Button>
      </Box>
    )
  }
  function SavePostBtn() {
    return (
      <Box textAlign="right">
        <Button variant="outlined" size="large" onClick={CreateNewPost} sx={{ fontSize: 20, color: Colors.black }}>
          등록
        </Button>
      </Box>
    )
  }

  return (
    <React.Fragment>
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
          <TextField
            fullWidth
            margin="normal"
            label="제목"
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            onChange={(event) => setTitle(event.target.value)}
          />
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
              InputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
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
    </React.Fragment>
  )
}
