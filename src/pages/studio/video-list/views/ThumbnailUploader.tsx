// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

const ImgThumb = styled('img')(({ theme }) => ({
    objectFit : 'cover',
    width: '100%',
    height: '200px'
}))

type ThumbsParams = {
    thumb : string
}

const ThumbnailUploader = ({thumb} : ThumbsParams) => {
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
      let thumbnailFile = acceptedFiles.map((file: File) => Object.assign(file))
    }
  })

  const img = files.map((file: FileProp) => (
    <img style={{ width: '100%',height:'200px', objectFit:'cover' }} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 450 } : {}}>
      <input {...getInputProps()} />
        <Box sx={{ border:'1px solid #333'}}>
            {
                (thumb && files.length == 0) ? <ImgThumb src={thumb} alt="" /> :
                img
            }
            
        </Box>
    </Box>
  )
}

export default ThumbnailUploader
