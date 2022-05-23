import { socket } from 'src/boot/socketio'

function callPlayDirect(file) {
  socket.emit('playerFunction', {
    command: 'playDirect',
    file: file
  })
}

function callClear() {
  socket.emit('playerFunction', {
    command: 'clear'
  })
}

export { callPlayDirect, callClear }
