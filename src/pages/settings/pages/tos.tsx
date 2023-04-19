import React, { useState } from 'react'
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { useQuery } from '@tanstack/react-query';
import SitesService from '@/services/api/SitesService';
import EditorContainer from '../components/forms/EditorContainer';

const TermsOfService = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { getSiteOtherDetails } = SitesService()
  const { isLoading } = useQuery({
    queryKey: ["termsOfService"],
    queryFn: () => getSiteOtherDetails({ data: { detail: "provisions" } }),
    onSuccess: (data) => {
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data).contentBlocks)))
    },
    onError: (error) => { console.log(error) }
  })

  return <EditorContainer title="Terms of Service" editorState={editorState} setEditorState={setEditorState} isLoading={isLoading} />
}

export default TermsOfService
