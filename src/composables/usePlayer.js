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
  socket.emit('command', { command: 'set_position', value: position })
}

function setFullscreen(value) {
  socket.emit('command', { command: 'set_fullscreen', value: value })
}

function setVolume(value) {
  socket.emit('command', { command: 'set_volume', value: value })
}

function setMute(value) {
  socket.emit('command', { command: 'set_mute', value: value })
}

function getStatus() {
  socket.emit('command', { command: 'get_status' })
}

export {
  playerStatus,
  setPlayPause,
  setStop,
  openFile,
  setPosition,
  setFullscreen,
  setVolume,
  setMute,
  getStatus
}
