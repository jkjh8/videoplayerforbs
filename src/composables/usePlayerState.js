import {
  duration,
  volume,
  muted,
  _curTime,
  _remaining,
  _play,
  _ready
} from './usePlayer'

function stateReady() {
  return (_ready.value = true)
}

function statePlaying() {
  console.log('_play true')
  return (_play.value = true)
}

function stateDuration(seconds) {
  duration.value = seconds
}

function stateError(err) {
  console.error('Player Error ', err)
}

function timeUpdate(curTime, remaining) {
  _curTime.value = curTime
  _remaining.value = remaining
}

function stateLoadedData() {
  console.log('Player Loaded Data')
}

function stateVolume(vol) {
  volume.value = vol
}

function stateMuted(state) {
  muted.value = state
}

function stateEnded() {
  _ready.value = false
  _play.value = false
}

function statePaused() {
  console.log('Paused')
}

export {
  stateReady,
  statePlaying,
  stateDuration,
  stateError,
  timeUpdate,
  stateLoadedData,
  stateVolume,
  stateMuted,
  stateEnded,
  statePaused
}
