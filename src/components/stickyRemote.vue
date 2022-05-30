<script setup>
import { playerStatus as ps } from 'src/composables/usePlayer'
import { callPlay, callClear, callPause } from 'src/composables/usePlayerCalls'
</script>

<template>
  <div class="q-gutter-x-sm">
    <q-btn
      v-if="ps.paused"
      fab
      icon="play_arrow"
      color="primary"
      @click="callPlay"
    />
    <q-btn v-else fab icon="pause" color="yellow" @click="callPause" />
    <q-btn fab icon="stop" color="red-10" @click="callClear" />
  </div>
</template>
