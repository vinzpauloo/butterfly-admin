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

type Props = {}

export default function SidebarFooter({}: Props) {

    // ** Hook
  const { settings } = useSettings()

  // ** Vars
  const {
    navCollapsed,
  } = settings
    
  return (
    <Box
            className='sidebarFooterBox'
            sx={{
                paddingTop: '1.5rem',
                backgroundColor : theme => theme.customBflyColors.sidebarHeaderBG,
                marginTop:'auto',
                borderTop: '1px solid #fff'
            }}
            >
            <List>
                {[
                    {id : 1, title : 'Language', icon : 'language'}, 
                    {id : 2, title : 'Currency', icon : 'currency'}, 
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