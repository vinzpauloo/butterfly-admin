import React, { useState } from 'react'
import { Box, Stack, Typography, Button, Avatar, TextField, CircularProgress } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import UserService from '@/services/api/UserService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import formatDate from '@/utils/formatDate'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import { useAuth } from '@/services/useAuth';

const AgentProfile = () => {
  const [agentID, setAgentID] = useState<number>()
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [mobileNo, setMobileNo] = useState<string>("")
  const [lastUpdate, setLastUpdate] = useState<string>("")

  //photo file to be send to back end
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
  
  // AGENT FAKE DATA
  const agentFakeData = [
    { name: "Commission March 2023", amount: "¥500" },
    { name: "Overall Earning", amount: "¥12,500" },
    { name: "Registered Users", amount: "250" },
    { name: "Daily Active Users", amount: "200" },
  ]

  const auth = useAuth()

  // get agent data based on bearer token
  const { getUser, updateUser } = UserService();
  const { isLoading, data } = useQuery({
    queryKey: ["agentData"],
    queryFn: () => getUser({user_id: auth?.user?.id}),
    onSuccess: (data) => {
      console.log(data)
      setAgentID(data?.id)
      setProfilePhoto(data?.photo)
      setUsername(data?.username)
      setEmail(data?.email)
      setMobileNo(data?.mobile)
      setLastUpdate(data?.updated_at)
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
        queryKey: ["agentData"],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const UpdateProfile = () => {
    mutateUpdate({
      user_id: auth?.user?.id,
      data: {
        _method: 'put',
        username: username,
        email: email,
        mobile: data?.mobile !== mobileNo ? mobileNo : undefined,
        photo: selectedProfPic !== '' ? selectedProfPic : null,
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
          <Stack direction={["column", "row"]} justifyContent="space-between" alignItems="center" gap={4} mb={6}>
            <Typography variant="h4" textTransform="uppercase">My Account</Typography>
            <Button variant="outlined" color="primary" endIcon={<DownloadIcon />}>Download Data</Button>
          </Stack>
          <Stack direction={["column", "column", "row"]} gap={10}>
            <Stack width={["100%", "100%", "30%"]} flexDirection="column" gap={3}>
              <Box bgcolor="white" boxShadow={4} borderRadius={1} justifyContent="center" display="flex" flexDirection="column" alignItems="center" py={6} gap={2}>
                <Avatar alt="Remy Sharp" sx={{ width: 200, height: 200 }} src={photoPreview !== '' ? photoPreview : FILE_SERVER_URL + profilePhoto} />
                <Button variant="contained" color="secondary" size="small" component='label'>
                  Upload Image
                  <input onChange={selectProfilePicture} type='file' hidden />
                </Button>
                <Typography fontWeight={500}>Agent Code: {agentID}</Typography>
              </Box>
              {agentFakeData.map((item, index) =>
                <Box key={index} bgcolor="white" boxShadow={4} borderRadius={1} justifyContent="space-between" display="flex" alignItems="center" p={6}>
                  <Typography fontWeight={500} textTransform="uppercase" variant="body2">{item.name}</Typography>
                  <Typography fontWeight={500} fontSize={24}>{item.amount}</Typography>
                </Box>
              )}
            </Stack>
            <Stack boxShadow={4} borderRadius={1} width={["100%", "100%", "70%"]} direction="column" justifyContent="space-between" gap={10} p={6}>
              <Stack gap={6}>
                <Stack direction={["column", "row"]} alignItems={["flex-start", "center"]} justifyContent="space-between">
                  <Typography variant="h6">Account Details</Typography>
                  <Typography color="secondary" display="flex">Last Update: {formatDate(lastUpdate)}</Typography>
                </Stack>
                <TextField
                  label="Username" variant="outlined" fullWidth value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                />
                <Box display="flex" justifyContent="space-between" gap={[2, 6, 6]}>
                  <TextField
                    label="Mobile Number" variant="outlined" fullWidth sx={textFieldStyle} value={mobileNo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setMobileNo(event.target.value);
                    }}
                  />
                  <TextField
                    label="Email Address" type="email" variant="outlined" fullWidth value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Box>
              </Stack>
              <Stack justifyContent="center" alignItems="center" direction="row" gap={[2, 6, 6]}>
                {/* <Button variant="outlined" color="error" sx={{ textTransform: "uppercase" }}>Cancel</Button> */}
                <Button variant="outlined" color="primary" sx={{ textTransform: "uppercase" }} onClick={UpdateProfile}>Update</Button>
              </Stack>
            </Stack>
          </Stack>
        </>
      }
    </Box>
  )
}

export default AgentProfile

const textFieldStyle = {
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  }
}