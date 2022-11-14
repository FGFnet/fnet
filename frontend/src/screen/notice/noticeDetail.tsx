import React from 'react'
import { Container, Divider, Typography, Box, Button } from '@mui/material'
import {Header, Title} from '../../component'
import { Colors } from '../../constant/colors.constants'
import CommentSection from './component/CommentSection'
import {TbMenu2 as MenuIcon} from 'react-icons/tb'
import { useNavigate } from "react-router-dom"
import { dateFormatter } from '../../util'

export default function NoticeDetailScreen() {
  const navigate = useNavigate()
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

  const MenuBtn = () => {
    return (
      <Box textAlign="right">
        <Button onClick={()=>{navigate('/notice')}}><MenuIcon style={{marginRight: 2}} />목록</Button>
      </Box>
    )
  }
 
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="공지사항" children={<MenuBtn />} />
        <NoticeBox />
        <Divider />
        <CommentSection/>
      </Container>
    </React.Fragment>
  )
}
