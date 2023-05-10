import React from 'react'

// ** MUI
import { Box, Typography, Button, Card, CardContent } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

type Props = {}

const NoPostsFound = (props: Props) => {
  return (
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
          <Icon icon='mdi:help-circle-outline' fontSize='2rem' />
        </CustomAvatar>
        <Typography variant='h6' sx={{ mb: 2.75 }}>
          No Posts Yet
        </Typography>
        <Typography variant='body2' sx={{ mb: 6 }}>
          Create your first post!
        </Typography>
      </Box>
  )
}

export default NoPostsFound
