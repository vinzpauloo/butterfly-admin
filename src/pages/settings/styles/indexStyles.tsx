const styles = {
  container: {
    margin: {
      xs: '0 0 0 0',
      md: '0 0 0 0',
      lg: '2px 200px 2px 200px'
    }
  },
  gradient: {
    background:
      'radial-gradient(circle at 49.81% 51.23%, #00BDD4, #00AABE 5%, #007D8C 18%, #005761 31%, #00373E 45%, #001F23 58%, #000E0F 72%, #000304 86%, #000000 100%, #E21C25 0%, #BE181F 8%, #8C1117 21%, #610C10 33%, #3E080A 46%, #FFD700 58%, #230406 60%, #0F0203 73%, #040001 86%, #FF4500 85%, #000000 100%, #FCEE21 3%, #DDD11D 10%, #A49A15 24%, #726B0F 38%, #49450A 51%, #292705 65%, #121102 77%, #050401 89%, #000000 100%)',
    position: 'relative',
    height: '80dvh'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  title: {
    textTransform: 'uppercase',
    marginTop: 10,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    overflowY: 'auto',
    maxHeight: '50vh',
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
  button: {
    backgroundColor: '#FFF',
    width: '50%',
    height: {
      xs: '40px',
      md: '40px',
      lg: '50px'
    },
    textTransform: 'uppercase',
    fontSize: {
      xs: 12,
      sm: 15,
      lg: 18
    },
    color: '#000',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#9747FF'
    }
  },
  addContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5
  },
  addBtn: {
    backgroundColor: '#FFF',
    width: {
      xs: '35%',
      md: '35%',
      lg: '25%'
    },
    borderRadius: '30px',
    color: '#000',
    textTransform: 'uppercase',
    fontSize: {
      xs: 12,
      sm: 15,
      lg: 18
    },
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#9747FF'
    }
  }
}

export default styles
