import { ref, computed } from 'vue'
import { socket } from 'src/boot/socketio'
const mediaplayer = ref(null)

const playerStatus = ref({
  autoplay: false,
  showBigPlayBtn: false,
  loop: false,
  muted: false,
  noControls: true,
  volume: 60,
  playmode: 'Single',
  duration: 0,
  file: null,
  curTime: 0,
  remaining: 0,
  ready: false,
  wait: false,
  play: false,
  paused: false
})

const fnStatus = {
  ready: () => {
    playerStatus.value.ready = true
    console.log('ready')
    socket.emit('data', playerStatus.value)
  },
  play: () => {
    playerStatus.value.play = true
    console.log('Play')
    socket.emit('data', playerStatus.value)
  },
  playing: () => {
    playerStatus.value.paused = false
    playerStatus.value.play = true
    console.log('playing')
    socket.emit('data', playerStatus.value)
  },
  duration: (seconds) => {
    playerStatus.value.duration = seconds
    socket.emit('data', playerStatus.value)
  },
  error: (err) => {
    console.error(err)
  },
  timeUpdate: (cur, rem) => {
    playerStatus.value.curTime = cur
    playerStatus.value.remaining = rem
    socket.emit('data', playerStatus.value)
  },
  loadedData: () => {
    console.log('loadedData')
    socket.emit('data', playerStatus.value)
  },
  volume: (volume) => {
    playerStatus.value.volume = volume
    socket.emit('data', playerStatus.value)
  },
  muted: (state) => {
    playerStatus.value.muted = state
    socket.emit('data', playerStatus.value)
  },
  ended: () => {
    playerStatus.value.ready = false
    playerStatus.value.play = false
    socket.emit('data', playerStatus.value)
  },
  paused: () => {
    playerStatus.value.paused = true
    console.log('paused')
    socket.emit('data', playerStatus.value)
  }
}

export { mediaplayer, playerStatus, fnStatus }
