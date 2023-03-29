import React from 'react'

import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { Box, OutlinedInput, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'

import TabListData from '@/pages/transactions/data/TabLists'

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

function TabLists({ activeTab, setActiveTab }: any) {
  const handleChange = (event: any, value: string) => {
    setActiveTab(value)
  }

  return (
    <Box display={'flex'} alignItems='flex-start' justifyContent={'space-between'}>
      <TabContext value={activeTab}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
        >
          {TabListData.map((item, index) => (
            <Tab
              key={index}
              value={item.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  {item.icon}
                  {item.title}
                </Box>
              }
            />
          ))}
        </TabList>
      </TabContext>
      <OutlinedInput placeholder='Search' size='small' />
    </Box>
  )
}

export default TabLists
