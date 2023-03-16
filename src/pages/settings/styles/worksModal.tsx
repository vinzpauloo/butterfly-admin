const styles = {
  //WorksButton
  workBtn: {
    border: '1px solid black',
    marginBottom: 5,
    width: {
      xs: '100%',
      lg: 150
    },
    textTransform: 'uppercase',
    fontSize: 12
  },

  //Body
  topButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    }
  },
  content: {
    overflowY: 'auto',
    maxHeight: 'calc(100dvh-200px)',
    backgroundColor: '#E6E6E6'
  },
  media: {
    paddingTop: '86.25%'
  },
  bottomButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E6E6E6',
    padding: {
      xs: 5,
      sm: 5,
      lg: '20px 0 0px 0'
    }
  }
}

export default styles
