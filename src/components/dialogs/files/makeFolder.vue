<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const name = ref('')

function onSubmit() {
  onDialogOK(name.value)
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 8px">
      <q-form @submit="onSubmit">
        <q-card-section
          class="row no-wrap bg-primary text-white"
          style="padding: 0.7rem"
        >
          <q-icon class="q-mr-md" name="folder" size="sm" />
          <div>폴더 생성</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="name"
            class="q-px-md q-pt-md"
            dense
            filled
            label="폴더이름"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            style="width: 80px"
            label="취소"
            flat
            rounded
            @click="onDialogCancel"
          />
          <q-btn
            style="width: 80px"
            label="확인"
            class="text-primary"
            flat
            rounded
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
