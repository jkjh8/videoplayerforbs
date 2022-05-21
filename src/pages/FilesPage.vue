<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { dir, files, getFiles } from 'src/composables/useFiles'

import PageName from 'src/components/layout/pageName.vue'
import Upload from 'src/components/dialogs/files/uploadFiles'
import Tooltip from 'src/components/tooltipItem.vue'

const $q = useQuasar()

function upload() {
  $q.dialog({
    component: Upload
  })
}

onMounted(() => {
  getFiles()
})
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <PageName
      name="파일 & 폴더"
      caption="파일 & 폴더 관리"
      icon="svguse:icons.svg#diskColor"
    />
    <q-btn round flat color="primary" icon="upload" @click="upload">
      <Tooltip msg="파일업로드" />
    </q-btn>
  </div>
  <div class="row justify-center q-pt-md">
    <q-card style="width: 100%">
      <q-card-section class="q-py-none">
        {{ files }}
        <q-list separator> </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
