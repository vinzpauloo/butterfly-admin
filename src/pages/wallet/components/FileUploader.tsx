// ** React Imports
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Typography } from '@mui/material'

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
                  Upload Logo
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
      lg: '100%'
    },
    height: '20dvh',
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

export default FileUploaderSingle
