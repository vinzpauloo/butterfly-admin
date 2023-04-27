/*
FRONTEND
butterfly-development
PUSHER_APP_KEY = "f9aaec2a9032709a666e"
PUSHER_APP_CLUSTER = "ap1"

butterfly-staging
PUSHER_APP_KEY = "2eb4e1ec04ee10c21760"
PUSHER_APP_CLUSTER = "ap1"

butterfly-production
PUSHER_APP_KEY = "6b6a1e3f7013fd890234"
PUSHER_APP_CLUSTER = "ap1
*/

import Pusher from 'pusher-js'

let pusher = new Pusher('f9aaec2a9032709a666e', {
  cluster: 'ap1'
})

export const subscribeToChannel = (channelName: string, eventName: string, callback: (data: any) => void) => {
  const channel = pusher.subscribe(channelName)
  channel.bind(eventName, callback)
}
