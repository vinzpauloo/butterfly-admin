// ** React Imports
import { ReactNode, ChangeEvent, useState, KeyboardEvent, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import authConfig from 'src/configs/auth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Hooks
import { useAuth } from '@/services/useAuth'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

import QRCode from 'react-qr-code'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/api/AuthService'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues: { [key: string]: string } = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const TwoFA = () => {
  const userData = JSON.parse(window.localStorage.getItem(authConfig.tempUserDataKeyname) as string)
  const twoFAData = JSON.parse(window.localStorage.getItem(authConfig.twoFADataKeyName) as string)
  const accessToken = window.localStorage.getItem(authConfig.tempStorageTokenKeyName)

  const { googleAuthenticator } = AuthService()

  // ** State
  const [isBackspace, setIsBackspace] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState(twoFAData?.qr2faGoogle || null)

  // ** Hooks
  const theme = useTheme()
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const router = useRouter()
  const auth = useAuth()

  // ** Vars
  const errorsArray = Object.keys(errors)
  const loginPath = '/loginv2'

  if (!userData || !accessToken || !twoFAData) {
    router.replace(loginPath)

    return null
  }

  const { mutate: mutate2fa } = useMutation(googleAuthenticator, {
    onSuccess: data => {
      // Clear temporary
      window.localStorage.removeItem(authConfig.twoFADataKeyName)
      window.localStorage.removeItem(authConfig.tempUserDataKeyname)
      window.localStorage.removeItem(authConfig.tempStorageTokenKeyName)

      // Create new cache
      window.localStorage.setItem(authConfig.userDataKeyname, JSON.stringify(userData))
      window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)

      // Go to redirect URL
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      // Set user context
      auth.setUser(userData)

      // Go to redirect URL
      router.replace(redirectURL as string)
    },
    onError: error => {
      console.log('mutate2fa error', error)

      setError('twoFA', {
        type: 'custom',
        // @ts-ignore
        message: error.data.error.message
      })
    }
  })

  const onSubmit = (data: Object) => {
    const code = Object.values(data).join('')

    // Validate code
    mutate2fa({ code, token: accessToken })
  }

  const handleChange = (event: ChangeEvent, onChange: (...event: any[]) => void) => {
    onChange(event)
    clearErrors()

    // @ts-ignore
    const form = event.target.form
    const index = [...form].indexOf(event.target)
    if (form[index].value && form[index].value.length) {
      form.elements[index + 1].focus()
    }
    event.preventDefault()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event: ChangeEvent) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
              Two Step Verification 💬
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: 'text.secondary', textAlign: 'center' }}>
            Type your 6 digit security code
          </Typography>
          <form onSubmit={handleSubmit((data: Object) => onSubmit(data))}>
            <CleaveWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...(errorsArray.length && {
                  '& .invalid:focus': {
                    borderColor: theme => `${theme.palette.error.main} !important`,
                    boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                  }
                })
              }}
            >
              {renderInputs()}
            </CleaveWrapper>
            {errorsArray.length && !errors.twoFA ? (
              <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
            ) : null}

            {errors.twoFA ? <FormHelperText sx={{ color: 'error.main' }}>{errors.twoFA.message}</FormHelperText> : null}
            <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>
              Verify My Account
            </Button>
          </form>
          {qrCode && (
            <>
              <Typography sx={{ mt: 8, fontWeight: 400, color: 'text.secondary', textAlign: 'center' }}>
                Scan QR using your Google Authenticator App
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QRCode value={qrCode || ''} />
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <FooterIllustrationsV1 />
    </Box>
  )
}

TwoFA.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

TwoFA.guestGuard = true

export default TwoFA
