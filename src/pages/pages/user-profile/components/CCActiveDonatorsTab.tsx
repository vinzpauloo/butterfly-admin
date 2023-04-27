import React from 'react'
import { Stack, Box, Avatar, Typography } from '@mui/material'

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

const CCActiveDonatorsTab = () => {
  return (
    <Stack maxHeight={400} gap={4} direction="row" flexWrap="wrap" sx={{ overflowY: "scroll" }} px={6}>
      {fakeFollowers.map((item, index) =>
        <Box key={index} display="flex" alignItems="center" gap={2} width={200}>
          <Avatar alt="Remy Sharp" src={item.photoURL} sx={{ width: 42, height: 42 }} />
          <Typography sx={{ wordBreak: 'break-word' }}>{item.name}</Typography>
        </Box>
      )}
    </Stack>
  )
}

export default CCActiveDonatorsTab