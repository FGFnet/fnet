import { Button } from '@mui/material'
import { FiArrowRight } from 'react-icons/fi'
import { TbMoodSmile } from 'react-icons/tb'
import { Colors } from '../../constant'
import { FG } from '../../model'

function FGSection({fg}: {fg: FG}) {
  return (
    <section style={{ margin: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        {' '}
        Hello <TbMoodSmile fontSize={20} />
      </div>
      <span style={{ fontSize: 20, background: Colors.accent }}>{fg.name} fg</span>
      <div style={{ marginBottom: 5, marginTop: 20 }}>2/14 진행 LC : LC09</div>
      <div style={{ marginBottom: 20 }}>LC09 접수 인원 : 15</div>
      <Button variant="outlined" style={{ margin: 'auto' }}>
        Go LC09 <FiArrowRight />
      </Button>
    </section>
  )
}

export {FGSection};
