import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const Img = styled('img')({
    width: 30,
    height:'auto',
})

const SidebarContent = () => {

  // ** Hook
  const { settings } = useSettings()

  // ** Vars
  const {
    navCollapsed,
  } = settings

    return (
        <Box
            className='drawerBox'
            role="presentation"
            sx={{
                paddingTop: '1.5rem'
            }}
            >
            <List>
                {[
                    {id : 1, title : 'Dashboard', icon : 'dashboard.svg'}, 
                    {id : 2, title : 'Users', icon : 'users.svg'}, 
                    {id : 3, title : 'Transaction', icon : 'transactions.svg'}, 
                    {id : 4, title : 'Reports', icon : 'reports.svg'},
                    {id : 5, title : 'Studio', icon : 'studio.svg'},
                    {id : 6, title : 'Bundles', icon : 'bundles.svg'},
                    {id : 7, title : 'Settings', icon : 'settings.svg'}
                
                ].map((item) => (
                <ListItem 
                key={item.id} 
                disablePadding
                sx={
                    !navCollapsed ? {
                        '& .MuiButtonBase-root' : {
                            display:'flex',
                            gap:'1rem',
                            paddingInline : '2.5rem',
                            justifyContent:'flex-start',
                            marginBottom : '.5rem'
                        },
                        '&:hover .MuiTypography-root' : {
                            color : theme => theme.customBflyColors.green
                        }
                    } : {
                        '& .MuiButtonBase-root' : {
                            paddingInline : '1rem',
                            display: 'flex',
                            gap:3,
                            marginBottom : '.5rem'
                        },
                    }
                }
                >
                    <ListItemButton>
                    <ListItemIcon>
                        <Img src={`/images/sidebar/icons/${item.icon}`} />
                    </ListItemIcon>
                    <ListItemText sx={{
                        '& .MuiTypography-root': {
                            color : '#BFC6D0', 
                            fontSize: '0.875rem'
                        } 
                    }} 
                    primary={item.title} />
                    </ListItemButton>
                </ListItem>
                ))}

            </List>
            <Divider />
            </Box>
    )
}

export default SidebarContent