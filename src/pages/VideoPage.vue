<script setup>
import { ref, onMounted } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import '@quasar/quasar-ui-qmediaplayer/src/index.sass'
import { socket } from 'src/boot/socketio'
import {
  mediaplayer,
  autoplay,
  bottomControls,
  controlDisplayTime,
  showBigPlayBtn,
  loop,
  muted,
  noControls,
  playFile,
  volume,
  showTooltips,
  source,
  _ready,
  _wait,
  _play
} from 'src/composables/usePlayer'

import {
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
} from 'src/composables/usePlayerState'

import { fnPlay, clearSource } from 'src/composables/usePlayerFunctions'

onMounted(() => {
  socket.on('player', async (args) => {
    switch (args.command) {
      case 'updateSource':
        if (playFile.value !== args.file) {
          source.value = args.file.address
          _play.value = false
        }
        break
      case 'play':
        if (!_play.value) {
          await fnPlay()
        }
        break
      case 'clear':
        clearSource()
        break
    }
  })
})
</script>

<template>
  <q-media-player
    ref="mediaplayer"
    type="video"
    :source="source"
    :autoplay="autoplay"
    :bottom-controls="bottomControls"
    :controls-display-time="controlDisplayTime"
    :loop="loop"
    :muted="muted"
    :no-controls="noControls"
    :show-big-play-button="showBigPlayBtn"
    :volume="volume"
    :show-tooltips="showTooltips"
    @ready="stateReady"
    @playing="statePlaying"
    @duration="stateDuration"
    @ended="stateEnded"
    @error="stateError"
    @paused="statePaused"
    @timeupdate="timeUpdate"
    @loadeddata="stateLoadedData"
    @volume="stateVolume"
    @mute="stateMuted"
  />
</template>
