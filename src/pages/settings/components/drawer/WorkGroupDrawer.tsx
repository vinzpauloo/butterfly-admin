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
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import WorkgroupService from '@/services/api/Workgroup'
import WorkList from '../modal/WorkList'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import TranslateString from '@/utils/TranslateString'
import Translations from '@/layouts/components/Translations'

const navData = [
  {
    value: 'selection',
    text: 'Selection'
  },
  {
    value: 'latest',
    text: 'Latest'
  },
  {
    value: 'original',
    text: 'Original'
  },
  {
    value: 'homemade',
    text: 'Homemade'
  },
  {
    value: 'hot',
    text: 'Hot'
  },
  {
    value: 'local',
    text: 'Local'
  },
  {
    value: 'pornstar',
    text: 'Pornstar'
  },
  {
    value: 'loli',
    text: 'Loli'
  },
  {
    value: 'av',
    text: 'AV'
  },
  {
    value: 'animation',
    text: 'Animation'
  }
]

const templateData = [
  {
    value: 'videoSlider',
    text: 'Video Slider (minimum 6 videos)',
    image: '/images/template/videoSlider.png'
  },
  {
    value: 'reelslider',
    text: 'Reel Slider (minimum 6 videos)',
    image: '/images/template/reelSlider.png'
  },
  {
    value: 'singleVideoWithGrid',
    text: 'Single Video With Grid (minimum 5 videos)',
    image: '/images/template/singleVideoWithGrid.png'
  },
  {
    value: 'singleVideoList',
    text: 'Single Video List (minimum 10 videos)',
    image: '/images/template/singleVideoList.png'
  },
  {
    value: 'grid',
    text: 'Grid (minimum 4 videos)',
    image: '/images/template/grid.png'
  }
]

const columns = [
  {
    flex: 0.02,
    minWidth: 70,
    field: 'thumbnail_url',
    headerName: <Translations text='Video Thumbnail' />,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomAvatar
              src={params.row.thumbnail_url}
              sx={{ borderRadius: '5px', mr: 3, width: '4.875rem', height: '3rem' }}
            />
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.02,
    minWidth: 90,
    headerName: <Translations text='Content Creator' />,
    field: 'content_creator',
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.user?.username}
      </Typography>
    )
  },
  {
    flex: 0.03,
    minWidth: 60,
    field: 'title',
    headerName: <Translations text='Title' />,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.title}
      </Typography>
    )
  }
]

const schema = yup.object().shape({
  title: yup.string().min(7, 'Title must be at least 7 characters').required()
})

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const RandomVideoPicker = (num: number, all: string[]) => {
  const choosenID: string[] = []

  while (choosenID.length !== num) {
    const pick = Math.floor(Math.random() * all.length)
    if (choosenID.includes(all[pick])) continue
    choosenID.push(all[pick])
  }

  return choosenID
}

