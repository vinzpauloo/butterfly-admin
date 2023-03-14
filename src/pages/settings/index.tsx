// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Typography, Button } from '@mui/material'

// ** Style Imports
import styles from './styles/indexStyles'

const WorkGroupings = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/settings/pages/workgroupings')
  }

  const [groupingTitles, setGroupingTitles] = useState([
    'Grouping Title',
    'Grouping Title',
    'Grouping Title',
    'Grouping Title',
    'Grouping Title'
  ])

  const handleAddGroupingTitle = () => {
    setGroupingTitles([...groupingTitles, 'New Grouping Title'])
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.gradient}>
        <Box sx={styles.wrapper}>
          <Typography sx={styles.title}>Work Grouping Titles</Typography>

          <Box sx={styles.btnContainer}>
            {groupingTitles.map((title, index) => (
              <Button key={index} sx={styles.button} onClick={handleClick}>
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={styles.addContainer}>
            <Button sx={styles.addBtn} onClick={handleAddGroupingTitle}>
              Add More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkGroupings
