import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import superAgentEditModal from "@/pages/user/components/modal/SuperAgentEditModal";
import React from "react";

interface superAgentData {
  id: any;
  SuperAgent: string;
  SiteName: any;
  MobileNumber: string;
  Email: any;
  DateCreated: any;
  LastUpdate: any;
  SecurityFunds: any;
}

function createSuperAgentRows(
  id: any,
  SuperAgent: string,
  SiteName: any,
  MobileNumber: any,
  Email: any,
  DateCreated: any,
  LastUpdate: any,
  SecurityFunds: any,
): superAgentData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastUp = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastUpdate = `${lastUp.getFullYear()}-${(lastUp.getMonth() + 1).toString().padStart(2, '0')}-${lastUp.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastUp.getMinutes().toString().padStart(2, '0')}:${lastUp.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { id, SuperAgent, SiteName, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastUpdate: formattedLastUpdate, SecurityFunds};
}

const superagentRows = [
  createSuperAgentRows(1, 'SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥'),
  createSuperAgentRows(2,'SA-02', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥'),
  createSuperAgentRows(3,'SA-03', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥'),
  createSuperAgentRows(4,'SA-04', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(5,'SA-05', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(6,'SA-06', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(7,'SA-07', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(8,'SA-08', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(9,'SA-09', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(10,'SA-10', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(11,'SA-11', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(12,'SA-12', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(13,'SA-13', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
  createSuperAgentRows(14,'SA-14', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', ),
];

export default superagentRows
