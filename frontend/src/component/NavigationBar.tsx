import { Colors } from '../constant'
import Logo from '../image/fg_two_small.png'
import { BsPersonFill } from 'react-icons/bs'
import {useState, CSSProperties} from 'react'
import { useNavigate } from "react-router-dom";

export default function Header() {
  const headerStyle : CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingRight: 10,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 50,
    position: 'sticky',
    top: 0
  }
  const menuStyle = {
    width: '20%',
    display: 'flex',
    justifyContent:'space-between',
    cursor:'pointer'
  }

  const navigate = useNavigate()

  const menuItem = {
    notice: 0,
    todo: 1,
    register: 2
  }
  const [isHover, setIsHover] = useState([false, false, false])

  const setHover = (idx: number) => {
    isHover[idx] = true
    setIsHover([...isHover])
  }
  const setHoverFalse = (idx: number) => {
    isHover[idx] = false
    setIsHover([...isHover])
  }

  return (
    <div style={headerStyle}>
      <div style={{marginRight: 20, alignItems:'center', display:'flex', cursor:'pointer'}} onClick={()=> navigate('/')}>
        <img src={Logo} alt="fnet-logo" style={{ height: 45, marginBottom: 5, marginRight: 10 }}/>
        <span>FNET</span>
      </div>
      <div style={menuStyle}>
        <span style={{color: isHover[menuItem.notice]? Colors.primary_lighter : Colors.primary}} onMouseOver={()=>setHover(menuItem.notice)} onMouseLeave={()=>setHoverFalse(menuItem.notice)} onClick={()=> navigate('/notice')}>Notice</span>
        <span style={{color: isHover[menuItem.todo]? Colors.primary_lighter : Colors.primary}} onMouseOver={()=>setHover(menuItem.todo)} onMouseLeave={()=>setHoverFalse(menuItem.todo)} onClick={()=> navigate('/todo')}>Todo</span>
        <span style={{color: isHover[menuItem.register]? Colors.primary_lighter : Colors.primary}} onMouseOver={()=>setHover(menuItem.register)} onMouseLeave={()=>setHoverFalse(menuItem.register)} onClick={()=> navigate('/register')}>Register</span>
      </div>
      <BsPersonFill style={{fontSize: 25, marginLeft: 20, marginRight:20, cursor:'pointer'}} />
    </div>
  )
}
