// ** React imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Next Imports
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
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** TanStack Query
import { useMutation, useQuery } from '@tanstack/react-query'

// ** API Hooks/Services
import { AlbumService } from '@/services/api/AlbumService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

interface FormValues {
  title: string
  cover_photo: File | null
  photo: File[]
  delete_id: File[]
}

const schema = yup.object().shape({})

interface FileProp {
  name: string
  type: string
  size: number
}

interface FileUploaderSingleProps {
  onFilesChange?: (files: File[]) => void
  albumData: any
}

const FileUploaderSingle: React.FC<FileUploaderSingleProps> = ({ onFilesChange, albumData }) => {
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
        {files.length > 0 ||
          (albumData?.cover.cover_photo && (
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
          ))}
        {files.length === 0 && !albumData?.cover.cover_photo ? (
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
            {files.length > 0 ? (
              img
            ) : (
              <img src={FILE_SERVER_URL + albumData?.cover.cover_photo} width='100%' height='100%' alt='test' />
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

interface FileUploaderMultipleProps {
  onFilesChange?: (files: File[]) => void
  files: File[]
  albumData: any
  onDeletedPhotos: (deletedPhotos: any[]) => void
  setFormValue: any
}

// MULTIPLE FILE UPLOAD START...
const FileUploaderMultiple: React.FC<FileUploaderMultipleProps> = ({
  onFilesChange,
  files,
  albumData,
  onDeletedPhotos
}) => {
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

  const responseAlbumData = albumData?.album.map((item: any) => {
    return item?.photo
  })

  const [responseMultiple, setResponseMultiple] = useState<any[]>([])
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<any[]>([])

  useEffect(() => {
    setResponseMultiple(albumData?.album)
  }, [albumData])

  const handlePhotoDelete = (photoIdToDelete: string) => {
    setDeletedPhotoIds(prevDeletedPhotoIds => {
      if (!prevDeletedPhotoIds.includes(photoIdToDelete)) {
        const updatedDeletedPhotoIds = [...prevDeletedPhotoIds, photoIdToDelete]

        onDeletedPhotos(updatedDeletedPhotoIds)

        return updatedDeletedPhotoIds
      }

      return prevDeletedPhotoIds
    })

    const updatedResponseMultiple = responseMultiple.filter((photo: any) => photo.photo_id !== photoIdToDelete)
    setResponseMultiple(updatedResponseMultiple)
  }

  useEffect(() => {
    onDeletedPhotos(deletedPhotoIds)
  }, [deletedPhotoIds])

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
          {responseAlbumData && (
            <Box sx={{ mt: 5 }}>
              <Typography variant='h6'>Existing Photos:</Typography>
            </Box>
          )}
          {responseMultiple &&
            responseMultiple.map((item: any, index: any) => {
              return (
                <Box key={index} sx={{ display: 'flex' }}>
                  <img src={FILE_SERVER_URL + item.photo} alt='test2' width='250' height='250' />
                  <IconButton onClick={() => handlePhotoDelete(item.photo_id)}>
                    <Icon icon='mdi:close' fontSize={20} />
                  </IconButton>
                </Box>
              )
            })}
        </Box>
      </Box>
    </Fragment>
  )
}

interface AlbumDataProps {
  title: string
}

const EditAlbum = () => {
  const router = useRouter()
  const { query } = router
  const albumId = Object.keys(query)

  const { handleError } = useErrorHandling()

  // Use albumId[0] to get the specific id

  useQuery({
    queryKey: ['specificAlbum', albumId[0]],
    queryFn: () =>
      getSpecificUserAlbum({
        data: {
          _id: albumId[0]
        }
      }),
    onSuccess: (data: any) => {
      setAlbumData(data)
    },
    onError: (e: any) => {
      handleError(e, `getSpecificAlbum() album/upload/EditAlbum.tsx`)
    }
  })

  /* States */
  const [uploadedFiles] = useState<File[]>([])
  const [albumData, setAlbumData] = useState<AlbumDataProps | null>(null)

  // ** Navigate to previous page
  const handleCancelButton = () => {
    router.back()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (albumData) {
      setValue(`title`, `${albumData?.title}`)
      setFormValue(prevState => ({
        ...prevState,
        title: albumData?.title
      }))
    }
  }, [albumData])

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCoverPhotoChange = (files: File[]) => {
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (files[0].size > maxFileSize) {
      alert('Error: Cover photo size exceeds the 2MB limit.')

      return
    }

    setFormValue({ ...formValue, cover_photo: files[0] })
  }

  const handleMultiplePhotoChange = (files: File[]) => {
    setFormValue({ ...formValue, photo: files })
  }

  const handleDeletedPhotos = (deletedPhotoIds: any[]) => {
    setFormValue({ ...formValue, delete_id: deletedPhotoIds })
  }

  const [formValue, setFormValue] = useState<FormValues>({
    title: '',
    cover_photo: null,
    photo: [],
    delete_id: []
  })

  const { editAlbum, getSpecificUserAlbum } = AlbumService()
  const mutation = useMutation(async (data: { _id: any; data: any }) => {
    const response = await editAlbum(data._id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  const handleFormSubmit = async () => {
    try {
      await mutation.mutateAsync({
        _id: albumId[0],
        data: { ...formValue, _method: 'put' }
      })

      setTimeout(() => {
        router.push(`/studio/album/album-list`)
      }, 1000)
    } catch (e: any) {
      handleError(e, `editAlbum() album/upload/EditAlbum.tsx`)
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
          Edit New Album
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
            onChange={handleFormInputChange}
            name='title'
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>

        {/* UPLOAD CONTAINER */}
        <Box sx={{ ...styles.uploadWrapper }}>
          {/* ALBUM COVER CONTAINER */}
          <FileUploaderSingle onFilesChange={handleCoverPhotoChange} albumData={albumData} />

          {/* MULTIPLE UPLOAD CONTAINER */}
          <Box sx={{ ...styles.multiUploadDragAndDropWrapper }}>
            <FileUploaderMultiple
              onFilesChange={handleMultiplePhotoChange}
              files={uploadedFiles}
              albumData={albumData}
              onDeletedPhotos={handleDeletedPhotos}
              setFormValue={setFormValue}
            />
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

export default EditAlbum
