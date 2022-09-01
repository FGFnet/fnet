import React from 'react'
import { Container, Divider, Typography, Box } from '@mui/material'
import {Header, Title} from '../../component'
import { Colors } from '../../constant/colors.constants'
import CommentSection from './component/CommentSection'

export default function NoticeDetailScreen() {
  const notice = {
    title: "중간 조퇴자 조사",
    content: "중간 조퇴자 여부 조사해서 인원수, 강의실, 시간 순서대로 댓글 남겨주세요.",
    create_time: 1658931430404
  }

  const NoticeBox = () => {
    return (
      <Container sx={{padding: 5}}>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Title variant='h5' title={notice.title} background={Colors.primary_lighter} style={{marginBottom: 2, marginRight: 2}} />
          <Typography sx={{color:Colors.light}}>{dateFormatter(notice.create_time)}</Typography>
        </Box>
        <Typography>{notice.content}</Typography>
      </Container>
    )
  };

  const dateFormatter = (date: number) => {
    const create_time = new Date(date)
    const now = new Date()
    let diff = (now.getTime() - create_time.getTime()) / (1000 * 60)
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
 
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항" />
        <NoticeBox />
        <Divider />
        <CommentSection/>
      </Container>
    </React.Fragment>
  )
}
