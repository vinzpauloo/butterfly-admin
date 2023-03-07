// ** React
import React, { ReactNode  } from 'react'

// ** MUI Imports
import Card, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { alpha, styled } from '@mui/material/styles';
import { Theme, SxProps } from '@mui/material'

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  backgroundColor: `${alpha(theme.customBflyColors.primary as string, 0.9)}`,
  border: '1px solid #E6E6E6',
  borderRadius: '12px'
}));

type BasicCardProps = {
  opacity? : number,
  children? : ReactNode,
  sx?: SxProps<Theme>
}

const BasicCard = ({opacity=1, sx, children} : BasicCardProps) => {
  return (
    <CustomCard sx={{...sx}}>
      <CardContent>
        {children}
      </CardContent>
    </CustomCard>
  )
}

export default BasicCard
