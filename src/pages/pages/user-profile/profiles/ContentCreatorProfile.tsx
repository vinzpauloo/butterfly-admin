import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Stack, TextField, Avatar, CircularProgress } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import UserService from '@/services/api/UserService'
import { useQuery } from '@tanstack/react-query'
import CCFollowersTab from '../components/CCFollowersTab'

const ContentCreatorProfile = () => {
  const [isProfileSelected, setIsProfileSelected] = useState<boolean>(true)
  const [isOverviewSelected, setIsOverviewSelected] = useState<boolean>(false)
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [coverPhotoURL, setCoverPhotoURL] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [viewBy, setViewTab] = useState<string>("Followers")
  const [searchString, setSearchString] = useState<string>("")

  // VIEW BY MENU UNDER OVERVIEW
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const viewProfile = () => {
    setIsProfileSelected(true)
    setIsOverviewSelected(false)
  }

  const viewOverview = () => {
    setIsProfileSelected(false)
    setIsOverviewSelected(true)
  }

  const viewByOptions = [
    { sortName: "Followers", sortFunction: () => console.log("SORT: AF")},
    { sortName: "Most Liked Video", sortFunction: () => console.log("SORT: MLV") },
    { sortName: "Most Liked Newsfeed", sortFunction: () => console.log("SORT: MLN") },
    { sortName: "Active Donators", sortFunction: () => console.log("SORT: MAD") },
  ]
  
  // get specific content creators data based on bearer token
  const { getSpecificContentCreator } = UserService();
  const { isLoading } = useQuery({
    queryKey: ["contentCreatorData"],
    queryFn: () => getSpecificContentCreator(),
    onSuccess: (data) => {
      console.log(data)
      setProfilePhoto(data?.photo)
      setCoverPhotoURL(data?.cover_photo)
      setUsername(data?.username)
      setEmail(data?.email)
      setBio(data?.note)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Box>
      <Box height={300} position="relative" bgcolor="#bfbfbf" sx={{ backgroundImage: `url(${coverPhotoURL})`, backgroundSize: "100% 100%", }}>
        {isLoading ? 
          <CircularProgress sx={{ position: "absolute", margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }} />
          :
          <>
            <Avatar sx={{ width: 150, height: 150, backgroundSize: "contain", position: "absolute", top: 24, left: 24 }} src={profilePhoto}/>
            <Button variant="contained" color="secondary" sx={{ position: "absolute", bottom: 24, right: 24 }}>
              {coverPhotoURL === null ? "Upload" : "Change"} Cover Photo
            </Button>
          </>
        }
      </Box>
      <Stack pt={6} gap={6} alignItems={isLoading ? "center" : undefined} justifyContent={isLoading ? "center" : undefined} height={isLoading ? 300 : "max-content"}>
        {isLoading ? 
          <CircularProgress />
          : 
          <>
            <Stack direction="row" gap={4} justifyContent={["center", "flex-start", "flex-start"]}>
              <Button variant={isProfileSelected ? "contained" : "outlined"} onClick={viewProfile}>Profile</Button>
              <Button variant={isOverviewSelected ? "contained" : "outlined"} onClick={viewOverview}>Overview</Button>
            </Stack>
            {isProfileSelected && !isLoading && 
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
                <Button variant="contained" sx={{ width: "max-content", alignSelf: "center", textTransform: "uppercase" }}>Update</Button>
              </>
            }
            {isOverviewSelected && !isLoading &&
              <Stack bgcolor="white" boxShadow={4} borderRadius={1} p={4} gap={4}>
                <Stack direction={["column", "row"]} justifyContent="space-between" alignItems="center" gap={4}>
                  <Box>
                    <Button variant="outlined" color="secondary" onClick={openMenu} endIcon={<KeyboardArrowDownIcon />}>{viewBy}</Button>
                    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
                      {viewByOptions.map((item, index) =>
                        <MenuItem key={index} onClick={() => {item.sortFunction(); setViewTab(item.sortName); closeMenu()}}>{item.sortName}</MenuItem>
                      )}
                    </Menu>
                  </Box>
                  <TextField
                    label="Search" variant="outlined" size="small" value={searchString}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchString(event.target.value);
                    }}
                  />
                </Stack>
                {/* MAKE THIS INTO TABS BETTER! */}
                <CCFollowersTab />
              </Stack>
            }
          </>
        }
      </Stack>
    </Box>
  )
}

export default ContentCreatorProfile