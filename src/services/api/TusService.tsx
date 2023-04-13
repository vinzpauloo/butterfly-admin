// ** Next
import dynamic from "next/dynamic";

// ** Third Party Components
import * as tus from 'tus-js-client'

// ** Configs
import authConfig from 'src/configs/auth'



// ** Constant variables
const IS_SIT = process.env.NEXT_PUBLIC_APP_VARIANT === 'sit'
const baseUrl = IS_SIT ? process.env.NEXT_PUBLIC_API_BASE_URL_SIT : process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
const UploadURL: string = `${baseUrl}/videos/upload-url`

type TUSServiceOptions = {
  customOnProgress?: (numberString : string) => void,
  customOnAfterResponse? : (req : tus.HttpRequest, res : tus.HttpResponse) => void
}

type headerdata = {
  user_id: string
  video_name: string
  video_type: 'full_video' | 'feed_video' | 'trial' | string
}

const TUSService = (file: File, { customOnProgress, customOnAfterResponse }: TUSServiceOptions, headerData: headerdata) => {

    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  // Create a new tus upload
  let upload = new tus.Upload(file, {
    // Endpoint is the upload creation URL from your tus server
    endpoint: `${UploadURL}`,
    //onSuccess remove from localStorage
    removeFingerprintOnSuccess: true, 
    // Chunks
    chunkSize: 5 * 1024 * 1024,
    // Retry delays will enable tus-js-client to automatically retry on errors
    retryDelays: [0, 1000, 3000, 5000],
    // Attach additional meta data about the file for the server
    metadata: {
      filename: file.name,
      filetype: file.type,
      ...headerData,
      authorization: `${accessToken}`
    },
    // Callback for errors which cannot be fixed using retries
    onError: function (error) {
      console.log('Failed because: ' + error)
    },
    // Callback for reporting upload progress
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
      console.log(bytesUploaded, bytesTotal, percentage + '%')
      if (customOnProgress) {
        customOnProgress(percentage)
      }
    },
    // Callback for once the upload is completed
    onSuccess: function () {
      console.log('Successful Upload, Download from %s', upload.url)
    },
    onAfterResponse: (req, res) => { 
        if ( customOnAfterResponse ) {
            customOnAfterResponse(req,res)
        }
    }
  })

  return { upload }
}

export default TUSService
