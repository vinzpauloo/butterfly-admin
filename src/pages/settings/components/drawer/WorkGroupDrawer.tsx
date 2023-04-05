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
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'

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
    value: 'videoSlider',
    text: 'videoSlider',
    image: '/images/template/videoSlider.png'
  },
  {
    value: 'reelslider',
    text: 'reelSlider',
    image: '/images/template/reelSlider.png'
  },
  {
    value: 'singleVideoWithGrid',
    text: 'singleVideoWithGrid',
    image: '/images/template/singleVideoWithGrid.png'
  },
  {
    value: 'singleVideoList',
    text: 'singleVideoList',
    image: '/images/template/singleVideoList.png'
  },
  {
    value: 'grid',
    text: 'grid',
    image: '/images/template/grid.png'
  }
]

const columns: GridColumns = [
  {
    flex: 0.02,
    minWidth: 70,
    field: 'thumbnail_url',
    headerName: 'Video Thumbnail',
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
    headerName: 'Content Creator',
    field: 'content_creator',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.user.username}
      </Typography>
    )
  },
  {
    flex: 0.03,
    minWidth: 60,
    field: 'title',
    headerName: 'Title',
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
  const [navbar, setNavbar] = useState<string>('selection') // ** default value
  const [template, setTemplate] = useState<string>('videoSlider') // ** default value
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideosInModal, setSelectedInModal] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [allId, setAllId] = useState([])
  const [hasSave, setHasSave] = useState(true)
  const { postWorkgroup, getSpecificWorkgroup, putWorkgroup, getAllWorkgroup } = WorkgroupService()

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
      setSelectedInModal(data.data)
      setPageSize(data.per_page)
      setPage(data.current_page)
      setRowCount(data.total)
    },
    enabled: header === 'Edit' && hasSave
  })

  // ** use to POST new workgroup
  const { mutate: mutateWorkgroup } = useMutation(postWorkgroup)

  // ** use to PUT or update the workgroup
  const { mutate: mutateEditWorkgroup } = useMutation(putWorkgroup)

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
    setSelectedInModal([])
    setOpen(false)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handlePageChange = (newPage: number) => {
    console.log('@@@', newPage)

    setPage(newPage + 1)
    // if(!hasSave){
    //   const first = (newPage + 1) * 10;
    //   const last = (newPage + 2) * 10;

    //   setSelectedInModal(prev => {
    //     const nextPageData = prev.slice(first, last + 1)

    //     return nextPageData
    //   })
    // }
  }

  const onSubmit = (data: any) => {
    // @ts-ignore
    const vid: string[] = layoutPattern(template)
    if (header === 'Add') {
      if ('singleVideoList' === template || 'singleVideoWithGrid' === template) {
        mutateWorkgroup({
          title: data.title,
          navbar: navbar,
          template_id: template,
          single: vid[0],
          multiple: vid?.slice(1),
          all: allId
        })
      } else {
        mutateWorkgroup({
          title: data.title,
          navbar: navbar,
          template_id: template,
          multiple: vid,
          all: allId
        })
      }
      reset()
      setTemplate('videoSlider')
      setNavbar('selection')
      setAllId([])
      setSelectedInModal([])
      setOpen(false)
    } else {
      if ('singleVideoList' === template || 'singleVideoWithGrid' === template) {
        mutateEditWorkgroup({
          id: sectionID,
          data: {
            title: data.title,
            navbar: navbar,
            template_id: template,
            single: vid[0],
            multiple: vid?.slice(1),
            all: allId
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
            multiple: vid?.slice(1),
            all: allId
          }
        })
      }
      reset()
      setTemplate('videoSlider')
      setNavbar('selection')
      setAllId([])
      setSelectedInModal([])
      setOpen(false)
    }
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
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <>{errors.title.message}</>
                </FormHelperText>
              )}
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
                    <Box display='flex' alignItems='center'>
                      <Image src={item.image} alt='dfs' width='24' height='24' style={{ marginRight: 10 }} />
                      {item.text}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 6 }}>
              <Button size='large' variant='contained' sx={{ mr: 3 }} onClick={handleOpenModal}>
                Select Content
              </Button>
            </Box>
            <Box sx={{ mb: 6 }}>
              <DataGrid
                rowCount={rowCount}
                columns={columns}
                pageSize={10}
                onPageChange={handlePageChange}
                paginationMode='server'
                autoHeight
                pagination
                rows={selectedVideosInModal}
                loading={header === 'Edit' && hasSave ? isLoading : false}
                getRowId={row => row._id}
                disableColumnMenu
              />
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
      {modalOpen ? (
        <WorkList
          allId={allId}
          modalOpen={modalOpen}
          setAllId={setAllId}
          setHasSave={setHasSave}
          setPage={setPage}
          setPageSize={setPageSize}
          setRowCount={setRowCount}
          setModalOpen={setModalOpen}
          setSelectedInModal={setSelectedInModal}
        />
      ) : null}
    </>
  )
}

export default WorkGroupDrawer
