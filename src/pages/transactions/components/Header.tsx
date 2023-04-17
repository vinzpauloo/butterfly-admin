import TranslateString from '@/utils/TranslateString'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {}

const data = [
  {
    value: 'site1',
    text: 'Site 1'
  },
  {
    value: 'site2',
    text: 'Site 2'
  },
  {
    value: 'site3',
    text: 'Site 3'
  },
  {
    value: 'site4',
    text: 'Site 4'
  }
]

function Header({}: Props) {
  const [superAgent, setSuperAgent] = useState('')

  return (
    <Box mb={5}>
      <Typography variant='h4' component='h4'>
        {TranslateString("Transactions")}
      </Typography>
      <Box mt={5} width={300}>
        <FormControl fullWidth size='small'>
          <InputLabel id='demo-simple-select-label'>{TranslateString("Select Super Agent")}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={superAgent}
            label='Select Super Agent'
            onChange={e => setSuperAgent(e.target.value)}
          >
            {data.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Header
