// ** React Imports
import React, { useState } from 'react'
import { Icon } from '@iconify/react'

// ** MUI Imports
import { Button } from '@mui/material'

// ** Hooks/Services
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Custom Imports
import { saveAs } from 'file-saver'

interface ExportProps {
  ApiService: (params: any) => Promise<any>
  csvTitle: string
  titleValue: string
}

const ExportButton = ({ ApiService, csvTitle, titleValue }: ExportProps) => {
  const { handleError } = useErrorHandling()

  const [response, setResponse] = useState()
  const [search] = useState('title')

  useQuery({
    queryKey: ['ExportCSV', titleValue],
    queryFn: () =>
      ApiService({
        data: {
          search_by: search,
          search_value: titleValue
        }
      }),
    onSuccess: (data: any) => {
      setResponse(data)
    },
    onError: (e: any) => handleError(e, `${ApiService} ExportButton, Shared-Components`),
    enabled: true
  })

  const handleExport = async () => {
    if (response !== undefined) {
      const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, `${csvTitle}-Data.csv`)
    }
  }

  return (
    <Button
      color='secondary'
      variant='outlined'
      startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      onClick={handleExport}
    >
      Export
    </Button>
  )
}

export default ExportButton
