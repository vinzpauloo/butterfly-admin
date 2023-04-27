import React, { useState } from 'react'
import { Box, Button, Stack, TextField, Avatar, CircularProgress, Tabs, Tab } from '@mui/material'
import UserService from '@/services/api/UserService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CCFollowersTab from '../components/CCFollowersTab'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import { useAuth } from '@/services/useAuth'
import CCVideosTab from '../components/CCVideosTab'
import CCNewsfeedsTab from '../components/CCNewsfeedsTab'
import CCActiveDonatorsTab from '../components/CCActiveDonatorsTab'

const TabPanel = ({ children, index, value }: any) => {
  return (
    <>
      {value === index && <Stack>{children}</Stack>}
    </>
  )
}

const ContentCreatorProfile = () => {
  const [isProfileSelected, setIsProfileSelected] = useState<boolean>(true)
  const [isOverviewSelected, setIsOverviewSelected] = useState<boolean>(false)
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [coverPhotoURL, setCoverPhotoURL] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [bio, setBio] = useState<string>("")

  // TABS
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const viewProfile = () => {
    setIsProfileSelected(true)
    setIsOverviewSelected(false)
  }

  const viewOverview = () => {
    setIsProfileSelected(false)
    setIsOverviewSelected(true)
  }

  const auth = useAuth()

  const viewByOptions = [
    { sortName: "Followers", component: <CCFollowersTab/>},
    { sortName: "Most Liked Video", component: <CCVideosTab/> },
    { sortName: "Most Liked Newsfeed", component: <CCNewsfeedsTab/> },
    { sortName: "Active Donators", component: <CCActiveDonatorsTab/> },
  ]
  
  // get specific content creators data based on bearer token
  const { getUser, updateUser } = UserService();
  const { isLoading } = useQuery({
    queryKey: ["contentCreatorData"],
    queryFn: () => getUser({
      data: {
        user_id: auth?.user?.id,
      }
    }),
    onSuccess: (data) => {
      console.log(data)
      setProfilePhoto(data?.photo)
      setCoverPhotoURL(data?.cover_photo)
      setUsername(data?.username)
      setEmail(data?.email)
      setBio(data?.biography)
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
        queryKey: ["contentCreatorData"],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });


  //file to be send to back end - WIP
  const [selectedProfPic, setSelectedProfPic] = useState('')
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('')

  const selectProfilePicture = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedProfPic(file)
      previewProfilePicture(file)
    }
  }

  const selectCoverPhoto = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedCoverPhoto(file)
      previewCoverPhoto(file)
    }
  }

  const previewProfilePicture = (file: any) => {
    const reader: any = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
  }

  const previewCoverPhoto = (file: any) => {
    const reader: any = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCoverPhotoPreview(reader.result)
    }
  }

  const UpdateProfile = () => {
    mutateUpdate({
      data: {
        _method: 'put',
        user_id: auth?.user?.id,
        username: username,
        email: email,
        biography: bio,
      }
    });
  }

  const isLoadingOrUpdated = isLoading || updateLoading

  return (
    <Box>
      <Box height={300} position="relative" bgcolor="#bfbfbf"
        sx={{
          backgroundSize: "100% 100%",
          backgroundImage: isLoadingOrUpdated ? null : `url(${coverPhotoPreview !== '' ? coverPhotoPreview : FILE_SERVER_URL + coverPhotoURL})`,
        }}>
        {isLoadingOrUpdated ? 
          <CircularProgress sx={{ position: "absolute", margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }} />
          :
          <>
            <Stack position='absolute' top={24} left={24} gap={2} alignItems='center'>
              <Avatar sx={{ width: 150, height: 150, backgroundSize: "contain" }} src={photoPreview !== '' ? photoPreview : FILE_SERVER_URL + profilePhoto }/>
              <Button variant='contained' size='small' color='secondary' component='label'>
                <input onChange={selectProfilePicture} type='file' hidden />
                {profilePhoto === null ? "Upload" : "Change"}
              </Button>
            </Stack>
            <Button variant="contained" color="secondary" size='small' sx={{ position: "absolute", bottom: 24, right: 24 }} component='label'>
              {coverPhotoURL === null ? "Upload" : "Change"} Cover Photo
              <input onChange={selectCoverPhoto} type='file' hidden />
            </Button>
          </>
        }
      </Box>
      <Stack pt={6} gap={6} alignItems={isLoadingOrUpdated ? "center" : undefined} justifyContent={isLoadingOrUpdated ? "center" : undefined} height={isLoadingOrUpdated ? 300 : "max-content"}>
        {isLoadingOrUpdated ? 
          <CircularProgress />
          : 
          <>
            <Stack direction="row" gap={4} justifyContent={["center", "flex-start", "flex-start"]}>
              <Button variant={isProfileSelected ? "contained" : "outlined"} onClick={viewProfile}>Profile</Button>
              <Button variant={isOverviewSelected ? "contained" : "outlined"} onClick={viewOverview}>Overview</Button>
            </Stack>
            {isProfileSelected && !isLoadingOrUpdated && 
              <>
                <Stack direction={["column", "row"]} justifyContent="space-between" gap={6}>
                  <TextField 
                    label="Username" variant="outlined" fullWidth value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <TextField 
                    label="Email Address" variant="outlined" fullWidth value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Stack>
                <Stack direction={["column", "row"]} justifyContent="space-between" gap={6}>
                  <TextField label="Password" variant="outlined" fullWidth />
                  <TextField label="Re-enter password" variant="outlined" fullWidth />
                </Stack>
                <TextField 
                  label="Biography" variant="outlined" fullWidth multiline rows={8} value={bio}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setBio(event.target.value);
                  }}
                />
                <Button variant="contained" sx={{ width: "max-content", alignSelf: "center", textTransform: "uppercase" }} onClick={UpdateProfile}>Update</Button>
              </>
            }
            {isOverviewSelected && !isLoadingOrUpdated &&
              <Stack bgcolor="white" boxShadow={4} borderRadius={1} p={4} gap={4}>
                <Tabs value={tabIndex} onChange={onTabChange} variant='scrollable' centered allowScrollButtonsMobile>
                  {viewByOptions.map((item, index) => 
                    <Tab key={index} label={item.sortName} />
                  )}
                </Tabs>
                {viewByOptions.map((item, index) =>
                  <TabPanel value={tabIndex} index={index} key={index}>
                    {item.component}
                  </TabPanel>
                )}
              </Stack>
            }
          </>
        }
      </Stack>
    </Box>
  )
}

export default ContentCreatorProfile