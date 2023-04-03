import React from 'react'
import ContentTable from './views/data-grid/ContentTable'

// ** Tanstack
import { useQuery } from '@tanstack/react-query'

// ** Apis
import ContentService from '@/services/api/ContentService'

type Props = {}

const Content = (props: Props) => {
  const { getContents } = ContentService()

  const contentData = useQuery({ queryKey: ['contents'], queryFn: getContents })

  console.log('contentData', contentData)

  if (contentData.isLoading) {
    return (
      <>
        <ContentTable isLoading={contentData.isLoading} />
      </>
    )
  }

  if (contentData.data) {
    return (
      <>
        <ContentTable data={contentData.data} />
      </>
    )
  }
}

export default Content
