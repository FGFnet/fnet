import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { TbMenu2 as MenuIcon } from 'react-icons/tb'

export default function MenuButton() {
  return (
    <Box textAlign="right">
      <Button component={Link} to={'/admin'} startIcon={<MenuIcon />}>
        MENU
      </Button>
    </Box>
  )
}
