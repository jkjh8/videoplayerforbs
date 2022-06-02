import { ref, computed } from 'vue'
import { socket } from 'src/boot/socketio'

const playerStatus = ref({})

function setPlayPause(file) {
  socket.emit('command', { command: 'playPause' })
}

function setStop() {
  socket.emit('command', { command: 'stop' })
}

function openFile(file) {
  socket.emit('command', { command: 'open_file', file: file })
}

function setPosition(position) {
  socket.emit('command', { command: 'setPosition', value: position })
}

function setFullscreen(value) {
  socket.emit('command', { command: 'setFullscreen', value: value })
}

function setVolume(value) {
  socket.emit('command', { command: 'set_volume', value: value })
}

function setMute(value) {
  socket.emit('command', { command: 'set_mute', value: value })
}

export {
  playerStatus,
  setPlayPause,
  setStop,
  openFile,
  setPosition,
  setFullscreen,
  setVolume,
  setMute
}
