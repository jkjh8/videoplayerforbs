import { ref, reactive } from 'vue'

const mediaplayer = ref(null)

const playerStatus = ref({
  autoplay: false,
  bottomControls: false,
  controlDisplayTime: ref(2000),
  showBigPlayBtn: true,
  loop: false,
  muted: false,
  noControls: false,
  volume: 60,
  showTooltips: false,
  source:
    'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4',
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
    return (playerStatus.value.ready = true)
  },
  play: () => {
    console.log('Play')
  },
  playing: () => {
    console.log('playing')
    playerStatus.value.paused = false
    playerStatus.value.play = true
  },
  duration: (seconds) => {
    playerStatus.value.duration = seconds
  },
  error: (err) => {
    console.error(err)
  },
  timeUpdate: (cur, rem) => {
    playerStatus.value.curTime = cur
    playerStatus.value.remaining = rem
  },
  loadedData: () => {
    console.log('loadedData')
  },
  volume: (volume) => {
    playerStatus.value.volume = volume
  },
  muted: (state) => {
    playerStatus.value.muted = state
  },
  ended: () => {
    playerStatus.value.ready = false
    playerStatus.value.play = false
  },
  paused: () => {
    playerStatus.value.paused = true
    console.log('paused')
  }
}

export { mediaplayer, playerStatus, fnStatus }
