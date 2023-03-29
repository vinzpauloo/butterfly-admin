// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Typography, TextField, Button } from '@mui/material'

// ** Style Imports

interface TextAreaProps {
  title: string
}

const TextArea: React.FC<TextAreaProps> = (props) => {

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

const styles = {
  container: {
    border: '1px solid black',
    height: '80dvh',
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 2
  },
  title: {
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 400,
    fontSize: 20,
    textAlign: {
      xs: 'center',
      md: 'left',
      lg: 'left'
    }
  },
  header: {
    width: {
      xs: '100%',
      md: '50%',
      lg: '50%'
    }
  },
  content: {
    width: '100%'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10
  },
  drafts: {
    backgroundColor: '#FED844',
    color: '#000',
    textTransform: 'uppercase',
    width: 160,
    fontSize: {
      xs: 10,
      lg: 14
    },
    '&:hover': {
      backgroundColor: '#9747FF',
      color: '#FFF'
    }
  },
  publish: {
    backgroundColor: '#6DD230',
    color: '#000',
    textTransform: 'uppercase',
    width: 160,
    fontSize: {
      xs: 10,
      lg: 14
    },
    '&:hover': {
      backgroundColor: '#9747FF',
      color: '#FFF'
    }
  }
}

export default TextArea
