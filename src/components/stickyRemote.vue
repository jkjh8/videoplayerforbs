<script setup>
import {
  playerStatus as ps,
  setPlayPause,
  setStop,
  setPosition,
  setVolume,
  setMute,
  setRepeatAll,
  setRepeatOne,
  setFf,
  setRew,
  setFullscreen,
  setPlayMode,
  stikyControl
} from 'src/composables/usePlayer'

import IconBtn from 'src/components/iconBtn.vue'
</script>

<template>
  <div v-if="stikyControl">
    <div
      class="q-gutter-x-sm bg-grey-3 q-px-md q-py-sm shadow-10 row no-wrap icons-center"
      style="border: 1px solid #eee; border-radius: 8px"
    >
      <IconBtn
        v-if="ps.play_mode === 'Playlist'"
        name="skip_previous"
        color="grey-10"
        size="md"
        msg="PREVIOUS"
        @click="setRew"
      />

      <IconBtn
        v-if="!(ps.status && ps.status.includes('Playing'))"
        name="play_arrow"
        color="primary"
        msg="PLAY"
        size="md"
        @click="setPlayPause"
      />
      <IconBtn
        v-else
        name="pause"
        color="yellow"
        msg="PAUSE"
        size="md"
        @click="setPlayPause"
      />

      <IconBtn
        v-if="ps.play_mode === 'Playlist'"
        name="skip_next"
        color="grey-10"
        msg="NEXT"
        size="md"
        @click="setFf"
      />

      <IconBtn
        name="stop"
        color="red-10"
        msg="STOP"
        size="md"
        @click="setStop"
      />

      <IconBtn
        name="repeat_one"
        :color="ps.repeat_one ? 'accent' : 'grey-5'"
        msg="REPEAT ONE"
        size="md"
        @click="setRepeatOne"
      />
      <IconBtn
        v-if="ps.play_mode === 'Playlist'"
        name="repeat"
        size="md"
        :color="ps.repeat_all ? 'secondary' : 'grey-5'"
        msg="REPEAT ALL"
        @click="setRepeatAll"
      />
      <IconBtn
        :name="
          ps.play_mode === 'Playlist' ? 'playlist_play' : 'play_circle_fill'
        "
        :color="ps.play_mode === 'playlist' ? 'orange' : 'teal'"
        msg="PLAY MODE"
        size="md"
        @click="
          ps.play_mode === 'Playlist'
            ? setPlayMode('Normal')
            : setPlayMode('Playlist')
        "
      />
      <IconBtn
        style="z-index: 5"
        :name="ps.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        :color="ps.fullscreen ? 'red' : ''"
        msg="FULL SCREEN"
        size="md"
        @click="setFullscreen(!ps.fullscreen)"
      />
      <IconBtn
        :name="ps.mute ? 'volume_off' : 'volume_up'"
        :color="ps.mute ? 'red-10' : 'black'"
        msg="MUTE"
        size="md"
        @click="setMute(!ps.mute)"
      />
      <q-slider
        v-model="ps.volume"
        style="width: 100px"
        :min="0"
        :max="100"
        label
        color="primary"
        @update:model-value="setVolume"
      />

      <IconBtn
        style="position: absolute; top: -10px; right: -10px"
        name="cancel"
        color="red"
        msg="CLOSE"
        @click="stikyControl = !stikyControl"
      />
    </div>
  </div>
</template>
