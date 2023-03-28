// ** React Imports
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

// ** MUI Imports
import { Button, Box } from '@mui/material'

// ** Hooks
import { useUsersTable } from '../../../../services/api/useUsersTable'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Custom Imports
import { saveAs } from 'file-saver'

interface Props {
  usernameValue: string
  emailValue: string
  mobileValue: string
  role: any
}

const ExportButton = (props: Props) => {
  const [response, setResponse] = useState<any>()
  const [search, setSearch] = useState<any>()

  const { getAllDataForCSV } = useUsersTable()

  const {} = useQuery({
    queryKey: ['supervisors', props.role, props.usernameValue, props.emailValue, props.mobileValue],
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
      console.log(`TYPING IN EMAIL`)
      setSearch('email')
    } else if (props.mobileValue) {
      console.log(`TYPING IN mobile`)
      setSearch('mobile')
    } else if (props.usernameValue) {
      console.log(`TYPING IN username`)
      setSearch('username')
    }
  }, [props.emailValue, props.mobileValue, props.usernameValue])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: ['column', 'row'],
        gap: 10,
        mb: 5,
        mt: {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 5
        }
      }}
    >
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
        onClick={handleExport}
      >
        Export
      </Button>
    </Box>
  )
}

export default ExportButton
