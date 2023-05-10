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

const PrivacyPolicy = () => {
  const { handleError } = useErrorHandling()

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const { getSiteOtherDetails } = SitesService()
  const { isLoading } = useQuery({
    queryKey: ['privacyPolicy'],
    queryFn: () => getSiteOtherDetails({ data: { detail: 'policy' } }),
    onSuccess: data => {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data).contentBlocks))
      )
    },
    onError: (e: any) => {
      handleError(e, `getSiteOtherDetails() privacypolicy`)
    }
  })

  return (
    <EditorContainer
      title='Privacy Policy'
      editorState={editorState}
      setEditorState={setEditorState}
      isLoading={isLoading}
    />
  )
}

export default PrivacyPolicy
