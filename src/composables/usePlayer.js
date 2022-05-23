import { ref } from 'vue'
import { socket } from 'src/boot/socketio'

const mediaplayer = ref(null)
const autoplay = ref(false)
const bottomControls = ref(false)
const controlDisplayTime = ref(2000)
const showBigPlayBtn = ref(false)
const loop = ref(false)
const muted = ref(false)
const noControls = ref(true)
const volume = ref(60)
const showTooltips = ref(false)
const source = ref('')
const playFile = ref(null)
const duration = ref(null)
const _curTime = ref(null)
const _remaining = ref(null)
const _ready = ref(false)
const _wait = ref(null)
const _play = ref(false)

export {
  mediaplayer,
  autoplay,
  bottomControls,
  controlDisplayTime,
  duration,
  showBigPlayBtn,
  loop,
  muted,
  noControls,
  volume,
  showTooltips,
  source,
  _ready,
  _wait,
  _play,
  _curTime,
  _remaining,
  playFile
}
