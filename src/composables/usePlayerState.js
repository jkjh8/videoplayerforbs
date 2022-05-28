import { playerStatus as ps } from './usePlayer'

const fnStatus = {
  ready: () => {
    return (ps.value.ready = true)
  },
  play: () => {
    console.log('Play')
  },
  playing: () => {
    console.log('playing')
    ps.value.play = true
  },
  duration: (seconds) => {
    ps.value.duration = seconds
  },
  error: (err) => {
    console.error(err)
  },
  timeUpdate: (cur, rem) => {
    ps.value.curTime = cur
    ps.value.remaining = rem
  },
  loadedData: () => {
    console.log('loadedData')
  },
  volume: (volume) => {
    ps.value.volume = volume
  },
  muted: (state) => {
    ps.value.muted = state
  },
  ended: () => {
    ps.value.ready = false
    ps.value.play = false
  },
  paused: () => {
    console.log('paused')
  }
}

export { fnStatus }
