<script setup>
import { onMounted } from 'vue'
import PageName from 'src/components/layout/pageName.vue'
import {
  playerStatus as ps,
  stikyControl,
  setVolume,
  setMute,
  setFullscreen,
  getStatus,
  setPlayMode,
  setRtIpaddr,
  setRtPort,
  setRtType
} from 'src/composables/usePlayer'
import { chkIpaddr, chkPort } from '/src/composables/useRules'
import { socket } from '/src/boot/socketio'

onMounted(() => {
  stikyControl.value = true
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
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label>PLAY MODE</q-item-label>
              <q-item-label caption>플레이 모드 설정</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-select
                :options="['Normal', 'Playlist']"
                v-model="ps.play_mode"
                filled
                dense
                @update:model-value="setPlayMode"
              ></q-select>
            </q-item-section>
          </q-item>

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

          <q-item>
            <q-item-section>
              <q-item-label>GET LIST</q-item-label>
              <q-item-label caption>리스트 리턴 설정</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-select
                :options="['AMX', 'String']"
                v-model="ps.rt_type"
                filled
                dense
                @update:model-value="setRtType(ps.rt_type)"
              ></q-select>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>RETURN</q-item-label>
              <q-item-label caption>데이터 리턴 주소</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row no-wrap q-gutter-x-sm">
                <q-input
                  v-model="ps.rt_ipaddr"
                  filled
                  dense
                  label="IP ADDRESS"
                  :rules="chkIpaddr"
                  lazy-rules
                  @update:model-value="setRtIpaddr(ps.rt_ipaddr)"
                />
                <q-input
                  v-model="ps.rt_port"
                  style="width: 100px"
                  filled
                  dense
                  type="number"
                  :rules="chkPort"
                  lazy-rules
                  label="PORT"
                  @update:model-value="setRtPort(ps.rt_port)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
