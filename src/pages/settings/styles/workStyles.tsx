const styles = {
  //Head
  headContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  textFields: {
    width: {
      xs: '100%',
      md: '25%',
      lg: '25%'
    }
  },
  headSecondRow: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    justifyContent: 'space-between',
    gap: {
      xs: 2,
      sm: 2,
      md: 0,
      lg: 0
    }
  },
  headBtns: {
    border: '1px solid black',
    width: {
      xs: '100%',
      md: '100%',
      lg: '25%'
    },
    textTransform: 'uppercase',
    color: '#000'
  },
  template: {
    display: 'flex',
    justifyContent: 'space-between'
  }

  //Body
}

export default styles
