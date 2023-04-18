// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Step Components
import AllStory from '@/pages/studio/newsfeed/views/AllStory'
import AllPhoto from '@/pages/studio/newsfeed/views/AllPhoto'
import AllVideo from '@/pages/studio/newsfeed/views/AllVideo'
import VideosWithPhotos from '@/pages/studio/newsfeed/views/VideosWithPhotos'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslateString } from '@/utils/TranslateString';

// ** Style Imports

const steps = [
    {
        title: 'All Story Feeds',
    },
    {
        title: 'All Photo Feeds',
    },
    {
        title: 'All Video Feeds',
    },
    {
        title: 'Videos With Photos',
    },
]

interface FeedsProps {
    onClose: () => void
}

const SelectFeaturedFeeds: React.FC<FeedsProps> = ({ onClose }) => {

    // ** States
    const [activeTab, setActiveTab] = React.useState<number>(0)

    // TURN THIS TO ENUM SO ITS READABLE
    const getActiveTabContent = (step: number) => {
        switch (step) {
            case 0:
                return <AllStory />
            case 1:
                return <AllPhoto />
            case 2:
                return <AllVideo />
            case 3:
                return <VideosWithPhotos />
            default:
                return null
        }
    }

    const renderContent = () => {
        return getActiveTabContent(activeTab)
    }

    const handleBtnClick = () => {
        onClose();
    }
    
    const TranslateString = useTranslateString()

    return (
        <Box sx={styles.container}>
            <Box sx={styles.topButtons}>
                <Box sx={styles.inputSave}>
                    <TextField sx={styles.title} label={TranslateString("Featured Feed Title")} />
                    <Button
                        sx={styles.saveBtn}
                        onClick={handleBtnClick}
                    >
                        {TranslateString("Save")}
                    </Button>
                </Box>
                <Box sx={styles.steps}>
                    {steps.map((step, index) => {
                        return (
                            <Button
                                sx={{
                                    ...styles.stepsBtn,
                                    backgroundColor: index === activeTab ? '#9747FF' : '#FFF',
                                    color: index === activeTab ? '#FFF' : '#000',
                                }}
                                key={index}
                                size='medium'
                                onClick={() => { setActiveTab(index) }} >{TranslateString(step.title)}
                            </Button>
                        )
                    })}
                    <TextField
                        sx={styles.search}
                        variant='outlined'
                        placeholder={TranslateString("Search")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Icon icon='mdi:microphone' />
                                </InputAdornment>
                            )
                        }} />
                </Box>
            </Box>
            <Box sx={styles.content}>
                {renderContent()}
            </Box>
        </Box>
    )
}

const styles = {
  container: {
    marginInline: 'auto',
    marginTop: '2rem',
    paddingBottom: '4rem',
    alignItems: 'center'
  },
  topButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: '2rem'
  },
  inputSave: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 5,
    gap: {
      xs: 5,
      lg: 0
    }
  },
  title: {
    width: {
      xs: '100%',
      lg: '30%'
    }
  },
  saveBtn: {
    border: '1px solid black',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%',
      lg: 300
    },
    color: '#000',
    textTransform: 'uppercase',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#7B0BB0',
      color: '#FFF'
    }
  },
  steps: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: 'space-between',
    gap: {
      xs: 3,
      lg: '2.5rem'
    },
    marginBottom: '0rem'
  },
  stepsBtn: {
    border: '1px solid black',
    width: {
      xs: '100%',
      lg: 150
    },
    textTransform: 'uppercase',
    fontSize: 10,
    '&:hover': {
      backgroundColor: '#7B0BB0',
      color: '#FFF'
    },
  },
  search: {
    '& input': {
      padding: '.5em 1em',
    },
    '& fieldset': {
      borderRadius: '0 !important',
      padding: '.5em 1em',
    }
  },
  content: {
    borderRadius: '5px',
    maxWidth: '100%'
  }
}

export default SelectFeaturedFeeds
