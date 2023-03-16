const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-start',
      md: 'space-between',
      lg: 'space-between'
    },
    alignItems: 'center',
    padding: 10,
    gap: [5, 5, 0]
  },
  announcements: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  announceText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 500
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
      lg: '324px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    textTransform: 'uppercase',
    color: 'black',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  dataGrid: {
    padding: 5
  }
}

export default styles
