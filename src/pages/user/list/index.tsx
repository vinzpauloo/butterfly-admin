// ** React Imports
import React, {useState, ChangeEvent, useEffect, ReactNode} from 'react'

// ** Next Imports
import Image from 'next/image';
import Link from 'next/link'

// ** MUI Imports
import {
  Box,
  TablePagination,
  IconButton,
  Typography,
  Button,
  Switch,
  BoxProps,
} from '@mui/material';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import OperatorEditModal from "../components/OperatorEditModal";
import SuperAgentEditModal from "../components/SuperAgentEditModal";
import ContentCreatorEditModal from "../components/ContentCreatorEditModal";
import UserLayoutNoPadding from "@/layouts/UserLayoutNoPadding";

const bgPath = '/images/pages/user-bg.png'

// ** Styled Components
const BoxBG = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundImage: `url("${bgPath}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 75%',
  backgroundColor: '#d3d6df',
  padding: 10,

  [theme.breakpoints.up('sm')]: {
    padding: 50
  }
}))

interface OperatorToggleBtnProps {
  onChange?: () => void;
  width?: number;
  height?: number;
  padding?: number;
}

interface SuperAgentToggleProps {
  onChange?: () => void;
  width?: number;
  height?: number;
  padding?: number;
}

interface ContentCreatorToggleProps {
  onChange?: () => void;
  width?: number;
  height?: number;
  padding?: number;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: '72px',
  height: '42px',
  '& .MuiSwitch-switchBase': {
    margin: theme.spacing(3.50),
    padding: 0,
    transform: 'translateX(-0.50px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(28px)',
      '& .MuiSwitch-thumb:before': {
        content: "'ON'",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#60FF00'
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    '&:before': {
      content: "'OFF'",
      fontSize: 7,
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 3,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'black'
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#F03738',
    borderRadius: 20 / 2,
  },
}));
const OperatorToggleBtn = ({ onChange, ...otherProps }: OperatorToggleBtnProps) => {

  return (
    <StyledSwitch onChange={(event) => {
      if (event.target.checked) {
        console.log(`TEST FUNCTION`);
      }
      onChange?.();
    }} {...otherProps} />
  );
};

const OperatorEditBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{background: 'transparent', border: 'none'}} onClick={handleModalOpen}>
        <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
      </Button>
      <OperatorEditModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

const SuperAgentToggle = ({ onChange, ...otherProps }: SuperAgentToggleProps) => {

  return (
    <StyledSwitch onChange={(event) => {
      if (event.target.checked) {
        console.log(`TEST FUNCTION`);
      }
      onChange?.();
    }} {...otherProps} />
  );
};

const SuperAgentEditBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{background: 'transparent', border: 'none'}} onClick={handleModalOpen}>
        <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
      </Button>
      <SuperAgentEditModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

const ContentCreatorToggle = ({ onChange, ...otherProps }: ContentCreatorToggleProps) => {

  return (
    <StyledSwitch onChange={(event) => {
      if (event.target.checked) {
        console.log(`TEST FUNCTION`);
      }
      onChange?.();
    }} {...otherProps} />
  );
};

const ContentCreatorEditBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{background: 'transparent', border: 'none'}} onClick={handleModalOpen}>
        <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
      </Button>
      <ContentCreatorEditModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

interface OperatorColumn {
  id: 'UserProfile' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastLogin' | 'Action';
  label: any;
  minWidth?: number;
  align?: 'right';
  format?: (data: number) => string | JSX.Element;
}

interface SuperAgentColumn {
  id: 'SuperAgent' | 'SiteName' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'SecurityFunds' | 'Action';
  label: any;
  format?: (data: number) => string | JSX.Element;
}

interface ContentCreatorColumn {
  id: 'Username' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'Action'
  label: any;
  format?: (data: number) => string | JSX.Element;
}

const operatorColumns: readonly OperatorColumn[] = [
  { id: 'UserProfile',
    label: (
     <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
       <span>User Profile</span>
       <UnfoldMoreTwoToneIcon/>
     </Box>
    )},
  { id: 'MobileNumber',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Mobile Number</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'Email',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Email Address</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'DateCreated',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Date Created</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'LastLogin',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Last Log in</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

const superAgentColumns: readonly SuperAgentColumn[] = [
  { id: 'SuperAgent',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Super Agent</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'SiteName',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Site Name</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'MobileNumber',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Mobile Number</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'Email',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Email</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'DateCreated',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Date Created</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'LastUpdate',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Last Update</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'SecurityFunds',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Security Funds</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

const contentCreatorColumns: readonly ContentCreatorColumn[] = [
  { id: 'Username',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Username</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'MobileNumber',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Mobile Number</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'Email',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Email Address</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'DateCreated',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Date Created</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'LastUpdate',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Last Update</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

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

const operatorAction = [
  <Box key={`operatorAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <OperatorToggleBtn/>
    <OperatorEditBtn/>
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

