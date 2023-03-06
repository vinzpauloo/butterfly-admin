// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/verticalButterfly'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Icon
import Icon from 'src/@core/components/icon'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import AppBrand from './components/AppBrand'
import SidebarContent from './components/vertical/SidebarContent'
import SidebarFooter from './components/vertical/SidebarFooter'

interface Props {
  children: ReactNode
  contentHeightFixed: boolean
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          componentProps: {
            sx: {
              '& .MuiPaper-root':{
                backgroundColor: theme => theme.customBflyColors.sidebarContentBG,
                boxShadow: '5px 2px 2px rgb(0 0 0 / 25%)'
              },
              '& .nav-header': {
                backgroundColor: theme => theme.customBflyColors.sidebarHeaderBG,
                borderBottom: '1px solid #FFFFFF'
              },
              '& .scrollbar-container .nav-link .active': {
                backgroundColor: 'none',
                backgroundImage: 'none',
                boxShadow:'none',
                borderRadius:0
              },
              '& .scrollbar-container  a': {
                color: theme => theme.palette.common.white
              }
            }
          },
          branding: (props) => <AppBrand {...props} />,
          navItems: VerticalNavItems(),
          lockedIcon: 
          <Box 
                sx={{ 
                  '&:hover': {
                    backgroundColor: theme => theme.customBflyColors.green
                  },
                  backgroundColor : '#fff', 
                  cursor:'pointer', ml: 6 , 
                  display: 'flex', 
                  color: '#3C4B64',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.5)', 
                  borderRadius: .3,
                  border: '1px solid #3C4B64'
                  }}>
                <Icon icon='mdi:menu' fontSize={20} />
          </Box>,
          // unlockedIcon: <></>,
          // { hidden, settings, children, scrollToTop, footerProps, contentHeightFixed, verticalLayoutProps }
          content: () => <SidebarContent />,
          afterContent: () => <SidebarFooter />,

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          componentProps: {
            sx: { 
              boxShadow: theme => theme.shadows[9],
              backgroundColor: theme => theme.palette.common.white,
              '& .navbar-content-container': {
                minHeight:'50px !important'
              },
              '& .css-auttry' : {
                paddingBottom: 1.2,
                gap:.5
              }
            }
          },
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
      footerProps={{
        content: () => <></> // no footer!
      }}
    >
      {children}
      
    </Layout>
  )
}

export default UserLayout
