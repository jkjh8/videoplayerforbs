import { ref } from 'vue'
import { socket } from 'src/boot/socketio'

const playerStatus = ref({
  fullscreen: false,
  play_mode: 'Normal',
  volume: 100,
  mute: false,
  repeat_one: false,
  repeat_all: false,
  rt_ipaddr: '127.0.0.1',
  rt_port: 12302
})
const stikyControl = ref(false)

function setPlayPause(file) {
  if (file) {
    return socket.emit('command', { command: 'play_direct', file: file })
  }
  socket.emit('command', { command: 'play_pause' })
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
  socket.emit('command', { command: 'set_mute', value: false })
  socket.emit('command', { command: 'set_volume', value: value })
}

function setMute(value) {
  socket.emit('command', { command: 'set_mute', value: value })
}

function getStatus() {
  socket.emit('command', { command: 'get_status' })
}

function setPlayMode(mode) {
  socket.emit('command', { command: 'set_play_mode', value: mode })
}

function setRepeatOne() {
  socket.emit('command', {
    command: 'set_repeat_one',
    value: !playerStatus.value.repeat_one
  })
}

function setRepeatAll() {
  socket.emit('command', {
    command: 'set_repeat_all',
    value: !playerStatus.value.repeat_all
  })
}

function setFf() {
  socket.emit('command', { command: 'set_ff' })
}

function setRew() {
  socket.emit('command', { command: 'set_rew' })
}

function setPlayById(id) {
  socket.emit('command', { command: 'play_id', index: id })
}

function setRtIpaddr(ip) {
  socket.emit('command', { command: 'set_rt_ipaddr', ipaddr: ip })
}

function setRtPort(port) {
  socket.emit('command', { command: 'set_rt_port', port: port })
}

function startPosition() {
  socket.emit('command', { command: 'start_position' })
}

function endPosition() {
  socket.emit('command', { command: 'end_position' })
}

export {
  playerStatus,
  stikyControl,
  setPlayPause,
  setStop,
  openFile,
  setPosition,
  setFullscreen,
  setVolume,
  setMute,
  getStatus,
  setPlayMode,
  setRepeatOne,
  setRepeatAll,
  setFf,
  setRew,
  setPlayById,
  setRtIpaddr,
  setRtPort,
  startPosition,
  endPosition
}
