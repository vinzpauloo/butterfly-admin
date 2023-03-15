const styles = {
  t3Container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: 5,
    marginTop: 5
  },
  t3Layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%'
    },
    height: '70dvh',
    borderRadius: '12px',
    padding: 0,
    overflow: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '20px'
    }
  },
  templateContainer: {
    margin: '0 50px 0 50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    backgroundColor: 'grey',
    width: {
      xs: '100%',
      lg: '100%'
    },
    height: '20dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  //Grid
  paper: {
    backgroundColor: 'grey',
    padding: {
      xs: '40px',
      lg: '50px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  //Table
  tableContainer: {
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%',
      lg: '50%'
    },
    height: '70dvh',
    borderRadius: '12px',
    padding: 5
  }
}

export default styles
