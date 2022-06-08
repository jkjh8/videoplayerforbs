<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, date, format } from 'quasar'
import { api } from 'src/boot/axios'
import {
  playlist,
  getPlaylist,
  updatePlaylist
} from 'src/composables/usePlaylist'

import {
  playerStatus as ps,
  setPlayById,
  stikyControl
} from 'src/composables/usePlayer'

import PageName from 'src/components/layout/pageName.vue'
import Confirm from 'src/components/dialogs/chkConfirm'
import SelectFiles from 'src/components/dialogs/files/selectFile.vue'
import StkRemote from 'src/components/stickyRemote'
import Draggable from 'vuedraggable'

import IconBtn from 'src/components/iconBtn'
import Tooltip from 'src/components/tooltipItem.vue'

import useNotify from 'src/composables/useNotify'
const { notifyWarn, notifyError } = useNotify()

const $q = useQuasar()

function fnAddPlaylist() {
  $q.dialog({
    component: SelectFiles,
    componentProps: { selection: 'multiple' }
  }).onOk(async (addList) => {
    $q.loading.show()
    try {
      for (let i = 0; i < addList.length; i++) {
        playlist.value.push({ ...addList[i], index: playlist.value.length })
      }
      await api.put('/playlist', { playlist: playlist.value })
      updatePlaylist(playlist.value)
      await getPlaylist()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  })
}

function fnDeletePlaylistItem(item) {
  for (let i = 0; i < playlist.value.length; i++) {
    if (item === playlist.value[i]) {
      playlist.value.splice(i, 1)
      return fnEndDrag()
    }
  }
}

async function fnEndDrag() {
  playlist.value.forEach((item, idx) => {
    item.index = idx
  })
  await api.put('/playlist', { playlist: playlist.value })
  updatePlaylist(playlist.value)
  await getPlaylist()
}

onMounted(async () => {
  stikyControl.value = true
  $q.loading.show()
  await getPlaylist()
  $q.loading.hide()
})
</script>

<template>
  <q-page>
    <div class="row no-wrap justify-between items-center">
      <PageName
        class="animate__pulse"
        name="플레이 리스트"
        caption="플레이 리스트 관리"
        icon="svguse:icons.svg#listColor"
      />
      <div class="row no-wrap">
        <q-btn
          round
          flat
          color="primary"
          icon="play_arrow"
          @click="setPlayById(0)"
        >
          <Tooltip msg="플레이 리스트 재생" />
        </q-btn>
        <q-separator class="q-mx-sm" vertical />
        <q-btn
          round
          flat
          color="primary"
          icon="add_circle"
          @click="fnAddPlaylist"
        >
          <Tooltip msg="파일 추가" />
        </q-btn>
        <q-btn round flat color="yellow-10" icon="refresh" @click="getPlaylist">
          <Tooltip msg="새로고침" />
        </q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <q-card style="min-width: 500px" flat>
        <q-card-section class="q-pa-none">
          <draggable v-model="playlist" item-key="index" @end="fnEndDrag">
            <template #item="{ element }">
              <q-item
                style="
                  border: 0.5px solid #efefef;
                  border-radius: 4px;
                  margin: 1rem;
                  padding: 0.5rem;
                "
                :style="
                  ps.file && ps.file.index === element.index
                    ? 'border: 0.5px solid #aaaaaa;'
                    : 'border: 0.5px solid #efefef;'
                "
                :class="
                  ps.file && ps.file.index === element.index
                    ? 'bg-blue-grey-2'
                    : ''
                "
                clickable
              >
                <q-item-section avatar>
                  <q-avatar round color="primary" text-color="white" size="sm">
                    {{ element.index + 1 }}
                    <q-badge
                      v-if="!element.exist"
                      floating
                      color="red"
                      rounded
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ element.name }}
                  </q-item-label>
                  <q-item-label caption>
                    <a :href="element.address" target="_blank">
                      {{ element.address }}
                    </a>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="row no-wrap">
                    <q-btn
                      round
                      flat
                      icon="play_arrow"
                      size="sm"
                      color="primary"
                      @click.prevent.stop="setPlayById(element.index)"
                    ></q-btn>
                    <q-btn
                      round
                      flat
                      icon="delete"
                      size="sm"
                      color="red-10"
                      @click.prevent.stop="fnDeletePlaylistItem(element)"
                    ></q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </draggable>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
