const styles = {
  t1Container: {
    backgroundColor: '#2A3446',
    width: '100%',
    height: {
      xs: '100dvh',
      sm: '100dvh',
      md: '80dvh',
      lg: '50dvh'
    },
    marginTop: 10,
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  t1Layout: {
    backgroundColor: 'grey',
    width: {
      xs: '120%',
      sm: '110%',
      md: '100%',
      lg: '50%'
    },
    height: {
      xs: '300px',
      sm: '300px',
      md: '520px',
      lg: '400px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default styles
