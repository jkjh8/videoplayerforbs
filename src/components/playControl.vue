<script setup>
import { hms } from 'src/composables/useTime'
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
  setRew
} from 'src/composables/usePlayer'

import IconBtn from 'src/components/iconBtn'

const props = defineProps({ timeline: Boolean, control: Boolean })
</script>

<template>
  <div>
    <div v-if="timeline" class="row no-wrap items-center q-gutter-x-md">
      <div>{{ hms(ps.curTime) }}</div>
      <q-slider
        v-model="ps.curTime"
        :min="0"
        :max="ps.duration"
        label
        :label-value="hms(ps.curTime)"
        @update:model-value="setPosition"
      />
      <div>{{ hms(ps.duration) }}</div>
    </div>
    <div class="q-mt-md">
      <div class="row justify-between">
        <div class="q-gutter-x-sm">
          <IconBtn
            v-if="ps.play_mode === 'Playlist'"
            name="skip_previous"
            color="grey-10"
            msg="PREVIOUS"
            @click="setRew"
          />

          <IconBtn
            v-if="!(ps.status && ps.status.includes('Playing'))"
            name="play_arrow"
            color="primary"
            msg="PLAY"
            @click="setPlayPause"
          />
          <IconBtn
            v-else
            name="pause"
            color="yellow"
            msg="PAUSE"
            @click="setPlayPause"
          />

          <IconBtn
            v-if="ps.play_mode === 'Playlist'"
            name="skip_next"
            color="grey-10"
            msg="NEXT"
            @click="setFf"
          />

          <IconBtn name="stop" color="red-10" msg="STOP" @click="setStop" />

          <IconBtn
            name="repeat_one"
            :color="ps.repeat_one ? 'accent' : 'grey-5'"
            msg="REPEAT ONE"
            @click="setRepeatOne"
          />
          <IconBtn
            v-if="ps.play_mode === 'Playlist'"
            name="repeat"
            :color="ps.repeat_all ? 'secondary' : 'grey-5'"
            msg="REPEAT ALL"
            @click="setRepeatAll"
          />
        </div>

        <div class="row no-wrap items-center q-gutter-x-sm q-mr-sm">
          <IconBtn
            :name="ps.mute ? 'volume_off' : 'volume_up'"
            :color="ps.mute ? 'red-10' : 'black'"
            msg="MUTE"
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
        </div>
      </div>
    </div>
  </div>
</template>
