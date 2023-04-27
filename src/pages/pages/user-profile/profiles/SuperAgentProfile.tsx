import React, { useState } from 'react'
import { Box, Stack, Typography, TextField, Button, Avatar, CircularProgress } from '@mui/material'
import UserService from '@/services/api/UserService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/services/useAuth'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const SuperAgentProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  //file to be send to back end - WIP
  const [selectedProfPic, setSelectedProfPic] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')

  const selectProfilePicture = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedProfPic(file)
      previewProfilePicture(file)
    }
  }

  const previewProfilePicture = (file: any) => {
    const reader: any = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
  }

  const auth = useAuth()

  // get super agent data based on bearer token
  const { getUser, updateUser } = UserService();
  const { isLoading } = useQuery({
    queryKey: ["superAgentData"],
    queryFn: () => getUser({
      data: {
        user_id: auth?.user?.id,
      }
    }),
    onSuccess: (data) => {
      console.log(data)
      setProfilePhoto(data?.photo)
      setUsername(data?.username)
      setEmail(data?.email)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const { mutate: mutateUpdate, isLoading: updateLoading } = useMutation(updateUser, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["superAgentData"],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const UpdateProfile = () => {
    mutateUpdate({
      data: {
        _method: 'put',
        user_id: auth?.user?.id,
        username: username,
        email: email,
      }
    });
  }

  const isLoadingOrUpdated = isLoading || updateLoading

  return (
    <Box>
      {isLoadingOrUpdated ?
        <Box height={400} position="relative">
          <CircularProgress sx={{ position: "absolute", margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }} />
        </Box>
        :
        <>
          <Stack gap={2} mb={8}>
            <Typography variant="h5">Good Morning, {username}</Typography>
            <Typography fontWeight={500}>Welcome back, nice to see you again!</Typography>
          </Stack>
          <Stack direction={["column", "column", "row"]} gap={[10, 10, "10%"]}>
            <Stack width={["100%", "100%", "60%"]} gap={6}>
              <Avatar sx={{ width: 200, height: 200 }} src={photoPreview !== '' ? photoPreview : FILE_SERVER_URL + profilePhoto} />
              <Button variant='contained' size='small' color='secondary' component='label' sx={{width:'max-content', marginLeft:14}}>
                <input onChange={selectProfilePicture} type='file' hidden />
                {profilePhoto === null ? "Upload" : "Change"}
              </Button>
              <TextField
                label="Username" variant="outlined" fullWidth value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
              />
              <Box display="flex" flexDirection={['column', 'row']} justifyContent="space-between" gap={6}>
                <TextField label="Password" type="password" variant="outlined" fullWidth />
                <TextField label="Re-enter password" type="password" variant="outlined" fullWidth />
              </Box>
              <Box display="flex" flexDirection={['column', 'row']} justifyContent="space-between" gap={6}>
                <TextField label="Name of Site" variant="outlined" fullWidth />
                <TextField
                  label="Email Adress" type="email" variant="outlined" fullWidth value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                  }}
                />
              </Box>
              <Box display="flex" flexDirection={['column', 'row']} justifyContent="space-between" gap={6}>
                <TextField label="Company Name" variant="outlined" fullWidth />
                <TextField label="Company Code" variant="outlined" fullWidth />
              </Box>
              <Stack justifyContent="center" alignItems="center" direction="row" gap={6}>
                {/* <Button variant="outlined" color="error" sx={{ textTransform: "uppercase" }}>Cancel</Button> */}
                <Button variant="outlined" color="primary" sx={{ textTransform: "uppercase" }} onClick={UpdateProfile}>Update</Button>
              </Stack>
            </Stack>
            <Stack width={["100%", "100%", "30%"]} gap={6}>
              <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
                <Typography fontWeight={500} textTransform="uppercase" variant="caption">Latest Deposit</Typography>
                <Typography fontWeight={500} fontSize={24}>¥125,000</Typography>
                <Typography variant="subtitle2">Compared to (¥100,000 last month)</Typography>
                <Typography variant="subtitle2">Date Deposited: 2023-03-03 12:00:00</Typography>
              </Box>
              <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
                <Typography fontWeight={500} textTransform="uppercase" variant="caption">Income (VIP and Gold Coins)</Typography>
                <Typography fontWeight={500} fontSize={24}>¥30,000</Typography>
                <Typography variant="subtitle2">As of 2023-03-03 12:00:00</Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>Track</Button>
              </Box>
              <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
                <Typography fontWeight={500} textTransform="uppercase" variant="caption">Total Donations - Live</Typography>
                <Typography fontWeight={500} fontSize={24}>¥100,000</Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>Track</Button>
              </Box>
            </Stack>
          </Stack>
        </>
      }
    </Box>
  )
}

export default SuperAgentProfile