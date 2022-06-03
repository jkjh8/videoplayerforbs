<script setup>
import { onMounted } from 'vue'
import { hms } from 'src/composables/useTime'
import {
  playerStatus as ps,
  setPlayPause,
  setPosition,
  setStop
} from 'src/composables/usePlayer'
import IconBtn from 'src/components/iconBtn'
</script>

<template>
  <q-page class="flex flex-center">
    {{ ps }}
    <q-card style="max-width: 600px; min-width: 400px; border-radius: 0.8rem">
      <q-card-section>
        <div class="row no-wrap justify-center">
          <q-avatar
            class="shadow-10"
            size="6rem"
            font-size="4rem"
            icon="svguse:icons.svg#logo"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row no-wrap items-center q-gutter-x-md">
          <IconBtn name="folder" color="yellow-8" size="sm" />
          <div>{{ ps.file && ps.file.name ? ps.file.name : '' }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row no-wrap items-center q-gutter-x-md">
          <div>
            {{ hms(ps.curTime) }}
          </div>
          <q-slider
            v-model="ps.position"
            :min="0"
            :max="1000"
            label
            :label-value="hms(ps.curTime)"
            @update:model-value="setPosition"
          ></q-slider>
          <div>
            {{ hms(ps.duration) }}
          </div>
        </div>

        <div class="row no-wrap">
          <div>
            <q-btn
              v-if="!(ps.status && ps.status.includes('Playing'))"
              icon="play_arrow"
              color="primary"
              flat
              round
              @click="setPlayPause"
            />
            <q-btn
              v-else
              icon="pause"
              color="yellow"
              flat
              round
              @click="setPlayPause"
            />
          </div>
          <q-btn icon="stop" color="red-10" flat round @click="setStop" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
