import React from 'react'
import { Box, Button, Container, Divider, Grid, List, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Colors } from '../../constant'
import { Header } from '../../component'
import { dateFormatter } from '../../util'

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

  type PostType = {
    title: string
    create_time: number
    notice_id: number
  }

  const NewPostBtn = () => {
    return (
      <Box textAlign="right">
        <Button
          component={Link}
          to="create"
          sx={{
            fontWeight: 'bold',
            color: Colors.black,
          }}
        >
          + NEW
        </Button>
      </Box>
    )
  }

  const Post = ({ title, create_time, notice_id }: PostType) => {
    return (
      <React.Fragment>
        <ListItem
          component={Link}
          to={`/notice/${notice_id}`}
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

  const Posts = () => {
    return (
      <Grid>
        <List aria-label="mailbox folders">
          {data.map((p) => (
            <Post title={p.title} create_time={p.create_time} notice_id={p.notice_id} />
          ))}
        </List>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항" children={<NewPostBtn />} />
        <main>
          <Posts />
        </main>
      </Container>
    </React.Fragment>
  )
}
