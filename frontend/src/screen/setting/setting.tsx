import React, { useState } from 'react'
import { Box, Container, Modal, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { Header } from '../../component'
import { ScheduleService } from '../../service'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'
import { useQuery } from 'react-query'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f0f0f0',
  boxShadow: 24,
  p: 4,
};

type AdminSettingItemType = {
  title: string
  link: string
}

export default function SettingScreen() {
  const token = useRecoilValue(accesstoken)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [uploadFg, setUploadFg] = useState(false)
  const [checkSchedule, setCheckSchedule] = useState(false)
  useQuery('checkschedule', async () => await ScheduleService.get(token), {
    refetchOnWindowFocus: false,
    enabled: uploadFg,
    onSuccess: (data) => {
      if (data.data.length > 0) {
        setCheckSchedule(true)
        setUploadFg(false)
        navigate("/setting/lcdate")
      } else {
        setOpen(true)
      }
    },
  })

  const ScheduleModal = () => {
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            팀빌딩 스케줄 등록
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            FG를 등록하기 전에 팀빌딩 스케줄을 먼저 등록해 주세요.
          </Typography>
        </Box>
      </Modal>
    )
  }

  const checkUploadFG = (title: string) => {
    if (title === "FG & LC 등록") {
      setUploadFg(true)
    }
  }

  const goPage = (link: string) => {
    if (link === '/setting/lcdate' && checkSchedule === false) {
      return
    }
    navigate(link)
  }

  const AdminSettingItem = ({ title, link }: AdminSettingItemType) => {
    return (
      <Card onClick={() => {checkUploadFG(title)}}>
        <CardActionArea onClick={() => goPage(link)}>
          <CardContent>
            <Typography>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <ScheduleModal />
        <Header title="설정" />
        <main>
          <Grid container justifyContent="center" spacing={3} mt={3}>
            <Grid item>
              <AdminSettingItem title="OT Schedule" link="/setting/schedule" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="FG List" link="/setting/fg" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="Freshmen List" link="/setting/freshman" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="FG & LC 등록" link="/setting/lcdate" />
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  )
}
