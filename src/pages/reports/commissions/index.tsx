import React from 'react'
import { Stack } from '@mui/material'
import ReportsTable from '../components/ReportsTable'
import FilterButtons from '../components/FilterButtons'

const CommissionsReport = () => {
	return (
		<Stack gap={6}>
			<FilterButtons />
			<ReportsTable />
		</Stack>
	)
}

export default CommissionsReport