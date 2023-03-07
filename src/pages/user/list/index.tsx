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
} from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';

// ** Other Imports
import UserLayoutNoPadding from "@/layouts/UserLayoutNoPadding";
import operatorColumns from "@/pages/user/data/OperatorColumn";
import superAgentColumns from "@/pages/user/data/SuperAgentColumn";
import contentCreatorColumns from "@/pages/user/data/ContentCreatorColumn";
import operatorRows from "@/pages/user/data/OperatorData";
import superagentRows from "@/pages/user/data/SuperAgentData";
import contentcreatorRows from "@/pages/user/data/ContentCreatorData";
import styles from './styles'

// ** Custom Layout Style Components
const BoxBG = styled(Box)(({ theme }) => {
  const bgPath = '/images/pages/user-bg.png';

  return {
    backgroundImage: `url("${bgPath}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 75%',
    backgroundColor: '#d3d6df',
    padding: 10,
    height: 'auto',

    [theme.breakpoints.up('sm')]: {
      padding: 80,
    }
  };
});

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
      <Box sx={styles.container}>
        <Box sx={styles.buttonContainer}>
          <Box sx={styles.usersButtons}>
            <Button onClick={handleOperatorsClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'operators' ? '#9747FF' : '#FFF',
              color: activeBtn === 'operators' ? '#FFF' : 'black'}}>
              Operators
            </Button>
            <Button onClick={handleSuperAgentClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'superagent' ? '#9747FF' : '#FFF',
              color: activeBtn === 'superagent' ? '#FFF' : 'black'}}>
              Super Agent
            </Button>
            <Button onClick={handleContentCreatorsClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : '#FFF',
              color: activeBtn === 'contentcreators' ? '#FFF' : 'black'}}>
              Content Creators
            </Button>
          </Box>

          <Link
            style={styles.linkButton}
            href={{
              pathname: activeBtn === 'operators' ? 'list/CreateAccount' : activeBtn === 'superagent' ? 'list/CreateAccount' : 'list/CreateAccount',
              query: { activeBtn }
            }}>
            <Button sx={styles.createAccount}>Create Account</Button>
          </Link>
        </Box>
        <Root sx={styles.tableContainer}>
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
        <Box style={styles.paginationContainer}>
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
                <Box style={styles.paginationContent}>
                  <IconButton
                    onClick={() => onPageChange(null, page - 1)}
                    disabled={page === 0}
                    aria-label="previous page"
                  >
                    <ArrowBackIos sx={styles.icon} />
                    <Typography style={{...styles.text,paddingLeft: '4px'}}>Prev</Typography>
                  </IconButton>
                  {[0, 1].map((pageNumber) => (
                    <Box
                      key={pageNumber}
                      style={{...styles.pageNumber,backgroundColor: page === pageNumber ? '#9747FF' : 'white',
                        color: page === pageNumber ? 'white' : 'black',}}
                      onClick={() => onPageChange(null, pageNumber)}
                    >
                      {pageNumber + 1}
                    </Box>
                  ))}
                  <IconButton
                    onClick={() => onPageChange(null, page + 1)}
                    disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
                    aria-label="next page"
                    sx={styles.icon}
                  >
                    <Typography sx={{...styles.text,paddingRight: '4px'}}>Next</Typography>
                    <ArrowForwardIos sx={styles.icon} />
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
