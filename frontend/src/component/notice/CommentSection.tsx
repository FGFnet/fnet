import { List, ListItem, Divider, Grid, TextField, Typography, Checkbox, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../../constant/colors.constants'
import { dateFormatter } from '../../util'

type comment = {
  id: number
  created_by: string
  content: string
  create_time: number
  check: boolean
}

//TODO : admin일때만 checkbox사용 가능하도록 변경
function CommentListBox() {
  const [content, setContent] = useState('')
  const [commentList, setCommentList] = useState<comment[]>([])

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, id: number, comment: comment) => {
    const newCommentList = commentList.map((comment) => {
      if (comment.id === id) {
        return { ...comment, check: event.target.checked }
      }
      return comment
    })

    setCommentList(newCommentList)
  }

  const CommentList = () => {
    return (
      <List
        sx={{
          height: '45vh',
          width: '90%',
          minHeight: '45vh',
          maxHeight: '45vh',
          overflow: 'auto',
          margin: 'auto',
        }}
      >
        {commentList.map((comment) => (
          <>
            <ListItem
              key={comment.id}
              sx={{
                '&:hover': {
                  backgroundColor: Colors.hover,
                },
              }}
            >
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>{comment.created_by + ' FG'}</Typography>
                  <Typography sx={{ color: Colors.light, fontSize: 12 }}>
                    {dateFormatter(comment.create_time)}
                  </Typography>
                </Grid>
                <Grid item xs={11} md={8}>
                  <Typography sx={{ display: 'block', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                    {comment.content}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Checkbox
                    checked={comment.check}
                    onChange={(event) => handleChecked(event, comment.id, comment)}
                    disabled={false}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    )
  }

  const addComment = () => {
    const comment: comment = {
      id: commentList.length + 1,
      created_by: '김하늘',
      content: content,
      create_time: 1658931430404,
      check: false,
    }
    setCommentList([...commentList, comment])
    setContent('')
  }

  const isEnglish = (c: string) => {
    if (c >= 'a' && c <= 'z') return true
    else if (c >= 'A' && c <= 'Z') return true
    return false
  }

  const enterEvent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setContent(content.trim())
      const lastChar = content[content.length - 1]
      if (!isEnglish(lastChar) && !event.nativeEvent.isComposing) {
        setContent('')
        return
      } else addComment()
    }
  }

  return (
    <>
      <CommentList />
      <Box sx={{ display: 'flex', alignItems: 'space-between', width: '90%', margin: 'auto' }}>
        <TextField
          fullWidth
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
          onKeyDown={(event) => {
            enterEvent(event)
          }}
        />
        <Button onClick={() => addComment()}>입력</Button>
      </Box>
    </>
  )
}

export {CommentListBox}
