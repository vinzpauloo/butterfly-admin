// ** React imports
import React, { Fragment, useEffect, useCallback, useState, SyntheticEvent } from 'react'

// ** Next Images
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Typography, TextField, ListItem, IconButton, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'
import { PhotoAlbum, Photo, RenderPhotoProps } from 'react-photo-album'
import clsx from 'clsx'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* Context Import
import { StudioContext, DisplayPage } from '../../upload'

// Styled components
const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}))

// ** TanStack Query
import { useMutation, useQueryClient, useQueries, QueryClient } from '@tanstack/react-query'
import { AlbumService } from '@/services/api/AlbumService'

// import { useDebouncedCallback } from 'use-debounce'

interface FormValues {
  title: string
  cover_photo: File | null
  photos: File[]
}

const schema = yup.object().shape({
  title: yup.string().required()
  // cover_photo: yup.mixed().required()
  // photos: yup.array().of(yup.mixed().required())
})

interface FileProp {
  name: string
  type: string
  size: number
}
interface SortablePhoto extends Photo {
  id: string // @dnd-kit requires string 'id' on sortable elements
}

type PhotoFrameProps = SortablePhotoProps & {
  overlay?: boolean
  active?: boolean
  insertPosition?: 'before' | 'after'
  attributes?: Partial<React.HTMLAttributes<HTMLDivElement>>
  listeners?: Partial<React.HTMLAttributes<HTMLDivElement>>
  onRemove?: (id: string) => void
}

type SortablePhotoProps = RenderPhotoProps<SortablePhoto> & {
  onRemove?: (id: string) => void
}

const PhotoFrame = React.memo(
  React.forwardRef<HTMLDivElement, PhotoFrameProps>((props, ref) => {
    const { layoutOptions, imageProps, photo, overlay, active, insertPosition, attributes, listeners, onRemove } = props
    const { alt, style, ...restImageProps } = imageProps

    return (
      <div
        ref={ref}
        style={{
          width: overlay ? `calc(100% - ${2 * layoutOptions.padding}px)` : style.width,
          padding: style.padding,
          marginBottom: style.marginBottom
        }}
        className={clsx('photo-frame', {
          overlay: overlay,
          active: active,
          insertBefore: insertPosition === 'before',
          insertAfter: insertPosition === 'after'
        })}
        {...attributes}
        {...listeners}
      >
        {onRemove && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 'auto'
              }}
            >
              <button
                onClick={() => onRemove && onRemove(photo.id)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 5
                }}
              >
                X
              </button>
              <img
                alt={alt}
                style={{
                  ...style,
                  width: '100%',
                  height: 'auto',
                  padding: 0,
                  marginBottom: 0
                }}
                {...restImageProps}
              />
            </Box>
          </Box>
        )}
      </div>
    )
  })
)

PhotoFrame.displayName = 'PhotoFrame'

function SortablePhotoFrame(props: SortablePhotoProps & { activeIndex?: number }) {
  const { photo, activeIndex, onRemove } = props
  const { attributes, listeners, isDragging, index, over, setNodeRef } = useSortable({ id: photo.id })

  return (
    <PhotoFrame
      ref={setNodeRef}
      active={isDragging}
      insertPosition={
        activeIndex !== undefined && over?.id === photo.id && !isDragging
          ? index > activeIndex
            ? 'after'
            : 'before'
          : undefined
      }
      aria-label='sortable image'
      attributes={attributes}
      listeners={listeners}
      onRemove={onRemove}
      {...props}
    />
  )
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
const FileUploaderMultiple = ({ onFilesChange }: any) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files)
    }
  }, [files, onFilesChange])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map((file: File) => Object.assign(file))])
    }
  })

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
    </Fragment>
  )
}

const AddAlbumTest = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  /* States */
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [photos, setPhotos] = useState<SortablePhoto[]>([])

  // ** Navigate to previous page
  const handleCancelButton = () => {
    router.back()
  }

  const renderedPhotos = React.useRef<{ [key: string]: SortablePhotoProps }>({})
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)
  const activeIndex = activeId ? photos.findIndex(photo => photo.id === activeId) : undefined

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = React.useCallback(({ active }: DragStartEvent) => setActiveId(active.id), [])

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setPhotos(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  const renderPhoto = React.useCallback(
    (props: SortablePhotoProps) => {
      // capture rendered photos for future use in DragOverlay
      renderedPhotos.current[props.photo.id] = props

      return (
        <SortablePhotoFrame
          activeIndex={activeIndex}
          onRemove={id => {
            setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id))
          }}
          {...props}
        />
      )
    },
    [activeIndex]
  )

  useEffect(() => {
    setPhotos(
      uploadedFiles.map((file: File) => ({
        ...file,
        id: uuidv4(),
        src: URL.createObjectURL(file as any),
        width: 1,
        height: 1
      }))
    )
  }, [uploadedFiles])

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

  const handleFilesChange = useCallback((fileList: File[]) => {
    setUploadedFiles(fileList)
    console.log(uploadedFiles)
    setFormValue(prevFormValue => ({ ...prevFormValue, photos: fileList }))
  }, [])

  const [formValue, setFormValue] = useState<FormValues>({
    title: '',
    cover_photo: null,
    photos: []
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
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

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

          {/* MULTIPLE UPLOAD and Drag & Drop CONTAINER */}
          <Box sx={{ ...styles.multiUploadDragAndDropWrapper }}>
            <Box sx={{ ...styles.multiUploadWrapper }}>
              <FileUploaderMultiple onFilesChange={handleFilesChange} />
            </Box>

            {/* SCROLLABLE PHOTO ALBUM */}
            <Box sx={{ ...styles.photoAlbumWrapper }}>
              <Box sx={{ ...styles.scrollFunc }}>
                {photos.length === 0 ? (
                  <Box sx={{ ...styles.placeholder }}>
                    <Image src='/images/studio/thumbnail.png' width={100} height={100} alt='' />
                    <Typography textTransform='uppercase' variant='h6'>
                      Gallery
                    </Typography>
                    <Typography>No photos uploaded.</Typography>
                  </Box>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={photos}>
                      <div style={{ margin: 30 }}>
                        <PhotoAlbum
                          photos={photos}
                          layout='rows'
                          spacing={10}
                          padding={5}
                          renderPhoto={photoProps =>
                            renderPhoto({
                              ...photoProps,
                              onRemove: id => {
                                setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id))
                              }
                            })
                          }
                        />
                      </div>
                    </SortableContext>
                    <DragOverlay>
                      {activeId && (
                        <PhotoFrame
                          overlay
                          {...renderedPhotos.current[activeId]}
                          onRemove={id => {
                            setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id))
                          }}
                        />
                      )}
                    </DragOverlay>
                  </DndContext>
                )}
              </Box>
            </Box>
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

export default AddAlbumTest
