import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { Icon } from '@iconify/react'

// ** Hooks
import { useUsersTable } from '../../../../services/api/useUsersTable'

// ** TanStack Query
import { useQueries } from '@tanstack/react-query'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { saveAs } from 'file-saver'
import operatorColumns from '../../data/OperatorColumn'
import superAgentColumns from '../../data/SuperAgentColumn'
import contentCreatorColumns from '../../data/ContentCreatorColumn'

const ExportButton = () => {
  const [response, setResponse] = useState<any>()
  const [responseSA, setResponseSA] = useState<any>()
  const [responseCC, setResponseCC] = useState<any>()

  const { getAllDataFromSupervisor, getAllDataFromSuperAgent, getAllDataFromCreator } = useUsersTable()

  const { isLoading } = useQueries({
    queries: [
      {
        queryKey: ['supervisors'],
        queryFn: getAllDataFromSupervisor,
        onSuccess: (data: any) => {
          setResponse(data?.data)
        }
      },
      {
        queryKey: ['superagents'],
        queryFn: getAllDataFromSuperAgent,
        onSuccess: (data: any) => {
          setResponseSA(data?.data)
          console.log(`SA`, responseSA)
        }
      },
      {
        queryKey: ['creators'],
        queryFn: getAllDataFromCreator,
        onSuccess: (data: any) => {
          setResponseCC(data?.data)
        }
      }
    ]
  })

  const handleExportOperator = async () => {
    console.log(`SUPERVISOR`, response)

    const headerRow = operatorColumns.map((column: any) => column.field).join(',')
    const csvContent = [
      headerRow,
      ...response?.map((row: any) => operatorColumns.map((column: any) => row[column.field]).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'Operator-Data.csv')
  }

  const handleExportSuperAgent = () => {
    console.log(`SA`, responseSA)

    const headerRow = superAgentColumns.map((column: any) => column.field).join(',')
    const csvContent = [
      headerRow,
      ...responseSA?.map((row: any) => superAgentColumns.map((column: any) => row[column.field]).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'SuperAgent-Data.csv')
  }

  const handleExportContentCreator = () => {
    console.log(`CC`, responseCC)

    const headerRow = contentCreatorColumns.map((column: any) => column.field).join(',')
    const csvContent = [
      headerRow,
      ...responseCC?.map((row: any) => contentCreatorColumns.map((column: any) => row[column.field]).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'ContentCreator-Data.csv')
  }

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
        variant='contained'
        color='primary'
        startIcon={<Icon icon='mdi:download' />}
        onClick={handleExportOperator}
        sx={styles.button}
      >
        Export Operator
      </Button>

      <Button
        variant='contained'
        color='primary'
        startIcon={<Icon icon='mdi:download' />}
        onClick={handleExportSuperAgent}
        sx={styles.button}
      >
        Export Super Agent
      </Button>

      <Button
        variant='contained'
        color='primary'
        startIcon={<Icon icon='mdi:download' />}
        onClick={handleExportContentCreator}
        sx={styles.button}
      >
        Export Content Creator
      </Button>
    </Box>
  )
}

const styles = {
  button: {
    width: {
      xs: '100%',
      sm: 150,
      lg: 235
    },
    height: '3dvh',
    fontSize: {
      xs: 10,
      sm: 7,
      lg: 10
    }
  }
}

export default ExportButton
