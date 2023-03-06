import {ReactElement} from 'react'
import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type Props = {
  borderType? : 'rounded-0' | 'rounded-pill' | 'rounded',
  children? : ReactElement<any, any> | string
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.customBflyColors.primary,
  backgroundColor: theme.palette.common.white,
  width: '100%',
  fontWeight: 'normal'
}))

function CustomButton({borderType = 'rounded', children}: Props) {
  return (
    <StyledButton>{children}</StyledButton>
  )
}

export default CustomButton