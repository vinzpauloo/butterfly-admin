import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography, Button, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { convertToRaw } from 'draft-js'
import { EditorProps } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import SitesService from '@/services/api/SitesService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// NEED TO RENDER EDITOR PROPERLY
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })

type Props = {
  title: string
  editorState: any
  setEditorState: any
  isLoading: boolean
  selectedSite: number
  setSelectedSite: Dispatch<SetStateAction<number>>
  selectedLanguage: string
  setSelectedLanguage: Dispatch<SetStateAction<string>>
  sitesList: any[]
}

const EditorContainer = (props: Props) => {
  const { title, editorState, setEditorState, isLoading, selectedSite, setSelectedSite, selectedLanguage, setSelectedLanguage, sitesList } = props
  const { handleError, getErrorResponse } = useErrorHandling()

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const { updateSiteOtherDetails } = SitesService()
  const { mutate: mutateToS, isLoading: updatingToS } = useMutation(updateSiteOtherDetails, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['termsOfService']
      })
    },
    onError: (e: any) => {
      handleError(e, `updateSiteOtherDetails() EditorContainer of Terms Of Service`)
    }
  })

  const { mutate: mutatePolicy, isLoading: updatingPolicy } = useMutation(updateSiteOtherDetails, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['privacyPolicy']
      })
    },
    onError: (e: any) => {
      handleError(e, `updateSiteOtherDetails() EditorContainer of Privacy Policy`)
    }
  })

  const publish = () => {
    const contentState = editorState.getCurrentContent()
    const rawHtml = draftToHtml(convertToRaw(contentState))

    if (title === 'Terms of Service') {
      mutateToS({
        data: {
          provisions: rawHtml,
          _method: 'put'
        }
      })
    }

    if (title === 'Privacy Policy') {
      mutatePolicy({
        data: {
          policy: rawHtml,
          _method: 'put'
        }
      })
    }
  }

  const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'link'],
    inline: {
      inDropdown: false,
      options: ['bold', 'italic', 'underline', 'strikethrough']
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Code']
    },
    list: {
      inDropdown: true,
      options: ['unordered', 'ordered']
    },
    textAlign: {
      inDropdown: true,
      options: ['left', 'center', 'right']
    }
  }

  const isBeingLoadedOrUpdated = isLoading || updatingToS || updatingPolicy

  return (
    <Box sx={styles.container}>
      {isBeingLoadedOrUpdated ? <CircularProgress sx={styles.loaderStyle} /> : undefined}
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Stack direction='row' gap={4}>
          <Box sx={{ width: 200 }}>
            <InputLabel>Site</InputLabel>
            <Select
              size='small' fullWidth value={selectedSite.toString()}
              onChange={(event: SelectChangeEvent) => setSelectedSite(Number(event.target.value))}
            >
              <MenuItem  value={0}>Default</MenuItem>
              {sitesList.map(item =>
                <MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>
              )}
            </Select>
          </Box>
          <Box sx={{ width: 200 }}>
            <InputLabel>Language</InputLabel>
            <Select
              size='small' fullWidth value={selectedLanguage}
              onChange={(event: SelectChangeEvent) => setSelectedLanguage(event.target.value)}
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='zh_cn'>中国語</MenuItem>
            </Select>
          </Box>
        </Stack>
      </Box>
      <Box>
        <Editor
          readOnly={isBeingLoadedOrUpdated}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperStyle={isBeingLoadedOrUpdated ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          editorStyle={styles.editor}
          toolbar={toolbar}
        />
      </Box>
      {getErrorResponse(12)}
      <Box sx={styles.btnContainer}>
        <Button sx={styles.publish} variant='contained' disabled={isLoading} color='success' onClick={publish}>
          Publish
        </Button>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    border: '1px solid black',
    borderRadius: '12px',
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 5,
    position: 'relative'
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: 20,
    pb: 4,
    textAlign: {
      xs: 'center',
      md: 'center',
      lg: 'center'
    }
  },
  header: {
    width: {
      xs: '100%',
      md: '50%',
      lg: '50%'
    }
  },
  content: {
    width: '100%'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  publish: {
    textTransform: 'uppercase',
    width: 160,
    fontSize: {
      xs: 10,
      lg: 14
    }
  },
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  editor: {
    outline: '1px solid gray',
    height: 500,
    paddingInline: 12
  }
}

export default EditorContainer
