import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Screen from './screen'

export default class Router extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Screen.HomeScreen />} />
        <Route path="/lc" element={<Screen.LcMemberScreen />} />
        <Route path="/:id/setting" element={<Screen.LcSettingScreen />} />
        <Route path="/todo" element={<Screen.TodoScreen />} />
        <Route path="/notice" element={<Screen.NoticeListScreen />} />
        <Route path="/notice/:id" element={<Screen.NoticeDetailScreen />} />
        <Route path="/notice/create" element={<Screen.NoticeCreateScreen />} />
        <Route path="/register" element={<Screen.RegisterScreen />} />
        <Route path="/setting" element={<Screen.SettingScreen />} />
        <Route path="/setting/schedule" element={<Screen.ScheduleSettingScreen />} />
        <Route path="/setting/fg" element={<Screen.FgSettingScreen />} />
        <Route path="/setting/freshman" element={<Screen.FreshmanSettingScreen />} />
        <Route path="/setting/lcdate" element={<Screen.LcDateSettingScreen />} />
      </Routes>
    )
  }
}
