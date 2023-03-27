import React from 'react'
import Grid, { GridProps } from '@mui/material/Grid';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Icon, IconProps } from '@mui/material';
import IconList from './IconList';


type bundleObject = {
	_id: string
	name: string
	permission: boolean
}

type Props = {
	bundleName: string
	promoBundle: bundleObject[]
}

const BundleFeatureCard = (props: Props) => {
	return (
		<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} >
			<Stack bgcolor="white" borderRadius={.5} gap={4} p={1}>
				<Typography variant="body1" borderRadius={.5} textAlign="center">{props.bundleName}</Typography>
				<Grid container gap={2} >
					{props.promoBundle.map((item, index) => 
						<Grid item  key={index} {...gridItemProps}>
							<Icon component={IconList(index, item?.permission)}  {...iconItemProps} />
							<Typography {...typographyItemProps}>{item.name}</Typography>
						</Grid>	
					)}
				</Grid>
			</Stack>
		</Stack>
	)
}

export default BundleFeatureCard

const gridItemProps: GridProps = {
	item: true,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: 64,
	xs: 3.7,
}

const typographyItemProps: TypographyProps = {
	textAlign: "center",
	variant: "subtitle1",
	borderRadius: 0.5,
	fontSize: 10
}

const iconItemProps: IconProps = {
	sx: {
		height: 32,
		width: 32 
	}
}