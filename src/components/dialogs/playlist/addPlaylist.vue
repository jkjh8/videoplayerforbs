<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent, format } from 'quasar'
import { fileWithType, columnsAdd, getFiles } from 'src/composables/useFiles'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const selected = ref([])
const filter = ref('')

onMounted(() => {
  getFiles()
  selected.value = []
})
</script>

<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 1200px; width: 600px">
      <q-card-section
        class="row no-wrap justify-between bg-primary text-white"
        style="padding: 0.7rem"
      >
        <div class="row no-wrap items-center">
          <q-icon class="q-mr-md" name="folder" size="sm" />
          <div>파일 선택</div>
        </div>
        <q-input v-model="filter" dense filled dark label="Search"></q-input>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <div>
          <q-scroll-area style="height: 350px">
            <q-table
              v-model:selected="selected"
              :columns="columnsAdd"
              :rows="fileWithType"
              row-key="name"
              selection="multiple"
              dense
              :filter="filter"
              hide-pagination
              :pagination="{ rowsPerPage: 0 }"
            >
              <template #body-cell-name="props">
                <q-td :props="props" class="text-left">
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
              </template>
              <template #body-cell-size="props">
                <q-td :props="props">
                  {{ format.humanStorageSize(props.row.size) }}
                </q-td>
              </template>
            </q-table>
          </q-scroll-area>
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
          @click="onDialogOK(selected)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
