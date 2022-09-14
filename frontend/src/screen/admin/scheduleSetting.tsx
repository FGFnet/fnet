import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Container, Typography, Card, CardContent, Button, Input } from '@mui/material'
import { Header, Title } from '../../component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import { BiCalendar } from 'react-icons/bi'

let data = {
  dates: [1676473200000, 1676559600000, 1676646000000],
}

export interface Props {
  value?: Date | string
  onClick?(e: React.MouseEvent<HTMLElement>): void
}

export default function ScheduleSettingScreen() {
  const [firstDate, setFirstDate] = useState<Date>(new Date(data.dates[0]))
  const [secondDate, setSecondDate] = useState<Date>(new Date(data.dates[1]))
  const [thirdDate, setThirdDate] = useState<Date>(new Date(data.dates[2]))

  const CustomInput = React.forwardRef<HTMLElement, Props>(({ onChange, value, onClick }: any) => {
    return (
      <Box>
        <Input onChange={onChange} value={value} onClick={onClick}></Input>
        <BiCalendar onClick={onClick} />
      </Box>
    )
  })

  const DateSetting = () => {
    return (
      <React.Fragment>
        <Grid item>
          <Card>
            <CardContent>
              <Typography>DAY 1</Typography>
            </CardContent>
            <CardContent>
              <DatePicker
                locale={ko}
                dateFormat="yyyy/MM/dd"
                selected={firstDate}
                onChange={(date: Date) => setFirstDate(date)}
                customInput={<CustomInput />}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <CardContent>
              <Typography>DAY 2</Typography>
            </CardContent>
            <CardContent>
              <DatePicker
                locale={ko}
                dateFormat="yyyy/MM/dd"
                selected={secondDate}
                onChange={(date: Date) => setSecondDate(date)}
                customInput={<CustomInput />}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <CardContent>
              <Typography>DAY 3</Typography>
            </CardContent>
            <CardContent>
              <DatePicker
                locale={ko}
                dateFormat="yyyy/MM/dd"
                selected={thirdDate}
                onChange={(date: Date) => setThirdDate(date)}
                customInput={<CustomInput />}
              />
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    )
  }

  const saveDate = (event: React.MouseEvent<HTMLElement>) => {
    data.dates = [firstDate.getTime(), secondDate.getTime(), thirdDate.getTime()]
    console.log(data)
    alert('저장되었습니다.')
  }

  const ListButton = () => {
    return (
      <Box textAlign="right">
        <Button component={Link} to={'/admin'}>
          뒤로가기
        </Button>
      </Box>
    )
  }

  const SaveButton = () => {
    return (
      <Box textAlign="right">
        <Button onClick={(e) => saveDate(e)}>저장</Button>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="설정" children={<ListButton />} />
        <Title title="OT 일정" background="#D0DBCC" />
        <Grid container spacing={5} justifyContent="center" mt={2} mb={2}>
          <DateSetting />
        </Grid>
        <SaveButton />
      </Container>
    </React.Fragment>
  )
}
