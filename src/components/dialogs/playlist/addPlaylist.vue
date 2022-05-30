<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent, format } from 'quasar'
import { fileWithType, columnsAdd, getFiles } from 'src/composables/useFiles'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const selected = ref([])

onMounted(() => {
  getFiles()
})
</script>

<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 8px">
      <q-card-section
        class="row no-wrap bg-primary text-white"
        style="padding: 0.7rem"
      >
        <q-icon class="q-mr-md" name="folder" size="sm" />
        <div>파일 선택</div>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <div>
          <q-table
            v-model:selected="selected"
            :columns="columnsAdd"
            :rows="fileWithType"
            row-key="index"
            selection="multiple"
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td key="selected" :props="props">
                  <q-select v-model="scope.selected" />
                </q-td>
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
              </q-tr>
            </template>
          </q-table>
        </div>
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
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
