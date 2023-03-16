// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Typography, TextField, Button } from '@mui/material'

// ** Style Imports
import styles from '../../styles/textAreaStyles'

interface TextAreaProps {
  title: string
}

const TextArea: React.FC<TextAreaProps> = props => {
  return (
    <Box sx={styles.container}>
      <Box>
        <Typography sx={styles.title}>{props.title}</Typography>
        <TextField sx={styles.header} />
      </Box>

      <Box>
        <TextField sx={styles.content} multiline={true} minRows={20} label='DESCRIPTION' />
      </Box>

      <Box sx={styles.btnContainer}>
        <Button sx={styles.drafts}>Save as Drafts</Button>
        <Button sx={styles.publish}>Publish</Button>
      </Box>
    </Box>
  )
}

export default TextArea
