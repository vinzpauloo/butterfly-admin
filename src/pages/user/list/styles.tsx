const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
  buttonContainer : {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row',
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'space-between',
    },
    mb: 5
  },
  usersButtons: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mb: 5
  },
  userButton: {
    border: 1,
    height: '56px',
    minWidth: '224px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white',
    },
    textTransform: 'uppercase',
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
      lg: '224px',
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
      color: 'white',
    },
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
    fontSize: 12,
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
    cursor: 'pointer',
  }
}

export default styles;
