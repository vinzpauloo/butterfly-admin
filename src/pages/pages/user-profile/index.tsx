import { useAuth } from '@/services/useAuth'
import { Box, Typography, Stack, Button, Avatar, TextField } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';

const UserProfile = () => {
  const auth = useAuth()

  // AGENT FAKE DATA
  const agentFakeData = [
    { name: "Commission March 2023", amount: "¥500"},
    { name: "Overall Earning", amount: "¥12,500"},
    { name: "Registered Users", amount: "250"},
    { name: "Daily Active Users", amount: "200"},
  ]
  const agentLastUpdate = "2023-03-25 08:26:18"

  if (auth?.user?.role === "AGENT")
    return (
      <Box>
        <Stack direction={["column", "row"]} justifyContent="space-between" alignItems="center" gap={4} mb={6}>
          <Typography variant="h4" textTransform="uppercase">My Account</Typography>
          <Button variant="outlined" color="primary" endIcon={<DownloadIcon />}>Download Data</Button>
        </Stack>
        <Stack direction={["column", "column", "row"]} gap={10}>
          <Stack width={["100%", "100%", "30%"]} flexDirection="column" gap={3}>
            <Box bgcolor="white" boxShadow={4} borderRadius={1} justifyContent="center" display="flex" flexDirection="column" alignItems="center" py={6} gap={2}>
              <Avatar alt="Remy Sharp" sx={{ width: 200, height: 200 }} src="https://fastly.picsum.photos/id/353/200/200.jpg?hmac=0pI-jYBxEC3AHp_0G8YowhiQRtQdv6u1Kfvuf0c9VNQ" />
              <Button variant="contained" color="secondary" size="small">Upload Image</Button>
              <Typography fontWeight={500}>Agent Code: 2023AGNT-01</Typography>
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
              <Stack direction={["column", "row"]} alignItems={["flex-start","center"]} justifyContent="space-between">
                <Typography variant="h6">Account Details</Typography>
                <Typography color="secondary" display="flex">Last Update: {agentLastUpdate}</Typography>
              </Stack>
              <TextField label="Name" variant="outlined"/>
              <Box display="flex" justifyContent="space-between" gap={[2,6,6]}>
                <TextField  label="Username" variant="outlined" fullWidth />
                <TextField label="Password" type="password" variant="outlined" fullWidth />
              </Box>
              <Box display="flex" justifyContent="space-between" gap={[2,6,6]}>
                <TextField label="Mobile Number" type="number" variant="outlined" fullWidth sx={textFieldStyle} />
                <TextField label="Email Address" type="email" variant="outlined" fullWidth />
              </Box>
            </Stack>
            <Stack justifyContent="center" alignItems="center" direction="row" gap={[2,6,6]}>
              <Button variant="outlined" color="error" sx={{textTransform:"uppercase"}}>Cancel</Button>
              <Button variant="outlined" color="primary" sx={{textTransform:"uppercase"}}>Update</Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    )
  
  else 
    return (
      <>PROFILE FOR {auth?.user?.role} IS STILL WIP</>
    )
}


UserProfile.acl = {
  action: 'read',
  subject: 'shared-page'
}

const textFieldStyle = {
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  }
}

export default UserProfile
