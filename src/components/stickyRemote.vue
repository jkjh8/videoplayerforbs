<script setup>
import {
  playerStatus as ps,
  setPlayPause,
  setStop
} from 'src/composables/usePlayer'
</script>

<template>
  <div class="q-gutter-x-sm">
    <q-btn
      v-if="ps.paused"
      fab
      icon="play_arrow"
      color="primary"
      @click="setPlayPause"
    />
    <q-btn v-else fab icon="pause" color="yellow" @click="setPlayPause" />
    <q-btn fab icon="stop" color="red-10" @click="setStop" />
  </div>
</template>
