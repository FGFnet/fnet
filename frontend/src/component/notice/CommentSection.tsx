import { List, ListItem, Divider, Grid, TextField, Typography, Checkbox, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Colors } from '../../constant/colors.constants'
import { Comment } from '../../model'
import { CommentService } from '../../service'
import { accesstoken, userState } from '../../store'
import { dateFormatter } from '../../util'

function CommentListBox() {
  const param = useParams()
  const token = useRecoilValue(accesstoken)
  const user = useRecoilValue(userState)
  const [content, setContent] = useState('')

  const comment = useQuery(
    'getComment', 
    async () => await CommentService.get(Number(param.id), token),
  )
  const createComment = useMutation(
    'createComment',
    async (param: any) => await CommentService.create(param.data, param.token), 
    {
      onSuccess: () => {
        setContent('')
        comment.refetch()
      }
    }
  );
  const checkComment = useMutation(
    'checkComment',
    async (param: any) => await CommentService.check(param.data, param.token),
    {
      onSuccess(data) {
        comment.refetch()
      },
    }
  )

  const handleChecked = (id: number, check: boolean) => {
    checkComment.mutate({data: {id: id, check: !check}, token: token})
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
        {(comment.isLoading || !comment.data.results) && <div>loading...</div>}
        {!comment.isLoading && comment.data.results.map((com: Comment) => (
          <>
            <ListItem
              key={com.id}
              sx={{
                '&:hover': {
                  backgroundColor: Colors.hover,
                },
              }}
            >
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>{com.created_by.name + ' FG'}</Typography>
                  <Typography sx={{ color: Colors.light, fontSize: 12 }}>
                    {dateFormatter(com.create_time)}
                  </Typography>
                </Grid>
                <Grid item xs={11} md={8}>
                  <Typography sx={{ display: 'block', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                    {com.content}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Checkbox
                    checked={com.check}
                    onChange={() => handleChecked(com.id, com.check)}
                    disabled={user && user.role === 'Admin' ? false : true}
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
    const postComment = {
      notice_id: Number(param.id), 
      content: content
    }
    createComment.mutate({data: postComment, token: token})
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
