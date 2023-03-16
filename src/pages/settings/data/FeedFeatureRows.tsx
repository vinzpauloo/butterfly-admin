interface feedFeatureData {
  id: any
  title: string
  MobileNumber: any
  Email: string
  dateCreated: any
  lastLogIn: any
}

function createFeedFeatureData(
  id: any,
  title: string,
  MobileNumber: any,
  Email: string,
  dateCreated: number,
  lastLogIn: number
): feedFeatureData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(
    2,
    5
  )} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
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
    title,
    MobileNumber: formattedMobileNumber,
    Email,
    dateCreated: formattedDateCreated,
    lastLogIn: formattedLastLog
  }
}

const feedFeatureRows = [
  { ...createFeedFeatureData(1, 'Title 1', +639173263512, `cc@account.com`, 1641812403000, 1643620222000) },
  { ...createFeedFeatureData(2, 'Title 2', +639173263512, `cc@account.com`, 1641812403000, 1643620222000) },
  { ...createFeedFeatureData(3, 'Title 3', +639173263512, `cc@account.com`, 1661640621000, 1643620222000) },
  { ...createFeedFeatureData(4, 'Title 4', +639173263512, `cc@account.com`, 1645137632000, 1643620222000) },
  { ...createFeedFeatureData(5, 'Title 5', +639173263512, `cc@account.com`, 1648314258000, 1643620222000) }
]

export default feedFeatureRows
