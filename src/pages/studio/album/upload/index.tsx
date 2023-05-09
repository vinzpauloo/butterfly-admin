// ** React imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Next Images
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Typography, TextField, Button, List, ListItem, IconButton } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** TanStack Query
import { useMutation } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { AlbumService } from '@/services/api/AlbumService'
import { captureError } from '@/services/Sentry'

interface FormValues {
  title: string
  cover_photo: File | null
  photo: File[]
}

const schema = yup.object().shape({
  title: yup.string().required()
})

interface FileProp {
  name: string
  type: string
  size: number
}

const FileUploaderSingle = ({ onFilesChange }: { onFilesChange?: (files: File[]) => void }) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      if (onFilesChange) {
        onFilesChange(acceptedFiles)
      }
    }
  })

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  ))

  return (
    <>
      <Box sx={{ ...styles.albumWrapper, position: 'relative' }}>
        {files.length > 0 && (
          <Box
            {...getRootProps({ className: 'dropzone' })}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              zIndex: 1
            }}
          >
            <input {...getInputProps()} />
            <Typography sx={{ color: '#fff', fontSize: 14 }}>Click to change image</Typography>
          </Box>
        )}
        {files.length === 0 ? (
          <Box {...getRootProps({ className: 'dropzone' })} sx={{ ...styles.albumContent }}>
            <input {...getInputProps()} />

            <Box
              sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: ['center', 'center', 'inherit'],
                  alignItems: 'center'
                }}
              >
                <Image src='/images/studio/butterfly_file_upload.png' alt='SINGLE FILE LOAD' width={100} height={100} />
                <Typography sx={{ ...styles.title }} variant='h6'>
                  Album Cover
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Drag Files here or click to upload.</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              ...styles.albumWrapper,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            {img}
          </Box>
        )}
      </Box>
    </>
  )
}

