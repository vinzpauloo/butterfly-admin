const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'center'
    },
    gap: 10
  },
  userButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  userButton: {
    border: 1,
    height: '62px',
    minWidth: {
      xs: '232px',
      lg: '332px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  text: {
    flexGrow: 1
  },
  formContainer: {
    border: '1px solid grey',
    borderRadius: '5px'
  },
  operatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 2
  },
  creatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 4
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#A459D1',
    padding: 4
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
    color: '#FFF'
  },
  innerFormContainer: {
    padding: 4,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  halfWidth: {
    width: '50%'
  },
  formMargin: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
    marginBottom: 20
  },
  bottomFormButtons: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    mt: 5,
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out'
    }
  },
  continueButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#9747FF'
    }
  },

  // Logo Styling
  input: {
    display: 'none'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default styles
