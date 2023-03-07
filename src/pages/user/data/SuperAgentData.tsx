import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import superAgentEditModal from "@/pages/user/components/modal/SuperAgentEditModal";
import React from "react";

interface superAgentData {
  SuperAgent: string;
  SiteName: any;
  MobileNumber: string;
  Email: any;
  DateCreated: any;
  LastUpdate: any;
  SecurityFunds: any;
  Action: JSX.Element[]
}

function createSuperAgentRows(
  SuperAgent: string,
  SiteName: any,
  MobileNumber: any,
  Email: any,
  DateCreated: any,
  LastUpdate: any,
  SecurityFunds: any,
  Action: JSX.Element[]
): superAgentData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastUp = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastUpdate = `${lastUp.getFullYear()}-${(lastUp.getMonth() + 1).toString().padStart(2, '0')}-${lastUp.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastUp.getMinutes().toString().padStart(2, '0')}:${lastUp.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { SuperAgent, SiteName, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastUpdate: formattedLastUpdate, SecurityFunds, Action};
}

const superagentAction = [
  <Box key={`superagentAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <ToggleButton/>
    <EditBtn modal={superAgentEditModal}/>
  </Box>
]

const superagentRows = [
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', superagentAction),
];

export default superagentRows
