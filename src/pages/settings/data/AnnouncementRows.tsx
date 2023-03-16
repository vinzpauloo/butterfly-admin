interface announcementData {
  id: any
  title: string
  dateCreated: any
  lastLogIn: any
}

function createAnnouncementData(id: any, title: string, dateCreated: number, lastLogIn: number): announcementData {
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
    dateCreated: formattedDateCreated,
    lastLogIn: formattedLastLog
  }
}

const announcementRows = [
  { ...createAnnouncementData(1, 'Title 1', 1641812403000, 1643620222000) },
  { ...createAnnouncementData(2, 'Title 2', 1641812403000, 1643620222000) },
  { ...createAnnouncementData(3, 'Title 3', 1661640621000, 1643620222000) },
  { ...createAnnouncementData(4, 'Title 4', 1645137632000, 1643620222000) },
  { ...createAnnouncementData(5, 'Title 5', 1648314258000, 1643620222000) }
]

export default announcementRows
