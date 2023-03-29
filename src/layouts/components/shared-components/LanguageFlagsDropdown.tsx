// ** React Imports
import React, { MouseEvent, useState, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu, { MenuProps } from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { Grid, ListItemIcon, Typography } from '@mui/material'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

// ** Styled Components
const defaultBG =
  'linear-gradient(137.43deg, rgba(255, 255, 255, 0.0385) 3.89%, rgba(195, 210, 191, 0.0245) 54.78%, rgba(255, 255, 255, 0.042) 100%)'

const LanguageMenu = styled(Menu)<MenuProps>(({ theme }) => ({
  '& .MuiPaper-root': {
    background: useTheme().palette.mode == 'dark' ? defaultBG : '#000',
    border: '1px solid #B59770',
    backdropFilter: 'blur(7px)',
    paddingInline: '1.4rem',
    maxWidth: '294px',
    paddingTop: '.5rem',
    marginTop: '1rem'
  }
}))

const MenuGrid = styled(Grid)(({ theme }) => ({}))

const LangMenuItem = styled(MenuItem)(({ theme }) => ({
  color: '#fff',
  fontFamily: theme.customTypography?.fontFamilyPoppins,
  fontSize: '12px',
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '0.5625em',
  '& MuiListItemIcon-root': {
    marginRight: 0
  }
}))

const LangItemFlag = styled(ListItemIcon)(({ theme }) => ({
  marginRight: 0,
  minWidth: '26px'
}))

// ** FLAG CONSTANT FOLDER
const flagPath = '/images/flags'

const LanguageFlagsDropdown = () => {
  // ** Hook
  const { i18n } = useTranslation()
  const { settings, saveSettings } = useSettings()
  const theme = useTheme()

  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [flag, setFlag] = React.useState<string>('')

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  interface ILanguage {
    id: number
    title: string
    flag: string
  }
  const languages: ILanguage[] = [
    { id: 1, title: 'English', flag: 'usa' },
    { id: 2, title: '中文', flag: 'china' },
    { id: 3, title: 'Español', flag: 'spain' },
    { id: 4, title: 'عربي', flag: 'uae' },
    { id: 5, title: 'Português', flag: 'portugal' },
    { id: 6, title: 'ViệtNam', flag: 'vietnam' },
    { id: 7, title: 'Swedish', flag: 'sweden' },
    { id: 8, title: 'Deutsch', flag: 'germany' },
    { id: 9, title: 'हिंदी', flag: 'india' },
    { id: 10, title: 'Русский', flag: 'russia' },
    { id: 11, title: '한국어', flag: 'southkorea' },
    { id: 12, title: 'Italiano', flag: 'italy' },
    { id: 13, title: '日本語', flag: 'japan' },
    { id: 14, title: 'Indonesia', flag: 'indonesia' },
    { id: 15, title: 'Türkçe', flag: 'turkey' },
    { id: 16, title: 'Français', flag: 'france' }
  ]

  return (
    <>
      <Button color='inherit' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        <img src='/images/appbar/flag.png' />
      </Button>
      <LanguageMenu
        className='language-menu'
        keepMounted
        id='language-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <Typography
          marginBottom={2}
          fontWeight={700}
          variant='body1'
          fontFamily={theme.customTypography?.fontFamilyPoppins}
          color='white'
        >
          Language
        </Typography>
        <Grid rowSpacing={1.5} columnSpacing={2.5} className='gridContainer' container>
          {languages.map(lang => (
            <MenuGrid key={lang.id} xs={6} item>
              <LangMenuItem className='langMenuItem' onClick={handleClose}>
                <LangItemFlag>
                  <img src={`${flagPath}/${lang.flag}.png`} />
                </LangItemFlag>
                {lang.title}
              </LangMenuItem>
            </MenuGrid>
          ))}
        </Grid>
      </LanguageMenu>
    </>
  )
}

export default LanguageFlagsDropdown