const superagentAction = [
  <Box key={`superagentAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <SuperAgentToggle/>
    <SuperAgentEditBtn/>
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

const contentcreatorAction = [
  <Box key={`contentcreatorAction`} sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center', gap: 0}}>
    <ContentCreatorToggle/>
    <ContentCreatorEditBtn/>
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

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 15px;
    //table-layout: fixed;
  }

  td,
  th {
    padding: 8px;
  }

  th {
    background-color: black;
    color: white;
  }
  tr {
    border: 1px solid black;
    height: 40px;
    text-align: center;
    background: ghostwhite;
  }
  td {
    max-width: 300px;
    overflow-wrap: break-word;
  }
`;

const UserList = () => {

  const [dataType, setDataType] = useState('operators');
  const [columnType, setColumnType] = useState('operators');
  const [activeBtn, setActiveBtn] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOperatorsClick = () => {
    setDataType('operators');
    setColumnType('operators');
    setActiveBtn('operators')
  }

  const handleSuperAgentClick = () => {
    setDataType('super-agent');
    setColumnType('super-agent');
    setActiveBtn('superagent')
  }

  const handleContentCreatorsClick = () => {
    setDataType('content-creators');
    setColumnType('content-creators');
    setActiveBtn('contentcreators')
  }

  let filteredColumns: any = [];
  if (columnType === 'operators') {
    filteredColumns = operatorColumns;
  } else if (columnType === 'super-agent') {
    filteredColumns = superAgentColumns;
  } else if (columnType === 'content-creators') {
    filteredColumns = contentCreatorColumns;
  }

  let filteredRows: any = [];

  if (dataType === 'operators') {
    filteredRows = operatorRows;
  } else if (dataType === 'super-agent') {
    filteredRows = superagentRows;
  } else if (dataType === 'content-creators') {
    filteredRows = contentcreatorRows;
  }

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setActiveBtn('operators')
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [src, setSrc] = useState('/images/icons/project-icons/operator-icon.png');
  const [agentSrc, setAgentSrc] = useState('/images/icons/project-icons/superagent-icon.png')
  const [creatorSrc,setCreatorSrc] = useState('/images/icons/project-icons/creator-icon.png')

  const handleMouseEnter = () => {
    if (activeBtn === 'operators') {
      setSrc('/images/icons/project-icons/operator-icon-hover.png');
    } else if (activeBtn === 'superagent') {
      setAgentSrc('/images/icons/project-icons/superagent-icon-hover.png');
    } else if (activeBtn === 'contentcreators') {
      setCreatorSrc('/images/icons/project-icons/creator-icon-hover.png');
    }
  };

  const handleMouseLeave = () => {
    if (activeBtn === 'operators') {
      setSrc('/images/icons/project-icons/user-table-icon.png');
    } else if (activeBtn === 'superagent') {
      setAgentSrc('/images/icons/project-icons/superagent-icon.png');
    } else if (activeBtn === 'contentcreators') {
      setCreatorSrc('/images/icons/project-icons/creator-icon.png');
    }
  };

  return (
    <BoxBG>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], justifyContent: ['flex-start', 'space-between'], mb: 5 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
            <Button onClick={handleOperatorsClick} sx={{
              border: 1,
              height: '56px',
              minWidth: '224px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              backgroundColor: activeBtn === 'operators' ? '#9747FF' : '#FFF',
              color: activeBtn === 'operators' ? '#FFF' : 'black',
              transition: 'background-color 0.1s',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
              textTransform: 'uppercase',
            }}>
              Operators
            </Button>
            <Button onClick={handleSuperAgentClick} sx={{
              border: 1,
              height: '56px',
              minWidth: '224px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              backgroundColor: activeBtn === 'superagent' ? '#9747FF' : '#FFF',
              color: activeBtn === 'superagent' ? '#FFF' : 'black',
              transition: 'background-color 0.1s',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
              textTransform: 'uppercase'
            }}>
              Super Agent
            </Button>
            <Button onClick={handleContentCreatorsClick} sx={{
              border: 1,
              height: '56px',
              minWidth: '224px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : '#FFF',
              color: activeBtn === 'contentcreators' ? '#FFF' : 'black',
              transition: 'background-color 0.1s',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
              textTransform: 'uppercase',
            }}>
              Content Creators
            </Button>
          </Box>

          <Link
            style={{textDecoration: 'none'}}
            href={{
              pathname: activeBtn === 'operators' ? 'list/CreateAccount' : activeBtn === 'superagent' ? 'list/CreateAccount' : 'list/CreateAccount',
              query: { activeBtn }
            }}>
            <Button sx={{
              border: 1,
              height: '56px',
              minWidth: '224px',
              width: ['100%', '224px'],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderColor: 'black',
              textTransform: 'uppercase',
              color: 'black',
              backgroundColor: '#FFF',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
            }}>
              Create Account
            </Button>
          </Link>
        </Box>
        <Root sx={{ minHeight: 540, overflowX: 'auto' }}>
          <table aria-label="custom pagination table" >
            <colgroup>
              {filteredColumns.map((column: any) => (
                <col key={column.id} style={{ minWidth: column.minWidth }} />
              ))}
            </colgroup>
            <thead>
            <tr>
              <th style={{display: isMobile ? 'none' : 'table-cell', width: '120px'}}>
                {activeBtn === 'operators' ? (
                  <Image src={src} alt="icon" width={50} height={50}
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                  />
                ): activeBtn === 'superagent' ? (
                  <Image src={agentSrc} alt="icon" width={50} height={50}
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                  />
                ): activeBtn === 'contentcreators' && (
                  <Image src={creatorSrc} alt="icon" width={50} height={50}
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                  />
                )}
              </th>
              {filteredColumns.map((column: any) => (
                <th key={column.id} style={{fontSize: isMobile? 12 : 17}}>
                  {column.label}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <tr role="checkbox" tabIndex={-1} key={row.UserProfile}>
                    <td style={{display: isMobile ? 'none' : 'table-cell', width: '120px'}}></td>
                    {filteredColumns.map((column: any) => {
                      const value = row[column.id];

                      return (
                        <td key={column.id} align={column.align} style={{fontSize: isMobile? 12 : 15}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Root>
        {/*<UserTable/>*/}
        <Box style={{ margin: '0 auto' }}>
          <TablePagination
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={() => ""}
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            ActionsComponent={(props) => {
              const { onPageChange, page } = props;

              return (
                <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => onPageChange(null, page - 1)}
                    disabled={page === 0}
                    aria-label="previous page"
                  >
                    <ArrowBackIos sx={{ fontSize: 12, color: 'black' }} />
                    <Typography style={{color: 'black', fontSize: 12, paddingLeft: '4px'}}>Prev</Typography>
                  </IconButton>
                  {[0, 1].map((pageNumber) => (
                    <Box
                      key={pageNumber}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: 2,
                        backgroundColor: page === pageNumber ? '#9747FF' : 'white',
                        color: page === pageNumber ? 'white' : 'black',
                        marginLeft: 2,
                        marginRight: 2,
                        cursor: 'pointer',
                      }}
                      onClick={() => onPageChange(null, pageNumber)}
                    >
                      {pageNumber + 1}
                    </Box>
                  ))}
                  <IconButton
                    onClick={() => onPageChange(null, page + 1)}
                    disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
                    aria-label="next page"
                    sx={{ fontSize: 12, color: 'black' }}
                  >
                    <Typography sx={{color: 'black', fontSize: 12, paddingRight: '4px'}}>Next</Typography>
                    <ArrowForwardIos sx={{ fontSize: 12, color: 'black' }} />
                  </IconButton>
                </Box>
              );
            }}
          />
        </Box>
      </Box>
    </BoxBG>
  );
};

UserList.contentHeightFixed = false
UserList.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={UserList.contentHeightFixed}>{page}</UserLayoutNoPadding>

export default UserList
