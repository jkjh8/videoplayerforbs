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
  volume,
  showTooltips,
  source,
  _file,
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
        if (_file.value !== args.file) {
          _file.value = args.file
          _play.value = false
          if (_file.value.type.includes('video')) {
            source.value = args.file.address
            await fnPlay()
          }
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
  <q-page v-if="_file && _file.type.includes('video')" class="bg-black">
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
  </q-page>

  <q-page v-else-if="_file && file.type.includes('image')"> image </q-page>

  <q-page
    v-else
    class="flex flex-center bg-black text-white"
    style="width: 100%; height: 100%"
  >
    <q-icon name="svguse:icons.svg#logo" size="200px" />
  </q-page>
</template>
