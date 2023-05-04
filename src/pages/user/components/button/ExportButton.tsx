// ** React Imports
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

// ** MUI Imports
import { Button } from '@mui/material'

// ** Hooks
import { useUsersTable } from '../../../../services/api/UserTableService'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Custom Imports
import { saveAs } from 'file-saver'
import { useTranslateString } from '@/utils/TranslateString'

interface Props {
  usernameValue: string
  emailValue: string
  mobileValue: string
  role: any
  role_id: any
  titleValue?: string
}

const ExportButton = (props: Props) => {
  const [response, setResponse] = useState<any>()
  const [search, setSearch] = useState<any>()

  const { getAllDataForCSV } = useUsersTable()

  useQuery({
    queryKey: ['UsersTableCSV', props.role, props.usernameValue, props.emailValue, props.mobileValue, props.role_id],
    queryFn: () =>
      getAllDataForCSV({
        data: {
          role: props.role,
          search_by: search,
          search_value:
            search === 'username' ? props.usernameValue : search === 'email' ? props.emailValue : props.mobileValue
        }
      }),
    onSuccess: (data: any) => {
      setResponse(data)
    },
    enabled: true
  })

  const handleExport = async () => {
    const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `${props.role}-Data.csv`)
  }

  useEffect(() => {
    if (props.emailValue) {
      setSearch('email')
    } else if (props.mobileValue) {
      setSearch('mobile')
    } else if (props.usernameValue) {
      setSearch('username')
    } else if (props.titleValue) {
      setSearch('title')
    }
  }, [props.emailValue, props.mobileValue, props.usernameValue, props.titleValue])

  const TranslateString = useTranslateString()

  return (
    <Button
      color='secondary'
      variant='outlined'
      startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      onClick={handleExport}
    >
      {TranslateString('Export')}
    </Button>
  )
}

export default ExportButton
