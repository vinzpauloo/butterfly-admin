import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

// ** Next Images
import Image from 'next/image'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

interface SuperAgentFileUploaderProps {
  onFilesChange?: (files: File[]) => void
  logo?: string
}

const SuperAgentFileUploader: React.FC<SuperAgentFileUploaderProps> = ({ onFilesChange, logo }) => {
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
      src={URL.createObjectURL(file as any) || URL.createObjectURL(logo as any)}
      style={{ objectFit: 'cover', width: '100%', height: '248px', objectPosition: '100% 20%' }}
    />
  ))

  return (
    <>
      <Box sx={{ ...styles.albumWrapper, position: 'relative' }}>
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
        {files.length > 0 ? (
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
        ) : logo ? (
          <img
            alt='edit-logo'
            className='single-file-image'
            src={logo}
            style={{ objectFit: 'cover', width: '100%', height: '248px', objectPosition: '100% 20%' }}
          />
        ) : (
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
        )}
      </Box>
    </>
  )
}

const styles = {
  //Album Container
  albumWrapper: {
    backgroundColor: (theme: any) => theme.customBflyColors.grayBG,
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    height: '256px',
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
  title: {
    // mb: '.8rem',
    textTransform: 'uppercase'
  }
}

export default SuperAgentFileUploader
