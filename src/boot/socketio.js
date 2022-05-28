import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'

const ioStatus = io(`http://${window.location.hostname}:3000/status`, {
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  autoConnect: false
})

const ioPlayer = io(`http://${window.location.hostname}:3000/player`, {
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  autoConnect: false
})

export default boot(({ app }) => {
  app.config.globalProperties.$socketio = ioStatus
})

export { ioStatus, ioPlayer }
