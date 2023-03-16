// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Button, Grid, Dialog, DialogContent, Card, CardMedia, Box } from '@mui/material'

// ** Other Imports
import videoThumbnails from '../../data/VideoThumbnails'

// ** Styles Imports
import styles from '../../styles/worksModal'

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

export default WorksModal
