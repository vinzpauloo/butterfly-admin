const styles = {
  t5Container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'column'
    },
    gap: 5,
    marginTop: 5
  },
  t5Layout: {
    display: 'flex',
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    height: '25dvh',
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
  template: {
    margin: '0 50px 0px 50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    overFlow: 'auto',
    minWidth: {
      xs: '250%',
      sm: '170%',
      md: '150%',
      lg: '100%'
    }
  },

  //Table
  tableContainer: {
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    height: '45dvh',
    borderRadius: '12px',
    padding: 5
  },
  tableScroll: {
    overflow: 'auto',
    maxHeight: '35dvh',
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
  table: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'row',
      lg: 'row'
    },
    gap: 5,
    width: '100%',
    overFlow: 'auto',
    minWidth: {
      xs: '150%',
      lg: '150%'
    },
    minHeight: {
      xs: '150%',
      lg: 'auto'
    }
  },

  //Button
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  assignBtn: {
    backgroundColor: '#FFF',
    color: '#000',
    marginTop: 5,
    width: 120,
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0',
      color: '#FFF'
    }
  },
  finishBtn: {
    backgroundColor: '#9747FF',
    color: '#FFF',
    marginTop: 5,
    width: 120,
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    }
  },

  //LandScape
  landscape: {
    backgroundColor: 'grey',
    width: {
      xs: '650px',
      lg: '600px'
    },
    height: {
      xs: '80px',
      lg: '120px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default styles
