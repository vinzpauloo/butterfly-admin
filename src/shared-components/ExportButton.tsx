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
import { useActivityLogsStore } from '@/zustand/activityLogsStore'

interface ExportProps {
  ApiService: (params: any) => Promise<any>
  csvTitle: string
  titleValue: string
  exportTrue?: string
}

const ExportButton = ({ ApiService, csvTitle, titleValue, exportTrue }: ExportProps) => {
  const { handleError } = useErrorHandling()
  const { search, searchValue, emailSearchValue, actionSearchValue } = useActivityLogsStore()

  const [response, setResponse] = useState()
  const [defaultSearch] = useState('title')

  useQuery({
    queryKey: [
      'ExportCSV',
      titleValue,
      search,
      search === 'username'
        ? searchValue || undefined
        : search === 'email'
        ? emailSearchValue || undefined
        : actionSearchValue || undefined
    ],
    queryFn: () =>
      ApiService({
        data: {
          search_by: defaultSearch,
          search_value: titleValue
        },
        params: {
          export: exportTrue,
          search_by: search,
          search_value: search === 'username' ? searchValue : search === 'email' ? emailSearchValue : actionSearchValue
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
