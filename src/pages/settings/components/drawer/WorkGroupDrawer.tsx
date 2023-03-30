// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Drawer,
  Button,
  TextField,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const navData = [
  {
    value: 'selection',
    text: 'selection'
  },
  {
    value: 'latest',
    text: 'latest'
  },
  {
    value: 'original',
    text: 'original'
  },
  {
    value: 'homemade',
    text: 'homemade'
  },
  {
    value: 'hot',
    text: 'hot'
  },
  {
    value: 'local',
    text: 'local'
  },
  {
    value: 'pornstar',
    text: 'pornstar'
  },
  {
    value: 'loli',
    text: 'loli'
  },
  {
    value: 'av',
    text: 'av'
  },
  {
    value: 'animation',
    text: 'animation'
  }
]

const templateData = [
  {
    value: 'videoslider',
    text: 'videoSlider'
  },
  {
    value: 'reelslider',
    text: 'reelSlider'
  },
  {
    value: 'singlevideo',
    text: 'singleVideo'
  },
  {
    value: 'singlevideowithgrid',
    text: 'singleVideoWithGrid'
  },
  {
    value: 'singlevideolist',
    text: 'singleVideoList'
  },
  {
    value: 'grid',
    text: 'grid'
  }
]

const schema = yup.object().shape({
  title: yup.string().min(7, 'Title must be at least 7 characters').required()
})

const defaultValues = {
  title: ''
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const WorkGroupDrawer = ({ open, setOpen, header }: any) => {
  // ** State
  const [navbar, setNavbar] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  useEffect(() => {
    const workgroupNavbar = header === 'Add' ? '' : 'selection' // if add its dont have default value
    const workgroupTemplate = header === 'Add' ? '' : 'videoslider' // if add its dont have default value
    setNavbar(workgroupNavbar)
    setTemplate(workgroupTemplate)
  }, [header])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const onSubmit = (data: any) => {
    console.log('$$$', data)

    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{header} Workgroup</Typography>
        <IconButton size='small' onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Title'
                  onChange={onChange}
                  placeholder='XXXXXX'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Navbar</InputLabel>
            <Select
              fullWidth
              value={navbar}
              id='select-role'
              label='Navbar'
              labelId='role-select'
              onChange={e => setNavbar(e.target.value)}
              inputProps={{ placeholder: 'Navbar' }}
            >
              {navData.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Template</InputLabel>
            <Select
              fullWidth
              value={template}
              id='select-role'
              label='Template'
              labelId='role-select'
              onChange={e => setTemplate(e.target.value)}
              inputProps={{ placeholder: 'Template' }}
            >
              {templateData.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mb: 6 }}>
            <Button size='large' variant='contained' sx={{ mr: 3 }}>
              Select Content
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default WorkGroupDrawer
