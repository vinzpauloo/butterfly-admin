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

// ** Style Imports
import styles from '../../styles/selectFeedsStyles'

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
        title: 'Videos with Photos',
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

    return (
        <Box sx={styles.container}>
            <Box sx={styles.topButtons}>
                <Box sx={styles.inputSave}>
                    <TextField sx={styles.title} label="FEED FEATURED TITLE (TYPE HERE)" />
                    <Button
                        sx={styles.saveBtn}
                        onClick={handleBtnClick}
                    >
                        Save
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
                                onClick={() => { setActiveTab(index) }} >{step.title}
                            </Button>
                        )
                    })}
                    <TextField
                        sx={styles.search}
                        variant='outlined'
                        placeholder='Search'
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

export default SelectFeaturedFeeds