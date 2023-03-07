import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import contentCreatorEditModal from "@/pages/user/components/modal/ContentCreatorEditModal";
import React from "react";

interface contentCreatorData {
  Username: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastUpdate: any;
  Action: JSX.Element[]
}

function createContentCreatorData(
  Username: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastUpdate: number,
  Action: JSX.Element[],
): contentCreatorData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { Username, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastUpdate: formattedLastLog, Action};
}

const contentcreatorAction = [
  <Box key={`contentcreatorAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <ToggleButton/>
    <EditBtn modal={contentCreatorEditModal}/>
  </Box>
]

const contentcreatorRows = [
  createContentCreatorData('Yuxuan Hu', +639173263512, `cc@account.com`, 1632620222000, 1643320222000, contentcreatorAction),
  createContentCreatorData('Wei Tao Bambang', +639276562210, `cc@account.com`, 1321812403000, 1323620222000, contentcreatorAction),
  createContentCreatorData('Shi Kai Ding Bang', +639476545510, `cc@account.com`, 1662240621000, 1644420222000, contentcreatorAction),
  createContentCreatorData('Fu Dong Da-Fu', +639276522210, `cc@account.com`, 1645137632000, 1643620222000, contentcreatorAction),
  createContentCreatorData('Aiguo Chen', +639066523310, `cc@account.com`, 1648314228000, 1643621122000, contentcreatorAction),
  createContentCreatorData('Syaoran Taio', +639276573810, `cc@account.com`, 1643229492000, 1643330222000, contentcreatorAction),
  createContentCreatorData('Ming Longwei', +639066523410, `cc@account.com`, 1692217173000, 1642220222000, contentcreatorAction),
  createContentCreatorData('Lee Jiao-Long', +639976599210, `cc@account.com`, 1643223292000, 1643632222000, contentcreatorAction),
  createContentCreatorData('Hua Mu Lan', +639176246210, `cc@account.com`, 1695227173000, 1643330222000, contentcreatorAction),
  createContentCreatorData('Zhe Huang Ti', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, contentcreatorAction),
  createContentCreatorData('Gong Xi', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, contentcreatorAction),
  createContentCreatorData('Fei Long', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, contentcreatorAction),
  createContentCreatorData('Jackie Chan', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, contentcreatorAction),
  createContentCreatorData('Pai Long', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, contentcreatorAction),
]

export default contentcreatorRows
