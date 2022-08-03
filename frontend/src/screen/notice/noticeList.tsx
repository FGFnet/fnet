import React from 'react'
import { Container, CssBaseline, Divider, Grid, List, ListItem, Typography } from '@mui/material'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { Colors } from '../../constant/colors.constants'
import Header from '../../component/Header'

let defaultTheme = createTheme()
defaultTheme = responsiveFontSizes(defaultTheme)

export default function NoticeListScreen() {

  const data = [
    {
      notice_id: 1,
      title: '중간 조퇴자 조사',
      content: '중간 조퇴자 조사합니다.',
      create_time: 1658931430404,
      last_update_time: '',
    },
    {
      notice_id: 2,
      title: '접수 인원 조사',
      content: '접수 인원 조사합니다.',
      create_time: 1659090489553,
      last_update_time: '',
    },
  ]

  function dateFormatter(date: any) {
    const create_time = new Date(date)
    const now = new Date()
    var diff = (now.getTime() - create_time.getTime()) / (1000 * 60)
    if (diff < 60) {
      // 1시간 이내
      diff = Math.round(diff)
      return diff + '분 전'
    } else if (diff < 60 * 24) {
      diff = Math.round(diff / 60)
      return diff + '시간 전'
    } else {
      diff = Math.round(diff / (60 * 24))
      return diff + '일 전'
    }
  }

  function Post({ title, create_time }: { title: string; create_time: any }) {
    return (
      <React.Fragment>
        <ListItem
          component={Link}
          to=":id"
          sx={{
            '&:hover': {
              backgroundColor: Colors.hover,
              fontWeight: 'bold',
            },
            marginY: 0.5,
            borderRadius: 3,
          }}
        >
          <Grid container>
            <Grid item xs={10}>
              <Typography component="h6" variant="h6" color="inherit" align="left" noWrap sx={{ color: Colors.black }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component="div" variant="body1" align="right" color="textSecondary" noWrap>
                {dateFormatter(create_time)}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider variant="middle" />
      </React.Fragment>
    )
  }

  function Posts() {
    return (
      <Grid>
        <List aria-label="mailbox folders">
          {data.map((p) => (
            <Post title={p.title} create_time={p.create_time} />
          ))}
        </List>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Header title="공지사항" btn="+ NEW" />
          <main>
            <Posts />
          </main>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
