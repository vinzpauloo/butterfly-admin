// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Button, Grid, Dialog, DialogContent, Card, CardMedia, Box } from '@mui/material'

// ** Other Imports

// ** Styles Imports

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

type WorkBtnProps = {
  worksBtn: string
  backgroundColor: string
  color: string
  hoverBG: string
  hoverColor: string
  onClick?: () => void
}

const videoThumbnails = [
  // Add your video thumbnail URLs and titles here
  { url: 'https://i.pinimg.com/550x/9c/bc/af/9cbcafccdbd1995937772a047437ceb9.jpg', title: 'Video 1' },
  { url: 'https://qph.cf2.quoracdn.net/main-qimg-5a6efb9f21fd4ebe2e4417c9f4658e40-lq', title: 'Video 2' },
  {
    url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80',
    title: 'Video 3'
  },
  {
    url: 'https://www.shutterstock.com/image-photo/fashion-concept-young-asian-woman-260nw-2028757649.jpg',
    title: 'Video 3'
  },
  {
    url: 'https://www.byrdie.com/thmb/zC7al2kmq7fSE8iUPSrucYgwG74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IMG_2589-2f0c4080112e47078212c7f10543f8c1.PNG',
    title: 'Video 3'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsA4RjVZNOQ8deVLIFSePr_tYY8vjlc_ZGwA&usqp=CAU',
    title: 'Video 3'
  },
  {
    url: 'https://play-lh.googleusercontent.com/UHhUtvrLMheJFA1xPm8ZZt4qVjygbb2D1fi9MIbkfHb1bHtcDX9JeAgqmysK9qoHNM9a',
    title: 'Video 3'
  },
  {
    url: 'https://img.wattpad.com/ebfbbaa06faaed450eae4c2b5aea76d995e5b0b1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7870426975516b33747156494a513d3d2d3839343534353538322e313631333933656630663931663366303837353238363538343138362e6a7067?s=fit&w=720&h=720',
    title: 'Video 3'
  },
  { url: 'https://i.pinimg.com/originals/cb/8f/b8/cb8fb8c07322e19e7e0d71028c1e7167.jpg', title: 'Video 3' },
  { url: 'https://i.pinimg.com/550x/9c/bc/af/9cbcafccdbd1995937772a047437ceb9.jpg', title: 'Video 1' },
  { url: 'https://qph.cf2.quoracdn.net/main-qimg-5a6efb9f21fd4ebe2e4417c9f4658e40-lq', title: 'Video 2' },
  {
    url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80',
    title: 'Video 3'
  },
  {
    url: 'https://www.shutterstock.com/image-photo/fashion-concept-young-asian-woman-260nw-2028757649.jpg',
    title: 'Video 3'
  },
  {
    url: 'https://www.byrdie.com/thmb/zC7al2kmq7fSE8iUPSrucYgwG74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IMG_2589-2f0c4080112e47078212c7f10543f8c1.PNG',
    title: 'Video 3'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsA4RjVZNOQ8deVLIFSePr_tYY8vjlc_ZGwA&usqp=CAU',
    title: 'Video 3'
  },
  {
    url: 'https://play-lh.googleusercontent.com/UHhUtvrLMheJFA1xPm8ZZt4qVjygbb2D1fi9MIbkfHb1bHtcDX9JeAgqmysK9qoHNM9a',
    title: 'Video 3'
  },
  {
    url: 'https://img.wattpad.com/ebfbbaa06faaed450eae4c2b5aea76d995e5b0b1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7870426975516b33747156494a513d3d2d3839343534353538322e313631333933656630663931663366303837353238363538343138362e6a7067?s=fit&w=720&h=720',
    title: 'Video 3'
  },
  { url: 'https://i.pinimg.com/originals/cb/8f/b8/cb8fb8c07322e19e7e0d71028c1e7167.jpg', title: 'Video 3' },
  { url: 'https://i.pinimg.com/550x/9c/bc/af/9cbcafccdbd1995937772a047437ceb9.jpg', title: 'Video 1' },
  { url: 'https://qph.cf2.quoracdn.net/main-qimg-5a6efb9f21fd4ebe2e4417c9f4658e40-lq', title: 'Video 2' },
  {
    url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80',
    title: 'Video 3'
  },
  {
    url: 'https://www.shutterstock.com/image-photo/fashion-concept-young-asian-woman-260nw-2028757649.jpg',
    title: 'Video 3'
  },
  {
    url: 'https://www.byrdie.com/thmb/zC7al2kmq7fSE8iUPSrucYgwG74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IMG_2589-2f0c4080112e47078212c7f10543f8c1.PNG',
    title: 'Video 3'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsA4RjVZNOQ8deVLIFSePr_tYY8vjlc_ZGwA&usqp=CAU',
    title: 'Video 3'
  },
  {
    url: 'https://play-lh.googleusercontent.com/UHhUtvrLMheJFA1xPm8ZZt4qVjygbb2D1fi9MIbkfHb1bHtcDX9JeAgqmysK9qoHNM9a',
    title: 'Video 3'
  },
  {
    url: 'https://img.wattpad.com/ebfbbaa06faaed450eae4c2b5aea76d995e5b0b1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7870426975516b33747156494a513d3d2d3839343534353538322e313631333933656630663931663366303837353238363538343138362e6a7067?s=fit&w=720&h=720',
    title: 'Video 3'
  },
  { url: 'https://i.pinimg.com/originals/cb/8f/b8/cb8fb8c07322e19e7e0d71028c1e7167.jpg', title: 'Video 3' }
]

