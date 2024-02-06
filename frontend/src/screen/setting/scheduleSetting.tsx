import React, { useState } from 'react'
import { Box, Grid, Container, Typography, Card, CardContent, Button, Input } from '@mui/material'
import { Header, Title, MenuButton } from '../../component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import { BiCalendar } from 'react-icons/bi'
import { useMutation, useQuery } from 'react-query'
import { ScheduleService } from '../../service'
import { useRecoilValue } from 'recoil'
import { accesstoken } from '../../store'

export interface Props {
  value?: Date | string
  onClick?(e: React.MouseEvent<HTMLElement>): void
}

export default function ScheduleSettingScreen() {
  const token = useRecoilValue(accesstoken)
  const [firstDate, setFirstDate] = useState<Date>(new Date())
  const [secondDate, setSecondDate] = useState<Date>(new Date())

  const schedule = useQuery('getSchedule', async () => await ScheduleService.get(token), {
    onSuccess: (data) => {
      // console.log(data)
      if (data.data.length >= 2) {
        setFirstDate(new Date(data.data[0].date))
        setSecondDate(new Date(data.data[1].date))
      }
    },
    refetchOnWindowFocus: false
  })
  const setSchedule = useMutation('setShedule', async (param: any) => await ScheduleService.create(param, token), {
    onSuccess: (data) => {
      if(data.error){
        alert(data.data)
        return
      }
      // console.log(data)
      alert('저장되었습니다')
    },
  })

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
        {(schedule.isLoading) && <div>loading...</div>}
        {schedule.data && (
          <>
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
          </>
        )}

        {/* <Grid item>
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
        </Grid> */}
      </React.Fragment>
    )
  }

  const saveDate = (event: React.MouseEvent<HTMLElement>) => {
    setSchedule.mutate({date: new Date(firstDate), day: 1 })
    setSchedule.mutate({date: new Date(secondDate), day: 2 })
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
        <Header title="설정" children={<MenuButton />} />
        <Title title="OT 일정" variant="h5" background="#D0DBCC" />
        <Grid container spacing={5} justifyContent="center" mt={2} mb={2}>
          <DateSetting />
        </Grid>
        <SaveButton />
      </Container>
    </React.Fragment>
  )
}
