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
import { captureError } from '@/services/Sentry'
import SitesService from '@/services/api/SitesService'

const PrivacyPolicy = () => {
  const router = useRouter()
  const currentLocation = router.asPath

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
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, getSiteOtherDetails() Privacy Policy`)
        })
      }
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
