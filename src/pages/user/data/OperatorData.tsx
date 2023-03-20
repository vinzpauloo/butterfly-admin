interface operatorData {
  id: any
  userProfile: string
  mobileNumber: any
  email: string
  dateCreated: any
  lastLogIn: any
}

function createOperatorData(
  id: any,
  userProfile: string,
  mobileNumber: number,
  email: string,
  dateCreated: number,
  lastLogIn: number
): operatorData {
  const formattedMobileNumber = `+${mobileNumber.toString().substring(0, 2)} ${mobileNumber
    .toString()
    .substring(2, 5)} ${mobileNumber.toString().substring(5, 8)} ${mobileNumber.toString().substring(8)}`
  const date = new Date(dateCreated)
  const lastLog = new Date(lastLogIn)
  const hours = date.getHours()
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog
    .getDate()
    .toString()
    .padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog
      .getSeconds()
      .toString()
      .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`

  return {
    id,
    userProfile,
    mobileNumber: formattedMobileNumber,
    email,
    dateCreated: formattedDateCreated,
    lastLogIn: formattedLastLog
  }
}

const operatorRows = [
  { ...createOperatorData(1, 'Mei You', +639176543210, `my@account.com`, 1641812403000, 1643620222000) },
  { ...createOperatorData(2, 'Xiāng', +639176543210, `my@account.com`, 1641812403000, 1643620222000) },
  { ...createOperatorData(3, 'Niang Meng', +639176543210, `my@account.com`, 1661640621000, 1643620222000) },
  { ...createOperatorData(4, 'Yao Wun', +639176543210, `my@account.com`, 1645137632000, 1643620222000) },
  { ...createOperatorData(5, 'Lee Tok Hee', +639176543210, `my@account.com`, 1648314258000, 1643620222000) },
  { ...createOperatorData(6, 'Aoxiang Sy', +639176543210, `my@account.com`, 1643239492000, 1643620222000) },
  { ...createOperatorData(7, 'Xiao Ma', +639176543210, `my@account.com`, 1695217173000, 1643620222000) },
  { ...createOperatorData(8, 'Li Mei', +639176543210, `my@account.com`, 1643220692000, 1643620222000) },
  { ...createOperatorData(9, 'Jun Tao', +639176543210, `my@account.com`, 1695217173000, 1643620222000) },
  { ...createOperatorData(10, 'Jun Tao2', +639176543210, `my@account.com`, 1695217173000, 1643620222000) },
  { ...createOperatorData(11, 'Jun Tao3333', +639176543210, `my@account.com`, 1695217173000, 1643620222000) },
  { ...createOperatorData(12, 'Jun Tao4444', +639176543210, `my@account.com`, 1695217173000, 1643620222000) }
]

export default operatorRows
