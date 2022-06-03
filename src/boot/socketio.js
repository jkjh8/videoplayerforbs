import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'

const socket = io(`http://${window.location.hostname}:3000?client=client`, {
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  autoConnect: false
})

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket
})

export { socket }
