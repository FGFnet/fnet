import React, { Component } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { NavigationBar } from './component'
import * as Screen from './screen'

function BasicLayout () {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}

function LoginLayout () {
  return (
    <Outlet />
  )
}
export default class Router extends Component {
  render() {
    return (
        <Routes>
          <Route path="/" element = {<BasicLayout />}>
            <Route index element={<Screen.HomeScreen />} />
            <Route path="lc" element={<Screen.LcMemberScreen />} />
            <Route path=":id/setting" element={<Screen.LcSettingScreen />} />
            <Route path="todo" element={<Screen.TodoScreen />} />
            <Route path="notice" element={<Screen.NoticeListScreen />} />
            <Route path="notice/:id" element={<Screen.NoticeDetailScreen />} />
            <Route path="notice/create" element={<Screen.NoticeCreateScreen />} />
            <Route path="register" element={<Screen.RegisterScreen />} />
            <Route path="admin" element={<Screen.SettingScreen />} />
            <Route path="admin/fg" element={<Screen.FgSettingScreen />} />
            <Route path="admin/freshman" element={<Screen.FreshmanSettingScreen />} />
          </Route>
          <Route path="/login" element = {<LoginLayout />}>
            <Route index element={<Screen.SignInScreen />} />
          </Route>
        </Routes>
    )
  }
}
