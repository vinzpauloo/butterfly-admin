// ** React Imports
import React, { MouseEvent, useState, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button';

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}


const LanguageFlagsDropdown = () => {
    // ** Hook
    const { i18n } = useTranslation()
    const { settings, saveSettings } = useSettings()

     // ** State
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
  
    return (
        <>
            <Button color="inherit">
                <img src='/images/appbar/flag.png' />
            </Button>
        </>
    )
}

export default LanguageFlagsDropdown
