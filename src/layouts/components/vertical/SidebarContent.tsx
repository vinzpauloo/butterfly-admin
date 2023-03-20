import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import Collapse from '@mui/material/Collapse'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const Img = styled('img')({
  width: 30,
  height: 'auto'
})

const sideBarContent = [
  { id: 1, title: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
  { id: 2, title: 'Users', icon: 'users', link: '/user/list' },
  { id: 3, title: 'Transaction', icon: 'transactions', link: '' },
  { id: 4, title: 'Reports', icon: 'reports', link: '' },
  {
    id: 5,
    title: 'Studio',
    icon: 'studio',
    sub: [
      {
        title: 'Upload Contents',
        path: '/studio/upload'
      },
      {
        title: 'Content Approval',
        path: '/studio/content'
      },
      {
        title: 'Newsfeed list',
        path: '/studio/newsfeed'
      },
      {
        title: 'Newsfeed Approval',
        path: '/studio/newsfeed/approval'
      },
      {
        title: 'Video List',
        path: '/studio/video-list'
      }
    ]
  },
  { id: 6, title: 'Bundles', icon: 'bundles', link: '' },
  { id: 7, title: 'Settings', icon: 'settings', link: '' }
]

const settingsSubMenu = [
  { id: 1, title: 'Work Groupings', link: '/settings' },
  { id: 2, title: 'Feed Features', link: '/settings/pages/feedfeatures' },
  { id: 3, title: 'Advertisements', link: '/settings/pages/advertisements' },
  { id: 4, title: 'Announcements', link: '/settings/pages/announcements' },
  { id: 5, title: 'Privacy Policy', link: '/settings/pages/privacypolicy' },
  { id: 6, title: 'Terms and Services', link: '/settings/pages/tos' }
]

const SidebarContent = () => {
  // ** Hook
  const { settings } = useSettings()

  // ** Vars
  const { navCollapsed } = settings

  const [showSettingsSubMenu, setShowSettingsSubMenu] = useState(false)
  const [showStudiosSub, setShowStudiosSub] = useState(false)

  return (
    <Box
      className='drawerBox'
      role='presentation'
      sx={{
        paddingTop: '1.5rem'
      }}
    >
      <List sx={{ paddingBottom: 0, marginBottom: 0 }}>
        {sideBarContent.map(item => (
          <Link key={item.id} href={!item.sub ? `${item.link}` : ''} component={item.sub ? Box : NextLink}>
            <ListItem
              disablePadding
              sx={
                !navCollapsed
                  ? {
                    '& .MuiButtonBase-root': {
                      display: 'flex',
                      gap: '1rem',
                      paddingInline: '2.5rem',
                      justifyContent: 'flex-start',
                      marginBottom: '.5rem'
                    },
                    '& .MuiTypography-root': {
                      transition: 'color 0.5s'
                    },
                    '&:hover .MuiTypography-root': {
                      color: theme => theme.customBflyColors.green
                    }
                  }
                  : {
                    '& .MuiButtonBase-root': {
                      paddingInline: '1rem',
                      display: 'flex',
                      gap: 3,
                      marginBottom: '.5rem'
                    }
                  }
              }
            >
              <ListItemButton
                onClick={() => {
                  if (item.title === 'Studio') {
                    setShowStudiosSub(!showStudiosSub)
                  }
                  if (item.title === 'Settings') {
                    setShowSettingsSubMenu(!showSettingsSubMenu)
                  }
                }}
                sx={{
                  '& .iconContainer': {
                    position: 'relative',
                    width: '30px',
                    height: '30px'
                  },
                  '& .iconContainer > img': {
                    position: 'absolute',
                    transition: 'opacity 0.5s'
                  },
                  '& .iconContainer > img:last-child': {
                    opacity: 0
                  },
                  '&:hover .iconContainer > img:last-child': {
                    opacity: 1
                  }
                }}
              >
                <ListItemIcon className='iconContainer'>
                  <Img src={`/images/sidebar/icons/${item.icon}.svg`} />
                  <Img src={`/images/sidebar/icons/${item.icon}-hover.svg`} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      color: theme => theme.customBflyColors.sidebarLinkColor,
                      fontSize: '0.875rem'
                    }
                  }}
                  primary={item.title}
                />
              </ListItemButton>
            </ListItem>
            {item?.sub && (
              <Collapse in={showStudiosSub} timeout='auto'>
                <List
                  disablePadding
                  sx={
                    !navCollapsed
                      ? {
                        '& .MuiButtonBase-root': {
                          gap: '1rem',
                          display: 'flex',
                          marginLeft: 25
                        },
                        '& .MuiTypography-root': {
                          transition: 'color 0.5s'
                        }
                      }
                      : {
                        '& .MuiButtonBase-root': {
                          paddingInline: '1rem',
                          display: 'flex',
                          gap: 3,
                          marginBottom: '.5rem'
                        }
                      }
                  }
                >
                  {item?.sub.map(child => (
                    <Link
                      key={child.title}
                      href={child.path}
                      component={NextLink}
                      sx={{
                        '&:hover .MuiTypography-root': {
                          color: theme => theme.customBflyColors.green
                        }
                      }}
                    >
                      <ListItemButton sx={{ margin: 0, padding: 0 }}>
                        <ListItemText
                          sx={{
                            '& .MuiTypography-root': {
                              color: theme => theme.customBflyColors.sidebarLinkColor,
                              fontSize: '0.8125rem'
                            }
                          }}
                          primary={child.title}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </Link>
        ))}
      </List>

      {showSettingsSubMenu && (
        <List disablePadding>
          {!navCollapsed
            ? settingsSubMenu.map(item => (
              <ListItem
                key={item.id}
                disablePadding
                sx={
                  !navCollapsed
                    ? {
                      '& .MuiButtonBase-root': {
                        gap: '1rem',
                        display: 'flex',
                        marginLeft: 25
                      },
                      '& .MuiTypography-root': {
                        transition: 'color 0.5s'
                      },
                      '&:hover .MuiTypography-root': {
                        color: theme => theme.customBflyColors.green
                      }
                    }
                    : {
                      '& .MuiButtonBase-root': {
                        paddingInline: '1rem',
                        display: 'flex',
                        gap: 3,
                        marginBottom: '.5rem'
                      }
                    }
                }
              >
                <ListItemButton href={`${item.link}`} sx={{ margin: 0, padding: 0 }}>
                  <ListItemText
                    sx={{
                      '& .MuiTypography-root': {
                        color: '#BFC6D0',
                        fontSize: '0.8125rem'
                      }
                    }}
                    primary={item.title}
                  />
                </ListItemButton>
              </ListItem>
            ))
            : null}
        </List>
      )}

    </Box>
  )
}

export default SidebarContent
