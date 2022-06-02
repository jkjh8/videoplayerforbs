<script setup>
import PageName from 'src/components/layout/pageName.vue'
import {
  playerStatus as ps,
  setVolume,
  setMute
} from 'src/composables/usePlayer'
import { socket } from '/src/boot/socketio'

function updateStatus() {
  socket.emit('data', ps.value)
}
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
              <q-knob
                v-model="ps.volume"
                class="q-mr-sm"
                show-value
                size="2rem"
                :thickness="0.3"
                color="primary"
                @update:model-value="setVolume"
              ></q-knob>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>FULL SCREEN</q-item-label>
              <q-item-label caption>전체 화면 전환</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="ps.mute"
                @update:model-value="updateStatus"
              ></q-toggle>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