// MULTIPLE FILE UPLOAD START...
const FileUploaderMultiple = ({ onFilesChange, files }: { onFilesChange?: (files: File[]) => void; files: File[] }) => {
  // ** State
  const [localFiles, setLocalFiles] = useState<File[]>(files)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setLocalFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      if (onFilesChange) {
        onFilesChange(acceptedFiles)
      }
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={200} height={200} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = localFiles.filter((i: FileProp) => i.name !== file.name)
    setLocalFiles([...filtered])
    if (onFilesChange) {
      onFilesChange(filtered)
    }
  }

  const fileList = localFiles.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setLocalFiles([])
  }

  return (
    <Fragment>
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ ...styles.multiUpload }}>
          <Image src='/images/studio/butterfly_file_upload.png' width={100} height={100} alt='Multiple Upload' />
          <Typography sx={{ ...styles.title }} variant='h6'>
            Multiple Upload
          </Typography>
          <Typography sx={{ fontSize: 14 }}>Drag Files here or click to upload.</Typography>
        </Box>
      </Box>
      <Box sx={{ ...styles.photoAlbumWrapper }}>
        <Box sx={{ ...styles.scrollFunc }}>
          {localFiles.length ? (
            <Fragment>
              <List>{fileList}</List>
              <div className='buttons'>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
              </div>
            </Fragment>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}

const UploadAlbum = () => {
  const router = useRouter()
  const currentLocation = router.asPath

  /* States */
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // ** Navigate to previous page
  const handleCancelButton = () => {
    router.back()
  }

  const [fileName, setFileName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target

    if (name === 'logo' && files) {
      const file = files[0]
      if (file) {
        setFileName(file.name)
        setFormValue(prevState => ({
          ...prevState,
          [name]: file
        }))
      }
    } else {
      setFormValue(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleCoverPhotoChange = (files: File[]) => {
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (files[0].size > maxFileSize) {
      alert('Error: Cover photo size exceeds the 2MB limit.')

      return
    }

    setFormValue({ ...formValue, cover_photo: files[0] })
    console.log(`handleCOVERCHANGE`, formValue)
  }

  const handleMultiplePhotoChange = (files: File[]) => {
    setFormValue({ ...formValue, photo: files })
    console.log(`handleMultiplePhoto`, formValue)
  }

  const [formValue, setFormValue] = useState<FormValues>({
    title: '',
    cover_photo: null,
    photo: []
  })

  const { postAlbum } = AlbumService()
  const mutation = useMutation(postAlbum)

  const handleFormSubmit = async () => {
    console.log(formValue)

    const albumMultiPhotos: any = {
      data: formValue
    }

    try {
      await mutation.mutateAsync(albumMultiPhotos)

      setTimeout(() => {
        router.push(`/studio/album/album-list`)
      }, 1000)
    } catch (e: any) {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value} queryFn: postAlbum()`)
        })
      }
    }
  }

  useEffect(() => {
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      photo: uploadedFiles
    }))
  }, [uploadedFiles])

  return (
    <BasicCard sx={{ ...styles.container }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          sx={{ ...styles.title, mb: 5, textAlign: 'center' }}
          variant='h5'
          color={theme => theme.customBflyColors.primaryTextContrast}
        >
          Create New Album
        </Typography>
        <Box sx={{ ...styles.albumTitleWrapper }}>
          <Typography sx={{ ...styles.title }} variant='h6' color={theme => theme.customBflyColors.primaryTextContrast}>
            Album Title
          </Typography>
          <TextField
            label='Title'
            variant='outlined'
            sx={{ ...styles.titleInput2 }}
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            value={formValue.title}
            onChange={handleFormInputChange}
            name='title'
          />
        </Box>

        {/* UPLOAD CONTAINER */}
        <Box sx={{ ...styles.uploadWrapper }}>
          {/* ALBUM COVER CONTAINER */}
          <FileUploaderSingle onFilesChange={handleCoverPhotoChange} />

          {/* MULTIPLE UPLOAD CONTAINER */}
          <Box sx={{ ...styles.multiUploadDragAndDropWrapper }}>
            <FileUploaderMultiple onFilesChange={handleMultiplePhotoChange} files={uploadedFiles} />
          </Box>
        </Box>

        {/* BUTTON CONTAINER */}
        <Box sx={{ ...styles.btnWrapper }}>
          <Box>
            <Button sx={{ ...styles.buttons }} type='button' onClick={handleCancelButton}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button sx={{ ...styles.buttons }} type='submit'>
              Continue
            </Button>
          </Box>
        </Box>
      </form>
    </BasicCard>
  )
}

const styles = {
  container: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    paddingTop: '0',
    '& .MuiCardContent-root': {
      paddingTop: '1rem'
    }
  },
  albumTitleWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    alignItems: {
      xs: '',
      sm: '',
      md: '',
      lg: 'center'
    },
    gap: 5
  },
  title: {
    // mb: '.8rem',
    textTransform: 'uppercase'
  },
  titleInput: {
    width: {
      xs: '100%',
      sm: '100%',
      lg: '50%'
    }
  },
  titleInput2: {
    backgroundColor: (theme: any) => theme.customBflyColors.primaryTextContrast,
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none'
    },
    width: { xs: '100%', lg: '38%' }
  },

  // Upload Container
  uploadWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      lg: 'row'
    },
    gap: 5,
    mt: 5
  },

  //Album Container
  albumWrapper: {
    backgroundColor: (theme: any) => theme.customBflyColors.grayBG,
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '50dvw'
    },
    height: '60dvh',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center'
  },
  albumImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  albumContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },

  // Multiple Upload and Drag and Drop
  multiUploadDragAndDropWrapper: {
    backgroundColor: (theme: any) => theme.customBflyColors.grayBG,
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '50dvw'
    },
    height: '60dvh',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  multiUploadWrapper: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid black',
    gap: 5
  },
  multiUpload: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  photoAlbumWrapper: {
    width: '100%',
    height: '50%',
    padding: 2
  },
  scrollFunc: {
    overflowY: 'auto',
    height: '100%',
    width: '100%',
    padding: 2
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 15
  },

  // Button Container
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    mt: 5,
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    }
  },
  buttons: {
    color: (theme: any) => theme.customBflyColors.alwaysPrimary,
    backgroundColor: (theme: any) => theme.palette.common.white,
    width: 180,
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: (theme: any) => theme.palette.primary.main,
      color: (theme: any) => theme.palette.common.white
    }
  }
}

export default UploadAlbum
