const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'space-between'
    },
    mb: 0
  },
  usersButtons: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mb: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 0,
      xl: 0
    }
  },
  userButton: {
    border: 1,
    height: '56px',
    minWidth: {
      xs: '224px',
      sm: 'auto',
      md: 'auto',
      lg: '224px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    },
    textTransform: 'uppercase'
  },
  linkButton: {
    textDecoration: 'none'
  },
  createAccount: {
    border: 1,
    height: '56px',
    minWidth: '224px',
    width: {
      xs: '100%',
      md: '100%',
      lg: '224px'
    },
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
      color: 'white'
    }
  },
  tableContainer: {
    minHeight: 540,
    overflowX: 'auto'
  },
  paginationContainer: {
    margin: '0 auto'
  },
  paginationContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    fontSize: 12,
    color: 'black'
  },
  text: {
    color: 'black',
    fontSize: 12
  },
  pageNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 2,
    marginLeft: 2,
    marginRight: 2,
    cursor: 'pointer'
  },
  searchContainer: {
    padding: 5,
    borderTop: '1px solid black'
  },
  cardHeader: {
    margin: 0,
    padding: 0
  },
  searchInput: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    padding: 0,
    gap: 5
  },
  fullWidth: {
    width: '100%'
  },
  dataGrid: {
    padding: 5
  }
}

export default styles
