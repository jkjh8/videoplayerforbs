<script setup>
import PageName from 'src/components/layout/pageName.vue'
import {
  autoplay,
  noControls,
  muted,
  volume,
  showBigPlayBtn
} from 'src/composables/usePlayer'
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
              <q-item-label>AUTO PLAY</q-item-label>
              <q-item-label caption>미디어 로딩시 자동 재생</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="autoplay"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>SHOW BIG PLAY BUTTON</q-item-label>
              <q-item-label caption>화면 중앙 플레이 버튼 표시</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="showBigPlayBtn"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>HIDE CONTROLS</q-item-label>
              <q-item-label caption>컨트롤 화면 숨기기</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="noControls"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>MUTE</q-item-label>
              <q-item-label caption>오디오 뮤트</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="muted"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>VOLUME</q-item-label>
              <q-item-label caption>오디오 볼륨</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-knob
                v-model="volume"
                class="q-mr-sm"
                show-value
                size="2rem"
                :thickness="0.3"
                color="primary"
              ></q-knob>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
