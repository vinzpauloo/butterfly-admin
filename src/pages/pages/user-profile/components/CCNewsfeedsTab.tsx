import React from 'react'
import { Stack, Box, TextField, Typography, Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CCNewsfeedsTab = () => {
  return (
    <Stack gap={4} p={6}>
      <TextField
        value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        multiline
        fullWidth
        aria-readonly
        focused={false}
        contentEditable={false}
      />
      <Box display='flex'>
        <LocationOnIcon color='secondary'/>
        <Typography>Chengdu</Typography>
      </Box>
      <Box display='flex' gap={2}>
        <Chip label="Cute"/>
        <Chip label="Loli"/>
        <Chip label="Cosplay"/>
        <Chip label="Femboy"/>
        <Chip label="NTR"/>
      </Box>
      <Box width={355.56} height={200} bgcolor='#bfbfbf' borderRadius={1} alignSelf='center'></Box>
      <Stack flexWrap='wrap' direction='row' gap={4} justifyContent='center'>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
        <Box width={355.56} height={200} border='1px solid #bfbfbf' borderRadius={1}></Box>
      </Stack>
    </Stack>
  )
}

export default CCNewsfeedsTab