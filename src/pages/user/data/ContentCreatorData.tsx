interface contentCreatorData {
  id: any;
  UserName: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastUpdate: any;
}

function createContentCreatorData(
  id: any,
  UserName: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastUpdate: number,
): contentCreatorData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return {
    id,
    UserName,
    MobileNumber: formattedMobileNumber,
    Email,
    DateCreated: formattedDateCreated,
    LastUpdate: formattedLastLog
  };
}

const contentcreatorRows = [
  createContentCreatorData(1,'Yuxuan Hu', +639173263512, `cc@account.com`, 1632620222000, 1643320222000, ),
  createContentCreatorData(2,'Wei Tao Bambang', +639276562210, `cc@account.com`, 1321812403000, 1323620222000, ),
  createContentCreatorData(3,'Shi Kai Ding Bang', +639476545510, `cc@account.com`, 1662240621000, 1644420222000, ),
  createContentCreatorData(4,'Fu Dong Da-Fu', +639276522210, `cc@account.com`, 1645137632000, 1643620222000, ),
  createContentCreatorData(5,'Aiguo Chen', +639066523310, `cc@account.com`, 1648314228000, 1643621122000, ),
  createContentCreatorData(6,'Syaoran Taio', +639276573810, `cc@account.com`, 1643229492000, 1643330222000, ),
  createContentCreatorData(7,'Ming Longwei', +639066523410, `cc@account.com`, 1692217173000, 1642220222000, ),
  createContentCreatorData(8,'Lee Jiao-Long', +639976599210, `cc@account.com`, 1643223292000, 1643632222000, ),
  createContentCreatorData(9,'Hua Mu Lan', +639176246210, `cc@account.com`, 1695227173000, 1643330222000, ),
  createContentCreatorData(10,'Zhe Huang Ti', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, ),
  createContentCreatorData(11,'Gong Xi', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, ),
  createContentCreatorData(12,'Fei Long', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, ),
  createContentCreatorData(13,'Jackie Chan', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, ),
  createContentCreatorData(14,'Pai Long', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, ),
]

export default contentcreatorRows
