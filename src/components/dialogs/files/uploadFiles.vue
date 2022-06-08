<script setup>
import { useDialogPluginComponent } from 'quasar'
import { fileTypes } from 'src/composables/useFiles'
import useNotify from 'src/composables/useNotify'
const { notifyError } = useNotify()

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const url = `http://${window.location.hostname}:3000/api/files/upload`

function checkFileType(files) {
  return files.filter((file) => fileTypes.includes(file.type))
}

function onRejected(rejectedEntries) {
  notifyError({
    message: `${rejectedEntries.length}의 지원하지 않은 포멧의 파일`,
    caption: '오류가 계속되면 관리자에게 문의 해주세요.'
  })
}

function uploadError(err) {
  console.error(err)
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-pa-none">
        <!-- uploader -->
        <q-uploader
          style="width: 100%"
          flat
          :url="url"
          multiple
          :filter="checkFileType"
          :accept="'.mp3, .mp4, .wav, .avi, .flac, .mov, .acc, .mkv, .jpg, .png, .bmp'"
          @rejected="onRejected"
          @error="uploadError"
        >
          <template #header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <div class="q-px-sm">
                <q-spinner
                  v-if="scope.isUploading"
                  class="q-uploader__spinner"
                />
                <q-icon v-else name="upload" size="sm" />
              </div>
              <div class="col">
                <div class="q-uploader__title">업로드 할 파일을 등록하세요</div>
                <div class="q-uploader__subtitle">
                  총 용량: {{ scope.uploadSizeLabel }} /
                  {{ scope.uploadProgressLabel }}
                </div>
              </div>
              <q-btn
                v-if="scope.queuedFiles.length > 0"
                icon="clear_all"
                @click="scope.removeQueuedFiles"
                round
                dense
                flat
              >
                <q-tooltip>모두 삭제</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.uploadedFiles.length > 0"
                icon="done_all"
                @click="scope.removeUploadedFiles"
                round
                dense
                flat
              >
                <q-tooltip>완료된 파일 삭제</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canAddFiles"
                type="a"
                icon="add_box"
                @click="scope.pickFiles"
                round
                dense
                flat
              >
                <q-uploader-add-trigger />
                <q-tooltip>파일선택</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canUpload"
                icon="cloud_upload"
                @click="scope.upload"
                round
                dense
                flat
              >
                <q-tooltip>업드로 시작</q-tooltip>
              </q-btn>

              <q-btn
                v-if="scope.isUploading"
                icon="clear"
                @click="scope.abort"
                round
                dense
                flat
              >
                <q-tooltip>업로드 취소</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          style="width: 80px"
          label="닫기"
          class="text-primary"
          flat
          rounded
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
