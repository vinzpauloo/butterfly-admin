// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Grid, Typography, Button } from '@mui/material'

// ** Style Imports
import { styles } from '../styles/advertisementStyles'
import AdvertisementModal from '../components/modal/AdvertisementModal'

type GridContent = {
    title: string,
}

const GridContent = (props: GridContent) => {

    const [openModal, setOpenModal] = useState(false)

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
            <Box sx={styles.titleWrapper}>
                <Typography sx={styles.title}>{props.title}</Typography>
            </Box>
            <Box sx={styles.imgWrapper}>
                <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='template icon' />
            </Box>
            <Button sx={styles.uploadBtn} onClick={handleOpen}>Upload</Button>
            <AdvertisementModal isOpen={openModal} onClose={handleClose} adTitle={props.title} />
        </Grid >
    )
}

const Advertisements = () => {

    const adTitles = [
        'Pre-Loading Screen Ad',
        'Carousel (Slider) Ad',
        'Single Video Ad (Grid)',
        'Pop Up Ad',
        'Category Ad (Under Video)'
    ];

    return (
        <Box >
            <Typography sx={styles.ads}>Advertisements</Typography>
            <Grid gap={5} sx={styles.gridContainer}>
                {adTitles.map((title, index) => <GridContent title={title} key={index} />)}
            </Grid>
        </Box>
    )
}

export default Advertisements
