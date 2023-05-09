// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Third Party Imports
import { ContentState, EditorState, convertFromHTML } from 'draft-js'

// ** Project/Other Imports
import EditorContainer from '../components/forms/EditorContainer'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services Imports
import SitesService from '@/services/api/SitesService'
import { captureError } from '@/services/Sentry'

const TermsOfService = () => {
  const router = useRouter()
  const currentLocation = router.asPath

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
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, getSiteOtherDetails() Terms Of Service`)
        })
      }
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