// ** THIS DRAWER IS FOR ADD AND EDIT WORKGROUP
// ** open and setOpen -> use for triggering the show of drawer
// ** header have two possible value -> Edit and Add
// ** sectionID -> is section ID
// ** title -> to set a default value for the edit
// ** setTitle -> to reset the title
const WorkGroupDrawer = ({ open, setOpen, header, sectionID, title, setTitle }: any) => {
  // ** State
  const queryClient = useQueryClient()
  const [navbar, setNavbar] = useState<string>('selection') // ** default value
  const [template, setTemplate] = useState<string>('videoSlider') // ** default value
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [allId, setAllId] = useState([])
  const [data, setData] = useState([])
  const { getSpecificWorkgroup, putWorkgroup, getAllWorkgroup } = WorkgroupService()

  const { refetch: refetchSpecific } = useQuery({
    queryKey: ['edit-workgroup', sectionID],
    queryFn: () => getSpecificWorkgroup({ id: sectionID }),
    onSuccess: data => {
      setNavbar(data.navbar)
      setTemplate(data.template_id)
      setAllId(data.all)
    },
    enabled: header === 'Edit'
  })

  const { refetch: refetchAll, isLoading } = useQuery({
    queryKey: ['edit-allworks', sectionID, page],
    queryFn: () => getAllWorkgroup({ workgroup_id: sectionID }),
    onSuccess: data => {
      setData(data.data)
      setPageSize(data.per_page)
      setPage(data.current_page)
      setRowCount(data.total)
    },
    enabled: header === 'Edit'
  })

  // ** use to PUT or update the workgroup
  const { mutate: mutateEditWorkgroup } = useMutation(putWorkgroup, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['search-workgroup'] })
  })

  // @ts-ignore
  const layoutPattern = template => {
    switch (template) {
      case 'videoSlider':
        return RandomVideoPicker(6, allId)
      case 'reelslider':
        return RandomVideoPicker(6, allId)
      case 'singleVideoWithGrid':
        return RandomVideoPicker(5, allId)
      case 'singleVideoList':
        return RandomVideoPicker(10, allId)
      case 'grid':
        return RandomVideoPicker(4, allId)
    }
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    setOpen(false)
    reset()
    setTemplate('videoSlider')
    setNavbar('selection')
    setAllId([])
    setData([])
    setOpen(false)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const onSubmit = (data: any) => {
    // @ts-ignore
    const vid: string[] = layoutPattern(template)
    if ('singleVideoList' === template || 'singleVideoWithGrid' === template) {
      mutateEditWorkgroup({
        id: sectionID,
        data: {
          title: data.title,
          navbar: navbar,
          template_id: template,
          single: vid[0],
          multiple: vid?.slice(1)
        }
      })
    } else {
      mutateEditWorkgroup({
        id: sectionID,
        data: {
          title: data.title,
          navbar: navbar,
          template_id: template,
          single: vid[0],
          multiple: vid?.slice(1)
        }
      })
    }
    reset()
    setTemplate('videoSlider')
    setNavbar('selection')
    setData([])
    setOpen(false)
  }

  useEffect(() => {
    if (open && header === 'Edit') {
      refetchSpecific()
      refetchAll()
    }

    return () => setTitle('')
  }, [open])

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 600 } } }}
      >
        <Header>
          <Typography variant='h6'>
            {TranslateString(header)} {TranslateString('Workgroup')}
          </Typography>
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
                    label={TranslateString('Title')}
                    onChange={onChange}
                    placeholder='XXXXXX'
                    error={Boolean(errors.title)}
                  />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <>{errors.title.message}</>
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='role-select'>{TranslateString('Navbar')}</InputLabel>
              <Select
                fullWidth
                value={navbar}
                id='select-role'
                label={TranslateString('Navbar')}
                labelId='role-select'
                onChange={e => setNavbar(e.target.value)}
                inputProps={{ placeholder: 'Navbar' }}
              >
                {navData.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {TranslateString(item.text)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='role-select'>{TranslateString('Template')}</InputLabel>
              <Select
                fullWidth
                value={template}
                id='select-role'
                label={TranslateString('Template')}
                labelId='role-select'
                onChange={e => setTemplate(e.target.value)}
                inputProps={{ placeholder: 'Template' }}
              >
                {templateData.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    <Box display='flex' alignItems='center'>
                      <Image src={item.image} alt='dfs' width='24' height='24' style={{ marginRight: 10 }} />
                      {TranslateString(item.text)}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <Button
                    disabled={value.length === 0 || !!errors.title}
                    size='large'
                    variant='contained'
                    sx={{ mr: 3 }}
                    onClick={handleOpenModal}
                  >
                    {TranslateString('Select Content')}
                  </Button>
                )}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <DataGrid
                rowCount={rowCount}
                // @ts-ignore
                columns={columns}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                paginationMode='server'
                autoHeight
                pagination
                rows={data}
                loading={header === 'Edit' ? isLoading : false}
                getRowId={row => row._id}
                disableColumnMenu
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {header === 'Edit' ? (
                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                  Submit
                </Button>
              ) : null}
              <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                {TranslateString('Cancel')}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
      {modalOpen ? (
        <WorkList
          allId={allId}
          modalOpen={modalOpen}
          setAllId={setAllId}
          setModalOpen={setModalOpen}
          sectionID={sectionID}
          refetchAll={refetchAll}
          header={header}
          control={control}
          navbar={navbar}
          template={template}
          reset={reset}
          setNavbar={setNavbar}
          setTemplate={setTemplate}
          setOpen={setOpen}
        />
      ) : null}
    </>
  )
}

export default WorkGroupDrawer
