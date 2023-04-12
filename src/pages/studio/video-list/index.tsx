// ** React Imports
import React from 'react'

import TableVideos from './table/TableVideos'
// import TableVideos from './table/TableVideosOld'

const VideosList = () => {
  return (
    <>
      <TableVideos />
    </>
  )
}

VideosList.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default VideosList
