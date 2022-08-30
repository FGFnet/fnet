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
        <Route path="/todo" element={<Screen.TodoListScreen />} />
        <Route path="/todo/:id" element={<Screen.TodoDetailScreen />} />
        <Route path="/todo/create" element={<Screen.TodoCreateScreen />} />
        <Route path="/notice" element={<Screen.NoticeListScreen />} />
        <Route path="/notice/:id" element={<Screen.NoticeDetailScreen />} />
        <Route path="/notice/create" element={<Screen.NoticeCreateScreen />} />
        <Route path="/register" element={<Screen.RegisterScreen />} />
        <Route path="/admin" element={<Screen.SettingScreen />} />
        <Route path="/admin/fg" element={<Screen.FgSettingScreen />} />
        <Route path="/admin/freshman" element={<Screen.FreshmanSettingScreen />} />
      </Routes>
    )
  }
}
