import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Container, Divider, Typography, Box, Button } from '@mui/material'
import { Header, Title, CommentListBox } from '../../component'
import { Colors } from '../../constant'
import { TbMenu2 as MenuIcon } from 'react-icons/tb'
import { dateFormatter } from '../../util'
import { NoticeService } from '../../service'


export default function NoticeDetailScreen() {
  const navigate = useNavigate()
  const param = useParams()
  const notice = useQuery('getNotice', async () => await NoticeService.get(Number(param.id)))
  

  const NoticeBox = () => {
    return (
      <Container sx={{ padding: 5 }}>
        {!notice.data && <Typography>Loading...</Typography>}
        {notice.data &&
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Title
                variant="h5"
                title={notice.data.title}
                background={Colors.primary_lighter}
                style={{ marginBottom: 2, marginRight: 2 }}
              />
              <Typography sx={{ color: Colors.light }}>{dateFormatter(notice.data.create_time)}</Typography>
            </Box>
            <Typography>{notice.data.content}</Typography>
          </>
        }
      </Container>
    )
  }

  const MenuBtn = () => {
    return (
      <Box textAlign="right">
        <Button
          onClick={() => {
            navigate('/notice')
          }}
        >
          <MenuIcon style={{ marginRight: 2 }} />
          목록
        </Button>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항" children={<MenuBtn />} />
        <NoticeBox />
        <Divider />
        <CommentListBox />
      </Container>
    </React.Fragment>
  )
}
