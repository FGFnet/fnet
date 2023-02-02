import React from 'react'
import { Box, Button, Container, Divider, Grid, List, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Colors } from '../../constant'
import { Header } from '../../component'
import { dateFormatter } from '../../util'
import { useQuery } from 'react-query'
import { NoticeService } from '../../service'
import { Notice } from '../../model'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store'
import dayjs from 'dayjs'

export default function NoticeListScreen() {
  const user = useRecoilValue(userState)
  const noticeList = useQuery(
    'getNotice', async () => await NoticeService.get(), {
      onSuccess: data => {
        console.log(data.results)
      }
    }
  )

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

  const Post = ({ notice }: {notice: Notice}) => {
    return (
      <React.Fragment>
        <ListItem
          component={Link}
          to={`/notice/${notice.id}`}
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
                {notice.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component="div" variant="body1" align="right" color="textSecondary" noWrap>
                {dateFormatter(notice.create_time)}
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
      <>
        {noticeList.isLoading && <div>Loading...</div>}
        {!noticeList.isLoading && 
          <Grid>
            <List aria-label="mailbox folders">
              {noticeList.data.results.map((p:Notice) => (
                <Post key={p.id} notice={p} />
              ))}
            </List>
          </Grid>
        }
      </>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항" children={user && user.role === 'Admin' ? <NewPostBtn /> : ''} />
        <main>
          <Posts />
        </main>
      </Container>
    </React.Fragment>
  )
}
