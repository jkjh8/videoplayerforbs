<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import {
  playerStatus as ps,
  setFullscreen,
  setPlayMode,
  openFile,
  stikyControl
} from 'src/composables/usePlayer'

import IconBtn from 'src/components/iconBtn'
import PlayControl from 'src/components/playControl'
import SelectFiles from 'src/components/dialogs/files/selectFile.vue'

const $q = useQuasar()

function fnOpenFile() {
  $q.dialog({
    component: SelectFiles,
    componentProps: { selection: 'single' }
  }).onOk(async (files) => {
    $q.loading.show()
    try {
      openFile(files[0])
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  })
}
onMounted(() => {
  stikyControl.value = false
})
</script>

<template>
  <q-page>
    <q-card
      style="
        max-width: 600px;
        min-width: 400px;
        border-radius: 0.8rem;
        margin: 10% auto;
      "
    >
      <div class="absolute-top-left q-pa-md" style="z-index: 5">
        <IconBtn
          :name="
            ps.play_mode === 'Playlist' ? 'playlist_play' : 'play_circle_fill'
          "
          :color="ps.play_mode === 'playlist' ? 'orange' : 'teal'"
          msg="PLAY MODE"
          @click="
            ps.play_mode === 'Playlist'
              ? setPlayMode('Normal')
              : setPlayMode('Playlist')
          "
        />
      </div>
      <div class="absolute-top-right q-pa-md">
        <IconBtn
          style="z-index: 5"
          :name="ps.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          :color="ps.fullscreen ? 'red' : ''"
          msg="FULL SCREEN"
          @click="setFullscreen(!ps.fullscreen)"
        />
      </div>
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
          <IconBtn
            name="folder"
            color="yellow-8"
            size="sm"
            msg="OPEN FILE"
            @click="fnOpenFile"
          />
          <div>{{ ps.file && ps.file.name ? ps.file.name : '' }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <PlayControl :timeline="true" :control="true" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
