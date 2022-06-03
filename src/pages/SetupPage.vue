<script setup>
import { onMounted } from 'vue'
import PageName from 'src/components/layout/pageName.vue'
import {
  playerStatus as ps,
  setVolume,
  setMute,
  setFullscreen,
  getStatus
} from 'src/composables/usePlayer'
import { socket } from '/src/boot/socketio'

onMounted(() => {
  getStatus()
})
</script>

<template>
  <div>
    <PageName
      name="설정"
      caption="플레이어 모드 및 설정"
      icon="svguse:icons.svg#setupColor"
    />
  </div>
  <div class="row justify-center q-pt-md">
    <q-card style="width: 100%">
      <q-card-section class="q-py-none">
        <q-list separator>
          <q-item>
            <q-item-section>
              <q-item-label>MUTE</q-item-label>
              <q-item-label caption>오디오 뮤트</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="ps.mute"
                @update:model-value="setMute"
              ></q-toggle>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>VOLUME</q-item-label>
              <q-item-label caption>오디오 볼륨</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row no-wrap items-center q-gutter-x-md">
                <q-slider
                  v-model="ps.volume"
                  style="width: 100px"
                  :min="0"
                  :max="100"
                  label
                  color="primary"
                  @update:model-value="setVolume"
                />
                <div>{{ ps.volume }}</div>
                <!-- <input
                  v-model="ps.volume"
                  type="number"
                  style="width: 50px"
                  @update:model-value="setVolume"
                /> -->
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>FULL SCREEN</q-item-label>
              <q-item-label caption>전체 화면 전환</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="ps.fullscreen"
                @update:model-value="setFullscreen"
              ></q-toggle>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
