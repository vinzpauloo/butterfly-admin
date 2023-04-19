import React, { useState } from 'react'
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { useQuery } from '@tanstack/react-query';
import SitesService from '@/services/api/SitesService';
import EditorContainer from '../components/forms/EditorContainer';

const PrivacyPolicy = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { getSiteOtherDetails } = SitesService()
  const { isLoading } = useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: () => getSiteOtherDetails({ data: { detail: "policy" } }),
    onSuccess: (data) => {
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data).contentBlocks)))
    },
    onError: (error) => { console.log(error) }
  })

  return <EditorContainer title="Privacy Policy" editorState={editorState} setEditorState={setEditorState} isLoading={isLoading} />
}

export default PrivacyPolicy
