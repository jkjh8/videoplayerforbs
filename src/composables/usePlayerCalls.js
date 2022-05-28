import { ioStatus } from 'src/boot/socketio'

function callPlayDirect(file) {
  ioStatus.emit('playerFunction', {
    command: 'playDirect',
    file: file
  })
}

function callClear() {
  ioStatus.emit('playerFunction', {
    command: 'clear'
  })
}

export { callPlayDirect, callClear }
