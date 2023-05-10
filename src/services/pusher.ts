import Pusher from 'pusher-js'

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || ''
const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || ''

let pusher = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER
})

export const subscribeToChannel = (channelName: string, eventName: string, callback: (data: any) => void) => {
  const channel = pusher.subscribe(channelName)
  channel.bind(eventName, callback)
}
