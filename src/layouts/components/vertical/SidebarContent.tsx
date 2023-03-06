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
                    {id : 1, title : 'Dashboard', icon : 'dashboard'}, 
                    {id : 2, title : 'Users', icon : 'users'}, 
                    {id : 3, title : 'Transaction', icon : 'transactions'}, 
                    {id : 4, title : 'Reports', icon : 'reports'},
                    {id : 5, title : 'Studio', icon : 'studio'},
                    {id : 6, title : 'Bundles', icon : 'bundles'},
                    {id : 7, title : 'Settings', icon : 'settings'}
                
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
                        '& .MuiTypography-root':{
                            transition: 'color 0.5s'
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
                    <ListItemButton 
                        sx={{
                            '& .iconContainer': {
                                position:'relative',
                                width:'30px',
                                height: '30px',
                            },
                            '& .iconContainer > img' : {
                                position:'absolute',
                                transition: 'opacity 0.5s'
                            },
                            '& .iconContainer > img:last-child': {
                                opacity:0
                            },
                            '&:hover .iconContainer > img:last-child': {
                                opacity:1
                            }
                        }}>
                        <ListItemIcon className='iconContainer'>
                            <Img src={`/images/sidebar/icons/${item.icon}.svg`} />
                            <Img src={`/images/sidebar/icons/${item.icon}-hover.svg`} />
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