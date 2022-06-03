<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, date, format } from 'quasar'
import { api } from 'src/boot/axios'
import { playlist, getPlaylist } from 'src/composables/usePlaylist'

import { playerStatus as ps, openFile } from 'src/composables/usePlayer'

import PageName from 'src/components/layout/pageName.vue'
import Confirm from 'src/components/dialogs/chkConfirm'
import AddPlaylist from 'src/components/dialogs/playlist/addPlaylist.vue'
import StkRemote from 'src/components/stickyRemote'
import Draggable from 'vuedraggable'

import IconBtn from 'src/components/iconBtn'
import Tooltip from 'src/components/tooltipItem.vue'

import useNotify from 'src/composables/useNotify'
const { notifyWarn, notifyError } = useNotify()

const $q = useQuasar()

function fnAddPlaylist() {
  $q.dialog({
    component: AddPlaylist
  }).onOk(async (addList) => {
    for (let i = 0; i < addList.length; i++) {
      playlist.value.push({ ...addList[i], index: playlist.value.length })
    }
    await api.put('/playlist', { playlist: playlist.value })
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
}

onMounted(() => {
  getPlaylist()
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
      <div>
        <q-btn
          round
          flat
          color="primary"
          icon="add_circle"
          @click="fnAddPlaylist"
        >
          <Tooltip msg="파일 추가" />
        </q-btn>
        <q-btn round flat color="green-10" icon="refresh" @click="getPlaylist">
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
                style="border: 0.5px solid #efefef; margin: 5px"
                clickable
              >
                <q-item-section avatar>
                  <q-avatar
                    round
                    color="primary"
                    text-color="white"
                    size="sm"
                    >{{ element.index + 1 }}</q-avatar
                  >
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
                      @click.prevent.stop="openFile(element)"
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
    <q-page-sticky
      v-if="
        (ps.status && ps.status.includes('Playing')) ||
        (ps.status && ps.status.includes('Paused'))
      "
      position="bottom-right"
      :offset="[18, 18]"
    >
      <StkRemote />
    </q-page-sticky>
  </q-page>
</template>
