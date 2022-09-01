import { List, ListItem, Divider, Grid, TextField, Typography, Checkbox, Button, Box } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { Colors } from '../../../constant/colors.constants'

type comment = {
    id: number
    created_by: string
    content: string
    create_time: number
    check: boolean
  }

//TODO : admin일때만 checkbox사용 가능하도록 변경
export default function CommentListBox() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState<comment[]>([]);

  function getWindowSize() {
    let innerWidth =window.innerWidth;
    let innerHeight = window.innerHeight;
    if (innerWidth >1200) innerWidth = 1200;
    return {innerWidth, innerHeight};
  }

  useEffect(()=> {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, id:number, comment: comment) => {
    const newCommentList = commentList.map(comment => {
      if (comment.id === id) {
        return {...comment, check: event.target.checked}
      }
      return comment;
    })

    setCommentList(newCommentList);
  }

  const dateFormatter = (date: number) => {
    const create_time = new Date(date)
    const now = new Date()
    let diff = (now.getTime() - create_time.getTime()) / (1000 * 60)
    if (diff < 60) {
      // 1시간 이내
      diff = Math.round(diff)
      return diff + '분 전'
    } else if (diff < 60 * 24) {
      diff = Math.round(diff / 60)
      return diff + '시간 전'
    } else {
      diff = Math.round(diff / (60 * 24))
      return diff + '일 전'
    }
  }

  const CommentList = () => {return (
    <List
      sx={{
        height:windowSize.innerHeight * 0.5,
        width:windowSize.innerWidth * 0.9,
        maxHeight: windowSize.innerHeight * 0.5,
        overflow:'auto',
        margin: 'auto'
      }}
    >
      {commentList.map(comment => (
        <>
        <ListItem 
          key={comment.id}
          sx={{
            '&:hover': {
              backgroundColor: Colors.hover,
            }
          }}
        >
          <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={12} md={3} sx={{display:'flex', alignItems: 'center'}}>
              <Typography sx={{fontWeight: 'bold', marginRight:2}}>{comment.created_by+ ' FG'}</Typography>
              <Typography sx={{color: Colors.light, fontSize: 12}}>{dateFormatter(comment.create_time)}</Typography>
            </Grid>
            <Grid item xs={11} md={8}>
              <Typography sx={{display: 'block', whiteSpace:'normal', wordBreak:'break-all'}}>{comment.content}</Typography>
            </Grid>
            <Grid item xs={1} md={1}>
              <Checkbox
                checked={comment.check}
                onChange={(event) => handleChecked(event, comment.id,comment)}
                disabled={false}
              />
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </>
      ))}
    </List>
    )}

  const addComment = () => {
    const comment: comment = {
      id: commentList.length + 1,
      created_by: "김하늘",
      content: content,
      create_time: 1658931430404,
      check: true
    }
    setCommentList([...commentList, comment])
    setContent('')
  }

  return (
    <>
      <CommentList />
      <Box sx={{display:'flex', alignItems: 'space-between', width: windowSize.innerWidth * 0.9}}>
        <TextField
            fullWidth
            value={content}
            onChange={(event) => {setContent(event.target.value)}}
            onKeyDown={(event) => {if (event.key === 'Enter') addComment()}}
        />
        <Button onClick={addComment}>입력</Button>
      </Box>
    </>
  )
}