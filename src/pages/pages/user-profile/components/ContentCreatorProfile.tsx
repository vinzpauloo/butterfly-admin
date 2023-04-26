import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Stack, TextField, InputAdornment, Avatar, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


const ContentCreatorProfile = () => {
  const [isProfileSelected, setIsProfileSelected] = useState<boolean>(true)
  const [isOverviewSelected, setIsOverviewSelected] = useState<boolean>(false)

  const viewProfile = () => {
    setIsProfileSelected(true)
    setIsOverviewSelected(false)
  }

  const viewOverview = () => {
    setIsProfileSelected(false)
    setIsOverviewSelected(true)
  }

  // MENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  // CONTENT CREATOR FAKE DATA
  const fakeFollowers = [
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
    { photoURL: "https://i.pravatar.cc/42?img=1", name: "Ziranmei Lao Fang" },
    { photoURL: "https://i.pravatar.cc/42?img=2", name: "Aura Margaret" },
    { photoURL: "https://i.pravatar.cc/42?img=3", name: "Lee Jin" },
    { photoURL: "https://i.pravatar.cc/42?img=4", name: "Shy Type Guy" },
    { photoURL: "https://i.pravatar.cc/42?img=5", name: "Henry China Cavil" },
    { photoURL: "https://i.pravatar.cc/42?img=6", name: "Ninang Meng" },
  ]

  const coverPhotoURL = "https://fastly.picsum.photos/id/281/1400/300.jpg?hmac=PUPrUbcFeh2zYSM4tEPw88xYT4xH0Lnm49b8udyr-0s"

  const sortByFilters = [
    { sortName: "All Followers", sortFunction: () => undefined },
    { sortName: "Most Liked Video", sortFunction: () => undefined },
    { sortName: "Most Liked Newsfeed", sortFunction: () => undefined },
    { sortName: "My Active Donators", sortFunction: () => undefined },
  ]

  return (
    <Box>
      <Box height={300} position="relative" sx={{ backgroundImage: `url(${coverPhotoURL})`}}>
        <Button variant="contained" color="secondary" size="small" sx={{ position: "absolute", bottom: 24, right: 24 }}>Upload / Change</Button>
      </Box>
      <Stack py={6} gap={6}>
        <Stack direction="row" gap={4} justifyContent={["center", "flex-start", "flex-start"]}>
          <Button variant={isProfileSelected ? "contained" : "outlined"} onClick={viewProfile}>My Profile</Button>
          <Button variant={isOverviewSelected ? "contained" : "outlined"} onClick={viewOverview}>Overview</Button>
        </Stack>
        {isProfileSelected && 
          <>
            <Stack direction={["column", "row"]} justifyContent="space-between" gap={6}>
              <TextField label="Username" variant="outlined" fullWidth />
              <TextField label="Email Address" variant="outlined" fullWidth />
            </Stack>
            <Stack direction={["column", "row"]} justifyContent="space-between" gap={6}>
              <TextField label="Password" variant="outlined" fullWidth />
              <TextField label="Re-enter password" variant="outlined" fullWidth />
            </Stack>
            <TextField label="Biography" variant="outlined" fullWidth multiline rows={8} />
            <Button variant="contained" sx={{width:"max-content", alignSelf:"center", textTransform:"uppercase"}}>Update</Button>
          </>
        }
        {isOverviewSelected &&
          <Stack bgcolor="white" boxShadow={4} borderRadius={1} p={4} gap={4}>
            <Stack direction={["column", "row"]} justifyContent="space-between" alignItems="center" gap={4}>
              <Box>
                <Button variant="outlined" color="secondary" size="medium" onClick={openMenu} endIcon={<KeyboardArrowDownIcon />}>Sort By: All Followers</Button>
                <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
                  {sortByFilters.map((item, index) => 
                    <MenuItem key={index}>{item.sortName}</MenuItem>
                  )}
                </Menu>
              </Box>
              <TextField label="Search User" variant="outlined" size="small"/>
            </Stack>
            <Stack maxHeight={400} gap={4} direction="row" flexWrap="wrap" sx={{ overflowY: "scroll" }} p={6}>
              {fakeFollowers.map((item, index) => 
                <Box key={index} display="flex" alignItems="center" gap={2} width={200}>
                  <Avatar alt="Remy Sharp" src={item.photoURL} sx={{ width: 42, height: 42 }} />
                  <Typography sx={{ wordBreak: 'break-word' }}>{item.name}</Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        }
      </Stack>
    </Box>
  )
}

export default ContentCreatorProfile