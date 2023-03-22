// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { CardHeader } from '@mui/material'
import { GridToolbarExport } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
    usernameValue: string;
    emailValue: string;
    mobileValue: string;
    clearSearch: () => void;
    onUsernameChange: (e: ChangeEvent) => void;
    onEmailChange: (e: ChangeEvent) => void;
    onMobileChange: (e: ChangeEvent) => void;
}

const UserTableToolbar = (props: Props) => {
    return (
        <Box
            sx={{
                padding: 5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <CardHeader title='Search Filters' sx={{ margin: 0, padding: 0 }} />
                <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        md: 'column',
                        lg: 'row'
                    },
                    padding: 0,
                    gap: 5
                }}>
                <TextField
                    size='small'
                    value={props.emailValue}
                    onChange={props.onEmailChange}
                    placeholder='Search email…'
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ mr: 2, display: 'flex' }}>
                                <Icon icon='mdi:magnify' fontSize={20} />
                            </Box>
                        ),
                        endAdornment: (
                            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                                <Icon icon='mdi:close' fontSize={20} />
                            </IconButton>
                        )
                    }}
                    sx={{
                        width: {
                            xs: 1,
                            sm: 'auto',
                            lg: '100%'
                        },
                        '& .MuiInputBase-root > svg': {
                            mr: 2
                        }
                    }}
                />

                {/* Add TextField for searching mobile number */}
                <TextField
                    size='small'
                    value={props.mobileValue}
                    onChange={props.onMobileChange}
                    placeholder='Search mobile number…'
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ mr: 2, display: 'flex' }}>
                                <Icon icon='mdi:magnify' fontSize={20} />
                            </Box>
                        ),
                        endAdornment: (
                            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                                <Icon icon='mdi:close' fontSize={20} />
                            </IconButton>
                        )
                    }}
                    sx={{
                        width: {
                            xs: 1,
                            sm: 'auto',
                            lg: '100%'
                        },
                        '& .MuiInputBase-root > svg': {
                            mr: 2
                        }
                    }}
                />
                <TextField
                    size='small'
                    value={props.usernameValue}
                    onChange={props.onUsernameChange}
                    placeholder='Search User…'
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ mr: 2, display: 'flex' }}>
                                <Icon icon='mdi:magnify' fontSize={20} />
                            </Box>
                        ),
                        endAdornment: (
                            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                                <Icon icon='mdi:close' fontSize={20} />
                            </IconButton>
                        )
                    }}
                    sx={{
                        width: {
                            xs: 1,
                            sm: 'auto',
                            lg: '100%'
                        },
                        '& .MuiInputBase-root > svg': {
                            mr: 2
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default UserTableToolbar
