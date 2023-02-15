import React from 'react'
import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { Header } from '../../component'

type AdminSettingItemType = {
  title: string
  link: string
}

export default function SettingScreen() {
  const AdminSettingItem = ({ title, link }: AdminSettingItemType) => {
    return (
      <Card>
        <CardActionArea component={Link} to={`./${link}`}>
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
        <Header title="설정" />
        <main>
          <Grid container justifyContent="center" spacing={3} mt={3}>
            <Grid item>
              <AdminSettingItem title="OT Schedule" link="schedule" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="FG List" link="fg" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="Freshmen List" link="freshman" />
            </Grid>
            <Grid item>
              <AdminSettingItem title="FG & LC 등록" link="lcdate" />
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  )
}
