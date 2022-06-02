<script setup>
import { hms } from 'src/composables/useTime'
import { playerStatus as ps, setPosition } from 'src/composables/usePlayer.bak'

import IconBtn from 'src/components/iconBtn'

const props = defineProps({ timeline: Boolean, control: Boolean })
</script>

<template>
  <div>
    <div v-fi="timeline" class="row no-wrap items-center q-gutter-x-md">
      <div>{{ hms(ps.curTime) }}</div>
      <q-slider
        v-model="ps.position"
        :min="0"
        :max="1000"
        label
        :label-value="hms(ps.curTime)"
        @update:model-value="setPosition"
      />
    </div>
  </div>
</template>
