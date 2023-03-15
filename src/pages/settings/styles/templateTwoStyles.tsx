const styles = {
  t2Container: {
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
  t2Layout: {
    display: 'flex',
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%'
    },
    height: '70dvh',
    borderRadius: '12px',
    padding: 5,
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
    flexDirection: 'row',
    gap: 10,
    overFlow: 'auto',
    minWidth: {
      xs: '400%',
      sm: '200%',
      md: '200%',
      lg: '200%'
    }
  },
  template: {
    backgroundColor: 'grey',
    width: '300px',
    height: '55vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginBottom: '10px',
    border: '1px solid #9747FF',
    padding: '0.25em 0.75em',
    color: '#9747FF',
    fontWeight: '600'
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
