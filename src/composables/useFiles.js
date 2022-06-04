import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'

const fileTypes = ['video/mp4', 'image/png']
const columns = [
  {
    name: 'name',
    align: 'center',
    label: 'NAME',
    field: 'name',
    sortable: true
  },
  {
    name: 'size',
    align: 'center',
    label: 'SIZE',
    field: 'size',
    sortable: true
  },
  {
    name: 'createdAt',
    align: 'center',
    label: 'CREATED',
    field: 'createdAt',
    sortable: true
  },
  { name: 'actions', align: 'center', label: 'Actions' }
]

const columnsLtSm = [
  {
    name: 'name',
    align: 'center',
    label: 'NAME',
    field: 'name',
    sortable: true
  },
  { name: 'actions', align: 'center', label: 'Actions' }
]

const columnsAdd = [
  {
    name: 'name',
    align: 'center',
    label: 'NAME',
    field: 'name',
    sortable: true
  },
  {
    name: 'size',
    align: 'center',
    label: 'SIZE',
    field: 'size',
    sortable: true
  }
]

const files = ref([])
const dir = ref([])

const fileWithType = computed(() => {
  const arr = []
  for (let i = 0; i < files.value.length; i++) {
    const ext = files.value[i].name.split('.')
    if (ext) {
      switch (ext[ext.length - 1]) {
        case 'mp4':
          arr.push({
            ...files.value[i],
            type: 'video/mp4',
            address: `http://${
              window.location.hostname
            }:3000/media/${encodeURIComponent(files.value[i].name)}`
          })
          break
        case 'png':
          arr.push({
            ...files.value[i],
            type: 'image/png',
            address: `http://${
              window.location.hostname
            }:3000/media/${encodeURIComponent(files.value[i].name)}`
          })
          break
        default:
          arr.push({ ...files.value[i] })
      }
    }
  }
  return arr
})

const getFiles = async () => {
  const r = await api.get(`/files?dir=${dir.value.join('/')}`)
  files.value = r.data.files
  if (r.data.dir) {
    dir.value = r.data.dir.split('/')
  }
}

export {
  columns,
  columnsAdd,
  dir,
  files,
  fileWithType,
  getFiles,
  fileTypes,
  columnsLtSm
}
