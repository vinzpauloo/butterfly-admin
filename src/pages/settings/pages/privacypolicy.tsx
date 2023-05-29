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
  const [selectedSite, setSelectedSite] = useState<number>(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [sitesList, setSitesList] = useState<any>([])

  const { getSitesList, getSiteOtherDetails } = SitesService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['privacyPolicy', selectedSite, selectedLanguage],
    queryFn: () => getSiteOtherDetails({ 
      data: {
        detail: 'policy',
        site_id: selectedSite,
        locale: selectedLanguage,
      }
    }),
    onSuccess: data => {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data).contentBlocks))
      )
    },
    onError: (e: any) => {
      handleError(e, `getSiteOtherDetails() privacypolicy`)
    }
  })

  const { } = useQuery({
    queryKey: ['allSitesList'],
    queryFn: () => getSitesList({}),
    onSuccess: data => {
      setSitesList(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getSitesList() privacypolicy`)
    }
  })

  return (
    <EditorContainer
      title='Privacy Policy'
      editorState={editorState}
      setEditorState={setEditorState}
      isLoading={isLoading || isFetching}
      selectedSite={selectedSite}
      setSelectedSite={setSelectedSite}
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
      sitesList={sitesList}
    />
  )
}

export default PrivacyPolicy
