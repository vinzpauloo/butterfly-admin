import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import OperatorEditModal from "@/pages/user/components/modal/OperatorEditModal";
import React from "react";

interface operatorData {
  UserProfile: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastLogin: any;
  Action: JSX.Element[]
}

function createOperatorData(
  UserProfile: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastLogin: number,
  Action: JSX.Element[],
): operatorData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastLogin);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { UserProfile, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastLogin: formattedLastLog, Action};
}

const operatorAction = [
  <Box key={`operatorAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <ToggleButton/>
    <EditBtn modal={OperatorEditModal}/>
  </Box>
]

const operatorRows = [
  createOperatorData('Mèng yáo', +639176543210, `my@account.com`, 1643620222000, 1643620222000, operatorAction),
  createOperatorData('Xiāng', +639176543210, `my@account.com`, 1641812403000, 1643620222000, operatorAction),
  createOperatorData('Niang Meng', +639176543210, `my@account.com`, 1661640621000, 1643620222000, operatorAction),
  createOperatorData('Yao Wun', +639176543210, `my@account.com`, 1645137632000, 1643620222000, operatorAction),
  createOperatorData('Lee Tok Hee', +639176543210, `my@account.com`, 1648314258000, 1643620222000, operatorAction),
  createOperatorData('Aoxiang Sy', +639176543210, `my@account.com`, 1643239492000, 1643620222000, operatorAction),
  createOperatorData('Xiao Ma', +639176543210, `my@account.com`, 1695217173000, 1643620222000, operatorAction),
  createOperatorData('Li Mei', +639176543210, `my@account.com`, 1643220692000, 1643620222000, operatorAction),
  createOperatorData('Jun Tao', +639176543210, `my@account.com`, 1695217173000, 1643620222000, operatorAction),
  createOperatorData('Wang Fei', +639176543210, `my@account.com`, 1641811602000, 1643620222000, operatorAction),
  createOperatorData('Chun Lee', +639176543210, `my@account.com`, 1641811602000, 1643620222000, operatorAction),
  createOperatorData('Fei Long', +639176543210, `my@account.com`, 1641811602000, 1643620222000, operatorAction),
  createOperatorData('Jackie Chan', +639176543210, `my@account.com`, 1644326766000, 1643620222000, operatorAction),
  createOperatorData('Pai Long', +639176543210, `my@account.com`, 1644326766000, 1643620222000, operatorAction),
];

export default operatorRows
