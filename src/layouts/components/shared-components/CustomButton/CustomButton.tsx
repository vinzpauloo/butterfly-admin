import { ReactElement } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled, SxProps } from '@mui/material/styles'

type Props = {
  borderType?: 'rounded-0' | 'rounded-pill' | 'rounded'
  children?: ReactElement<any, any> | string
  sx?: SxProps
  onClick?: () => void
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.customBflyColors.alwaysPrimary,
  backgroundColor: theme.palette.common.white,
  width: '100%',
  fontWeight: 'normal',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))

function CustomButton({ borderType = 'rounded', sx, onClick, children }: Props) {
  return (
    <StyledButton onClick={onClick} sx={{ ...sx }}>
      {children}
    </StyledButton>
  )
}

export default CustomButton