const WorksButton = (props: WorkBtnProps) => {
  return (
    <Button
      sx={[
        styles.workBtn,
        {
          backgroundColor: props.backgroundColor,
          color: props.color,
          '&:hover': {
            backgroundColor: props.hoverBG,
            color: props.hoverColor
          }
        }
      ]}
      onClick={props.onClick}
    >
      {props.worksBtn}
    </Button>
  )
}

const WorksModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [selectedThumbnails, setSelectedThumbnails] = useState(new Set<number>())

  const handleThumbnailClick = (index: number) => {
    const newSelectedThumbnails = new Set(selectedThumbnails)

    if (selectedThumbnails.has(index)) {
      newSelectedThumbnails.delete(index)
    } else {
      newSelectedThumbnails.add(index)
    }

    setSelectedThumbnails(newSelectedThumbnails)
  }

  const handleBackButtonClick = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
      <DialogContent sx={styles.content}>
        <Box sx={styles.topButtons}>
          <WorksButton worksBtn='All' backgroundColor='#FFF' color='#000' hoverBG='#9747FF' hoverColor='#FFF' />
          <WorksButton worksBtn='SELECTED' backgroundColor='#FFF' color='#000' hoverBG='#9747FF' hoverColor='#FFF' />
          <WorksButton
            worksBtn='NOT SELECTED'
            backgroundColor='#FFF'
            color='#000'
            hoverBG='#9747FF'
            hoverColor='#FFF'
          />
          <WorksButton worksBtn='SEARCH' backgroundColor='#FFF' color='#000' hoverBG='#9747FF' hoverColor='#FFF' />
        </Box>

        <Grid container spacing={5} maxHeight={600}>
          {videoThumbnails.map((thumbnail, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  ...(selectedThumbnails.has(index) && { border: '3px solid #9747FF' })
                }}
              >
                <CardMedia sx={styles.media} image={thumbnail.url} title={thumbnail.title} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <Box sx={styles.bottomButtons}>
        <WorksButton
          worksBtn='Back'
          backgroundColor='#FFF'
          color='#000'
          hoverBG='#7B0BB0'
          hoverColor='#FFF'
          onClick={handleBackButtonClick}
        />
        <WorksButton
          worksBtn='Continue'
          backgroundColor='#9747FF'
          color='#FFF'
          hoverBG='#7B0BB0'
          hoverColor='#FFF'
          onClick={handleBackButtonClick}
        />
      </Box>
    </Dialog>
  )
}

const styles = {
  //WorksButton
  workBtn: {
    border: '1px solid black',
    marginBottom: 5,
    width: {
      xs: '100%',
      lg: 150
    },
    textTransform: 'uppercase',
    fontSize: 12
  },

  //Body
  topButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    }
  },
  content: {
    overflowY: 'auto',
    maxHeight: 'calc(100dvh-200px)',
    backgroundColor: '#E6E6E6'
  },
  media: {
    paddingTop: '86.25%'
  },
  bottomButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E6E6E6',
    padding: {
      xs: 5,
      sm: 5,
      lg: '20px 0 0px 0'
    }
  }
}

export default WorksModal
