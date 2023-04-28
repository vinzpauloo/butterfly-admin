// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Stack, Typography, LinearProgress, Avatar } from '@mui/material'

// ** Project/Other Imports
import Header from './components/Header'
import SalesAndAddedUsers from './components/SalesAndAddedUsers'
import UsersGrowthDonutChart from './components/UsersGrowth'
import CommissionDataBarChart from './components/CommissionData'
import RechartsAreaChart from './components/charts/AreaChart'

// FAKE DATA
const Donators = [
  {
    name: 'Agent 1',
    amount: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAXJHDeDHZpin2Ipp-bYGUusSYtdNYSfnC2SR-Ccs&s'
  },
  {
    name: 'Agent 2',
    amount: 80,
    image:
      'https://e0.pxfuel.com/wallpapers/520/939/desktop-wallpaper-tzuyu-pics-on-twitter-korean-girl-groups-beautiful-girl-kpop-girls-chou-tzuyu.jpg'
  },
  {
    name: 'Agent 3',
    amount: 70,
    image:
      'https://lh3.googleusercontent.com/VuORb5_LMqVjM3yOCUXR-3Qaj2BMYquGH3U8zUr-8vAMxh0pTo74XA6YeFFJwnVQoFNWfR00kYgQzaUbki3kJzvAky5t8-cF=w960-rj-nu-e365'
  },
  {
    name: 'Agent 4',
    amount: 60,
    image: 'https://t4.ftcdn.net/jpg/05/09/77/43/360_F_509774386_cluUI2zke6KYaiyWpQcyWYb2YUly6BD3.jpg'
  },
  {
    name: 'Agent 5',
    amount: 50,
    image:
      'https://media.istockphoto.com/id/544960416/photo/portrait-of-young-successful-woman-at-home-in-seoul.jpg?s=612x612&w=0&k=20&c=GnrI_vynkMl_hUgxwPj_h0NqjUFQEP46DTVwe71m9OU='
  },
  {
    name: 'Agent 6',
    amount: 40,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLfhxsHCNs2L94X6X9z77-p7Rb9URSxxVMg&usqp=CAU'
  },
  {
    name: 'Agent 7',
    amount: 30,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjGo6Z2XwBaL9oOJ9mj9RITz4dfr10ouX9w&usqp=CAU'
  },
  {
    name: 'Agent 8',
    amount: 20,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlDmFNOStpnBAWj1wNpNq-2Zqx6pk-HOqrjy5RnTjFehF8iwmmTHCJM5JXET0M1qB9EA8&usqp=CAU'
  },
  {
    name: 'Agent 9',
    amount: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfi1lHNrGyVIsGDamFWEhdLoOHMlr8Bi83dA&usqp=CAU'
  },
  {
    name: 'Agent 10',
    amount: 20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36nmFXBhuGdMXr5IS4nDNlspxF-XWdYkmZA&usqp=CAU'
  },
  {
    name: 'Agent 11',
    amount: 20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExBHyg3upymaEIHfbi3zotS2d1L3FxD-r1Q&usqp=CAU'
  },
  {
    name: 'Agent 12',
    amount: 20,
    image:
      'https://media.herworld.com/public/2020/07/kbeauty-korean-beauty-hack-hair-parting-768x768.jpg?compress=true&quality=80&w=480&dpr=2.6'
  },
  {
    name: 'Agent 13',
    amount: 20,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSQvywDf_ApoJc4W9bn6ZNku1aRrBel7nCeNpk5eFdPHSbe-ep8KMD0o8h6DU8xEV9rs&usqp=CAU'
  },
  {
    name: 'Agent 14',
    amount: 20,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hxY4Vwo3czP2bnzFcBmqmo_nShaoTI4OMfO25LQoAx3m3Hgw8pUN8uh8YepJvKaLp4g&usqp=CAU'
  }
]

const AgentDashboard = () => {
  return (
    <Stack>
      <Header />
      <Stack sx={styles.container}>
        {/* First Column Start */}
        <Stack sx={styles.leftWrap} gap={styles.gap244}>
          <SalesAndAddedUsers />
          <CommissionDataBarChart />
          <Stack sx={styles.linearProgressWrapper}>
            {Donators.map((item, index) => (
              <Stack key={index} direction='row' gap={4}>
                <Avatar src={item?.image} />
                <Box width='100%'>
                  <Typography>{item.name}</Typography>
                  <LinearProgress
                    valueBuffer={100}
                    variant='buffer'
                    color={index === 0 ? 'primary' : 'secondary'}
                    value={item.amount}
                    sx={styles.linearProgress}
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* First Column End */}
        {/* Start of Second Column */}
        <Stack sx={styles.rightWrap} gap={styles.gap244}>
          <Box sx={styles.containers}>
            <Typography variant='subtitle2'>Live update of the Added Users</Typography>
            <Typography variant='h6'>New Users: 500</Typography>
            <Typography fontWeight={500}>Total Users: 2500</Typography>
          </Box>
          <RechartsAreaChart direction='ltr' />
          <UsersGrowthDonutChart />
        </Stack>
        {/* End of Second Column */}
      </Stack>
    </Stack>
  )
}

const styles = {
  gap244: [2, 4, 4],
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    width: '100%',
    gap: {
      xs: 2,
      sm: 2,
      md: 4,
      lg: 6
    }
  },
  leftWrap: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '70%',
      lg: '70%'
    }
  },
  rightWrap: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '30%',
      lg: '30%'
    }
  },
  linearProgressWrapper: {
    overflowY: 'auto',
    maxHeight: '45dvh'
  },

  linearProgress: {
    height: 12,
    borderRadius: {
      xs: '0px',
      sm: '6px',
      md: '6px',
      lg: '0px'
    }
  },

  containers: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    boxShadow: 4,
    px: 6,
    py: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    borderRadius: 1.5
  }
}

export default AgentDashboard
