<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, date, format } from 'quasar'
import { api } from 'src/boot/axios'
import {
  dir,
  files,
  fileWithType,
  getFiles,
  columns
} from 'src/composables/useFiles'

import { mediaplayer, playerStatus as ps } from 'src/composables/usePlayer'
import { callPlayDirect, callClear } from 'src/composables/usePlayerCalls'

import PageName from 'src/components/layout/pageName.vue'
import Upload from 'src/components/dialogs/files/uploadFiles'
import mkDir from 'src/components/dialogs/files/makeFolder.vue'
import Confirm from 'src/components/dialogs/chkConfirm'
import StkRemote from 'src/components/stickyRemote'

import IconBtn from 'src/components/iconBtn'
import Tooltip from 'src/components/tooltipItem.vue'

import useNotify from 'src/composables/useNotify'
const { notifyWarn, notifyError } = useNotify()

const $q = useQuasar()

function upload() {
  $q.dialog({
    component: Upload
  }).onOk(() => {
    $q.loading.show()
    getFiles()
    $q.loading.hide()
  })
}

function makeFolder() {
  $q.dialog({
    component: mkDir
  }).onOk(async (name) => {
    $q.loading.show()
    try {
      await api.get(`/files/mkdir?name=${name}`)
      getFiles()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error(err)
    }
  })
}

function deleteFile(file) {
  $q.dialog({
    component: Confirm,
    componentProps: {
      icon: 'delete',
      iconColor: 'white',
      color: 'red',
      title: '파일 삭제',
      message: `${file.name} 파일을 삭제 합니다.`
    }
  }).onOk(async () => {
    $q.loading.show()
    try {
      await api.get(`/files/deleteFile?name=${encodeURIComponent(file.name)}`)
      getFiles()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      notifyError({
        message: '파일 삭제 중 오류가 발생하였습니다.',
        caption:
          '잠시후에 다시 시도해 주세요. 오류가 계속되면 관리자에게 문의 해주세요.'
      })
      console.error(err)
    }
  })
}

onMounted(() => {
  getFiles()
})
</script>

<template>
  <q-page>
    <div class="row no-wrap justify-between items-center">
      <PageName
        class="animate__pulse"
        name="파일 & 폴더"
        caption="파일 & 폴더 관리"
        icon="svguse:icons.svg#diskColor"
      />
      <div>
        <q-btn round flat color="yellow" icon="folder" @click="makeFolder">
          <Tooltip msg="폴더생성" />
        </q-btn>
        <q-btn round flat color="primary" icon="upload" @click="upload">
          <Tooltip msg="파일업로드" />
        </q-btn>
      </div>
    </div>
    <div class="row justify-center q-pt-md">
      <q-card style="width: 100%">
        <q-card-section class="q-pa-none">
          <q-table
            :columns="columns"
            :rows="fileWithType"
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props" class="text-left">
                  <div class="row items-center q-gutter-x-sm">
                    <q-icon
                      v-if="props.row.type && props.row.type.includes('image')"
                      name="image"
                      size="sm"
                      color="primary"
                    />
                    <q-icon
                      v-else-if="
                        props.row.type && props.row.type.includes('video')
                      "
                      name="videocam"
                      size="sm"
                      color="blue-grey-10"
                    />
                    <div>
                      {{ props.row.name }}
                    </div>
                  </div>
                </q-td>
                <q-td key="size" :props="props">
                  {{ format.humanStorageSize(props.row.size) }}
                </q-td>
                <q-td key="createdAt" :props="props">
                  {{
                    date.formatDate(
                      props.row.createdAt,
                      'YYYY-MM-DD hh:mm:ss a'
                    )
                  }}
                </q-td>
                <q-td key="actions" :props="props">
                  <div class="q-gutter-x-sm">
                    <IconBtn
                      name="play_arrow"
                      msg="재생"
                      @click="callPlayDirect(props.row)"
                    />
                    <IconBtn
                      name="delete"
                      color="red"
                      size="xs"
                      msg="삭제"
                      @click="deleteFile(props.row)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky
      v-if="ps.playing === 1"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <StkRemote />
    </q-page-sticky>
  </q-page>
</template>
