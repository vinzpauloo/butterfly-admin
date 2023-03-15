const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  //DataGrid
  datagrid: {
    width: '100%',
    backgroundColor: '#FFF'
  },

  //Button
  btnContainer: {
    display: 'flex',
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
  }
}

export default styles
