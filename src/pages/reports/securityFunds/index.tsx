import React from 'react'
import { Stack } from '@mui/material'
import ReportsTable from '../components/ReportsTable'
import FilterButtons from '../components/FilterButtons'

const SecurityFundsReport = () => {
	return (
		<Stack gap={6}>
			<FilterButtons />
			<ReportsTable />
		</Stack>
	)
}

export default SecurityFundsReport