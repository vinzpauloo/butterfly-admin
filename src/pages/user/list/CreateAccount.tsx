// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Other Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'
import CreateForm from '@/pages/user/components/form/CreateForm'
import CreateCreator from '../components/form/CreateCreator'
import CreateSuperAgent from '../components/form/CreateSuperAgent'
import styles from './StyleSheetCreateAccount'

const CreateAccount = () => {
  // ** Styled Components
  const BoxBG = styled(Box)(({ theme }) => {
    return {
      backgroundColor: 'inherit',
      padding: 10,
      height: 'auto',

      [theme.breakpoints.up('sm')]: {
        padding: 80,
        height: '100dvh'
      }
    }
  })

  const router = useRouter()
  const param = router.query

  const handleOperatorClick = () => {
    setActiveBtn('SUPERVISOR')
  }

  const handleSuperAgentClick = () => {
    setActiveBtn('SA')
  }

  const handleCreatorClick = () => {
    setActiveBtn('CC')
  }

  const [isMobile, setIsMobile] = useState(false)
  const [activeBtn, setActiveBtn] = useState('')
  useEffect(() => {
    setActiveBtn(`${param.role}`)
    console.log(param.role)
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <BoxBG>
      <Box sx={styles.container}>
        <Box>
          <Box sx={styles.userButtons}>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'SUPERVISOR' ? '#9747FF' : 'white',
                color: activeBtn === 'SUPERVISOR' ? 'white' : 'black'
              }}
              onClick={handleOperatorClick}
            >
              <Image src='/images/icons/project-icons/operator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'SUPERVISOR' ? 'white' : 'black' }}>
                Operator
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'SA' ? '#9747FF' : 'white',
                color: activeBtn === 'SA' ? 'white' : 'black'
              }}
              onClick={handleSuperAgentClick}
            >
              <Image src='/images/icons/project-icons/superagent-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'SA' ? 'white' : 'black' }}>
                Super Agent
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'CC' ? '#9747FF' : 'white',
                color: activeBtn === 'CC' ? 'white' : 'black'
              }}
              onClick={handleCreatorClick}
            >
              <Image src='/images/icons/project-icons/creator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'CC' ? 'white' : 'black' }}>
                Content Creator
              </Typography>
            </Button>
          </Box>
        </Box>

        {activeBtn === 'SUPERVISOR' ? (
          <CreateForm />
        ) : activeBtn === 'SA' ? (
          <CreateSuperAgent />
        ) : (
          activeBtn === 'CC' && <CreateCreator />
        )}
      </Box>
    </BoxBG>
  )
}

CreateAccount.contentHeightFixed = false
CreateAccount.getLayout = (page: ReactNode) => (
  <UserLayoutNoPadding contentHeightFixed={CreateAccount.contentHeightFixed}>{page}</UserLayoutNoPadding>
)

export default CreateAccount
