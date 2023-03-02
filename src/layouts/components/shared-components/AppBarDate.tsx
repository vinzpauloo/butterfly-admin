// ** React Imports
import React from 'react'

// ** MUI Imports
import Box, { BoxProps }  from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Import
import { format } from 'date-fns'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'


interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}

// Styled component 
const StyledDateBox = styled(Box)<BoxProps>(({ theme }) => ({

    '&': {
        background: theme.customBflyColors.dateColorBG,
        border: '1px solid #FFFFFF',
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        paddingInline:'1rem'
    },
  

}))



const AppBarDate = () => {  
    const [time, setTime] = React.useState<string>('')

    React.useEffect( () => {
        const interval = setInterval( ()=>{
            setTime( format(new Date(), 'yyyy-MM-dd hh:mm:ss') )
        }, 1000)
        return () => clearInterval(interval)
    }, [])


    return (
        <>
            <StyledDateBox><Typography color={theme => theme.palette.common.white}>{ time }</Typography></StyledDateBox>
        </>
    )
}

export default AppBarDate
