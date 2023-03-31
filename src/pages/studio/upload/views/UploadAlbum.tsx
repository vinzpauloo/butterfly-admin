// ** React imports
import React, { Fragment, useEffect, useState, SyntheticEvent } from 'react'

// ** Next Images
import Image from 'next/image'

// ** MUI Imports
import { Box, Typography, TextField, ListItem, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

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

//* Context Import
import { StudioContext, DisplayPage } from '..'

// Styled components
const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}))

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
}

type SortablePhotoProps = RenderPhotoProps<SortablePhoto>

const PhotoFrame = React.memo(
  React.forwardRef<HTMLDivElement, PhotoFrameProps>((props, ref) => {
    const { layoutOptions, imageProps, overlay, active, insertPosition, attributes, listeners } = props
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
      </div>
    )
  })
)
PhotoFrame.displayName = 'PhotoFrame'

function SortablePhotoFrame(props: SortablePhotoProps & { activeIndex?: number }) {
  const { photo, activeIndex } = props
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
      {...props}
    />
  )
}

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      style={{ maxWidth: '500px', maxHeight: '60dvh' }}
    />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 450 } : {}}>
      <input {...getInputProps()} />
      {files.length === 0 ? (
        <Box sx={{ ...styles.albumContent }}>
          <Image src='/images/studio/butterfly_file_upload.png' alt='SINGLE FILE LOAD' width={100} height={100} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: ['center', 'center', 'inherit'],
              alignItems: 'center'
            }}
          >
            <Typography sx={{ ...styles.title }} variant='h6'>
              Album Cover
            </Typography>
            <Typography sx={{ fontSize: 14 }}>Drag Files here or click to upload.</Typography>
          </Box>
        </Box>
      ) : (
        <Box>{img}</Box>
      )}
    </Box>
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

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={100} height={100} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
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

  // const handleLinkClick = (event: SyntheticEvent) => {
  //   event.preventDefault()
  // }

  // const handleRemoveAllFiles = () => {
  //   setFiles([])
  // }

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

const UploadAlbum = () => {
  /* States */
  const studioContext = React.useContext(StudioContext)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [photos, setPhotos] = useState<SortablePhoto[]>([])

  const handleFilesChange = (fileList: File[]) => {
    setUploadedFiles(fileList)
  }

  // ** Navigate to previous page
  const handleCancelButton = () => {
    studioContext?.setDisplayPage(DisplayPage.MainPage)
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

      return <SortablePhotoFrame activeIndex={activeIndex} {...props} />
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

  return (
    <BasicCard sx={{ ...styles.container }}>
      <Box>
        <Typography sx={{ ...styles.title }} variant='h6' color={theme => theme.customBflyColors.primaryTextContrast}>
          Album Title
        </Typography>
        <form>
          <CustomTextField sx={{ ...styles.titleInput }} id='title' placeholder='Title' type='text' />
        </form>
      </Box>

      {/* UPLOAD CONTAINER */}
      <Box sx={{ ...styles.uploadWrapper }}>
        {/* ALBUM COVER CONTAINER */}
        <Box sx={{ ...styles.albumWrapper }}>
          <FileUploaderSingle />
        </Box>

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
                      <PhotoAlbum photos={photos} layout='rows' spacing={10} padding={5} renderPhoto={renderPhoto} />
                    </div>
                  </SortableContext>
                  <DragOverlay>{activeId && <PhotoFrame overlay {...renderedPhotos.current[activeId]} />}</DragOverlay>
                </DndContext>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* BUTTON CONTAINER */}
      <Box sx={{ ...styles.btnWrapper }}>
        <Box>
          <CustomButton sx={{ ...styles.buttons }} onClick={handleCancelButton}>
            Cancel
          </CustomButton>
        </Box>
        <Box>
          <CustomButton sx={{ ...styles.buttons }} onClick={handleCancelButton}>
            Continue
          </CustomButton>
        </Box>
      </Box>
    </BasicCard>
  )
}

const styles = {
  container: {
    width: {
      xs: '100%',
      sm: '85%',
      md: '85%',
      lg: '85%'
    },
    paddingTop: '0',
    '& .MuiCardContent-root': {
      paddingTop: '1rem'
    }
  },
  title: {
    mb: '.8rem',
    textTransform: 'uppercase'
  },
  titleInput: {
    width: {
      xs: '100%',
      sm: '100%',
      lg: '45%'
    }
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
    width: 150
  }
}

export default UploadAlbum
