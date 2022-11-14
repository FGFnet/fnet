import {useState, CSSProperties} from 'react'
import { useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, Drawer, List, ListItemButton, IconButton, Box, Divider } from '@mui/material'

import { userState } from '../store'
import { useRecoilState } from 'recoil'

import { Colors } from '../constant'
import Logo from '../image/fg_green_192.png'
import { BsPersonFill } from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'

// TODO: 사용자가 로그인 했으면 버튼 텍스트를 LOGOUT, 안했으면 LOGIN으로 설정 (API 연결 후) -> 그에따라 클릭이벤트 라우팅 or 로그아웃 설정
export default function Header() {
  const headerStyle : CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100vw',
    backgroundColor: '#ffffffCC',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 50,
    position: 'sticky',
    top: 0
  }
  const menuStyle = {
    width: '30%',
    display: 'flex',
    justifyContent:'space-between',
    cursor:'pointer'
  }

  const navigate = useNavigate()
  const matches = useMediaQuery('(min-width:768px)')
  const [userLoginState, setUserLoginState] = useRecoilState(userState)

  const menuItem = userLoginState.auth ? {
    notice: 0,
    todo: 1,
    register: 2,
    admin: 3,
  } : {
    notice: 0,
    todo: 1,
    lc: 2,
  }
  const [isHover, setIsHover] = useState([false, false, false])
  const [open, setOpen] = useState(false)

  const setHover = (idx: number) => {
    isHover[idx] = true
    setIsHover([...isHover])
  }
  const setHoverFalse = (idx: number) => {
    isHover[idx] = false
    setIsHover([...isHover])
  }
  const goPage = (item:string) => {
    console.log(item)
    navigate(`/${item}`)
    window.location.reload()
  }

  const drawerItem = (
    <Box onClick={()=>setOpen(false)}>
      <List>
        {
          Object.keys(menuItem).map(item=>(
            <ListItemButton key={item} onClick={()=>goPage(item)} style={{cursor: "pointer"}}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ListItemButton>
          ))
        }
        <Divider/>
        {!userLoginState.login && <ListItemButton style={{cursor: "pointer"}} onClick={() => navigate(`/login`)}>Login</ListItemButton>}
        {userLoginState.login && <ListItemButton style={{cursor: "pointer"}} onClick={() => setUserLoginState({...userLoginState, login: false})}>Logout</ListItemButton>}
      </List>
    </Box>
  )
  
  if (matches) {
    return (
      <header style={headerStyle}>
        <section style={{marginRight: 20, alignItems:'center', display:'flex', cursor:'pointer'}} onClick={()=> navigate('/')}>
          <img src={Logo} alt="fnet-logo" style={{ height: 45, marginBottom: 5, marginRight: 10, marginLeft: 10 }}/>
          <span>FNET</span>
        </section>
        <section style={menuStyle}>
          {
            Object.keys(menuItem).map((item:string, idx: number) => (
              <span
                key={item}
                style={{color: isHover[idx]? Colors.primary_lighter : Colors.primary}}
                onMouseOver={()=>setHover(idx)}
                onMouseLeave={()=>setHoverFalse(idx)}
                onClick={()=>goPage(item)}
              >{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            ))
          }
        </section>
        {!userLoginState.login && 
          <Button
            style={{marginRight: 10}}
            startIcon={<BsPersonFill style={{fontSize: 25, cursor:'pointer'}}/>}
            onClick={() => navigate(`/login`)}
          >
            Login
          </Button>
        }
        {userLoginState.login && 
          <Button
            style={{marginRight: 10}}
            onClick={() => setUserLoginState({...userLoginState, login: false})}
          >
            Logout
          </Button>
        }
      </header>
    )
  } else {
    return (
      <header style={{position:'sticky', backgroundColor:'#ffffffcc' ,top:0, display:'flex', alignItems: 'center', zIndex: 50, justifyContent: 'center'}}>
        <img src={Logo} alt="fnet-logo" onClick={()=> navigate('/')} style={{ height: 45, marginBottom: 5, marginRight: 10, cursor:"pointer" }}/>
        <span>FNET 
          <IconButton
            aria-label="more"
            onClick={()=>setOpen(true)}
          ><IoMdArrowDropdown style={{color: Colors.primary}}/></IconButton>
        </span>
        <Drawer anchor="top" open={open} onClose={()=>setOpen(false)}>{drawerItem}</Drawer>
      </header>
    )
  }
}