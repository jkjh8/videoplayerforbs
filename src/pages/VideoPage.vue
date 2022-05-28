<script setup>
import { ref, onMounted } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import '@quasar/quasar-ui-qmediaplayer/src/index.sass'
import { ioPlayer } from 'src/boot/socketio'
import {
  mediaplayer,
  playerStatus as ps,
  fnStatus as fs
} from 'src/composables/usePlayer'

// import { fnStatus as fs } from 'src/composables/usePlayerState'

import { fnPlay, clearSource } from 'src/composables/usePlayerFunctions'

onMounted(() => {
  ioPlayer.on('player', async (args) => {
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
  <!-- <q-page v-if="_file && _file.type.includes('video')" class="bg-black"> -->
  <q-page>
    <q-media-player
      ref="mediaplayer"
      type="video"
      :source="ps.source"
      :autoplay="ps.autoplay"
      :bottom-controls="ps.bottomControls"
      :controls-display-time="ps.controlDisplayTime"
      :loop="ps.loop"
      :muted="ps.muted"
      :no-controls="ps.noControls"
      :show-big-play-button="ps.showBigPlayBtn"
      :volume="ps.volume"
      :show-tooltips="ps.showTooltips"
      @ready="fs.ready"
      @play="fs.play"
      @playing="fs.playing"
      @duration="fs.duration"
      @ended="fs.ended"
      @error="fs.error"
      @paused="fs.paused"
      @timeupdate="fs.timeUpdate"
      @loadeddata="fs.loadedData"
      @volume="fs.volume"
      @mute="fs.muted"
    />
    {{ ps }}
  </q-page>
  <!--
  <q-page v-else-if="_file && file.type.includes('image')"> image </q-page>

  <q-page v-else class="bg-black text-white">
    <q-icon class="absolute-center" name="svguse:icons.svg#logo" size="200px" />
  </q-page> -->
</template>
