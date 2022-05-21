<script setup>
import { useDialogPluginComponent } from 'quasar'
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const url = `http://${window.location.hostname}:3000/api/files/upload`
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-pa-none">
        <q-uploader style="width: 100%" flat :url="url" />
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
