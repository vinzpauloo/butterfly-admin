import React, { useState } from 'react'
import { Stack, Button } from '@mui/material'

const FilterButtons = () => {
	const [currentSelection, setCurrentSelection] = useState<number>(0)
	const selections = ['Daily', 'Weekly', 'Monthly', 'Yearly']
	
	return (
		<Stack direction={['column', 'row', 'row']} gap={[2, 6, 6]} justifyContent='center'>
			{selections.map((item, index) =>
				<Button
					key={index}
					variant={index === currentSelection ? 'contained' : 'outlined'}
					sx={{ textTransform: 'uppercase' }}
					onClick={() => setCurrentSelection(index)}
				>
					{item}
				</Button>
			)}
		</Stack>
	)
}

export default FilterButtons