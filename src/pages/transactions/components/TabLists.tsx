import React from 'react'

import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { Box, Button, OutlinedInput, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

import TabListData from '@/data/TabLists'
import TranslateString from '@/utils/TranslateString'
import Translations from '@/layouts/components/Translations'

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

function TabLists({ activeTab, setActiveTab, setOpen }: any) {
  const router = useRouter()
  const handleChange = (event: any, value: string) => {
    setActiveTab(value)
  }

  const haveAddMore = activeTab === 'security-funds'

  const handleClick = (value: string) => {
    router.push(`/transactions/${value}`)
  }

  return (
    <Box display={'flex'} alignItems='flex-end' justifyContent={'space-between'}>
      <TabContext value={activeTab}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
        >
          {TabListData.map((item, index) => (
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
      <Box display={'flex'} flexDirection='column'>
        <OutlinedInput style={{ marginBottom: '10px' }} placeholder={TranslateString('Search')} size='small' />
        {haveAddMore ? (
          <Button style={{ marginBottom: '10px' }} size='small' variant='contained' onClick={() => setOpen(true)}>
            <Translations text='Add More' />
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default TabLists
