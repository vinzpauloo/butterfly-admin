// ** MUI Imports
import MuiBox, { BoxProps } from '@mui/material/Box'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// Styled Box component
const Box = styled(MuiBox)<BoxProps>(() => ({
  width: 20,
  height: 20,
  borderWidth: 3,
  borderRadius: '50%',
  borderStyle: 'solid'
}))

const StepperCustomDot = (props: StepIconProps) => {
  // ** Props
  const { active, completed, error } = props

  // ** Hooks
  const theme = useTheme()

  if (error) {
    return <Icon icon='mdi:alert' fontSize={20} color='#FF9C00' transform='scale(1.2)' />
  } else if (completed) {
    return <Icon icon='mdi:check-circle' fontSize={20} color='#FF9C00' transform='scale(1.2)' />
  } else {
    return (
      <Box
        sx={{
          borderColor: '#FF9C00',
          ...(active && {
            borderWidth: 5,
            borderColor: '#FF9C00',
            backgroundColor: theme.palette.mode === 'light' ? 'common.white' : 'background.default'
          })
        }}
      />
    )
  }
}

export default StepperCustomDot
