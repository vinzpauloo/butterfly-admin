import React from 'react'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { Box, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useTranslateString } from '@/utils/TranslateString';

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

function TabLists({ originRoute, tabData , activeTab, setActiveTab }: any) {
  const router = useRouter()
  const handleChange = (event: any, value: string) => {
    setActiveTab(value)
  }

  const handleClick = (value: string) => {
    router.push(`/${originRoute}/${value}`)
  }

  const TranslateString = useTranslateString()

  return (
    <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
      <TabContext value={activeTab}>
        <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange} >
          {tabData.map((item : any, index: number) => (
            <Tab
              onClick={() => handleClick(item.value)}
              key={index}
              value={item.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  {item.icon}
                  {TranslateString(item.title)}
                </Box>
              }
            />
          ))}
        </TabList>
      </TabContext>
    </Box>
  )
}

export default TabLists
