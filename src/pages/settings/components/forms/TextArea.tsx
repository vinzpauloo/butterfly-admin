import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import Translations from '../../../../layouts/components/Translations'

interface TextAreaProps {
  title: any
}

const TextArea: React.FC<TextAreaProps> = (props) => {

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography sx={styles.title}>{props.title}</Typography>
        <TextField sx={styles.header} />
      </Box>
      <Box>
        <TextField sx={styles.content} multiline={true} minRows={20} label={<Translations text="Description"/>} />
      </Box>
      <Box sx={styles.btnContainer}>
        <Button sx={styles.drafts}><Translations text="Save as Draft" /></Button>
        <Button sx={styles.publish}><Translations text="Publish" /></Button>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    border: '1px solid black',
    borderRadius: '12px',
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 5
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: 20,
    pb: 4,
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
