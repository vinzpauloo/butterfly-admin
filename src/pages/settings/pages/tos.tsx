// ** React Imports
import React, { useState } from 'react'

// ** Third Party Imports
import { ContentState, EditorState, convertFromHTML } from 'draft-js'

// ** Project/Other Imports
import EditorContainer from '../components/forms/EditorContainer'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services Imports
import SitesService from '@/services/api/SitesService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

const TermsOfService = () => {
  const { handleError } = useErrorHandling()

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const { getSiteOtherDetails } = SitesService()
  const { isLoading } = useQuery({
    queryKey: ['termsOfService'],
    queryFn: () => getSiteOtherDetails({ data: { detail: 'provisions' } }),
    onSuccess: data => {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data).contentBlocks))
      )
    },
    onError: (e: any) => {
      handleError(e, `getSiteOtherDetails() tos.tsx`)
    }
  })

  return (
    <EditorContainer
      title='Terms of Service'
      editorState={editorState}
      setEditorState={setEditorState}
      isLoading={isLoading}
    />
  )
}

export default TermsOfService
