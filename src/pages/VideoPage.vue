<script setup>
import { ref } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import '@quasar/quasar-ui-qmediaplayer/src/index.sass'
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
  source
} from 'src/composables/usePlayer'

function ready() {
  console.log('Ready')
}

function duration(sec) {
  console.log('Duration', sec)
}

function ended() {
  console.log('Ended')
}

function error(err) {
  console.error('Media Player Error', err)
}

function paused() {
  console.log('Paused')
}

function playing() {
  console.log('Playing')
}

function timeupdate(curTime, remaining) {
  console.log('timeupdated', curTime, remaining)
}

function fullscreen(state) {
  console.log('Fullscreen', state)
}

function loadeddata() {
  console.log('Loaded Data')
}

function showControls(state) {
  console.log('Show Controls', state)
}

function getVolume(vol) {
  console.log('ChangeVolume', vol)
}

function getMuted(state) {
  console.log('Muted', state)
}
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
    :show-tooltips="showTooltops"
    @ready="ready"
    @duration="duration"
    @ended="ended"
    @error="error"
    @paused="paused"
    @timeupdate="timeupdate"
    @fullscreen="fullscreen"
    @loadeddata="loadeddata"
    @showControls="showControls"
    @volume="getVolume"
    @mute="getMuted"
  />
</template>
