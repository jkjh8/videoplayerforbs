import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'

const fileTypes = ['video/mp4', 'image/png', 'image/jpeg', 'image/bmp']
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
    let type = ''
    const ext = files.value[i].name.split('.')
    if (ext) {
      switch (ext[ext.length - 1]) {
        case 'mp4':
          type = 'video/mp4'
          break
        case 'mov':
          type = 'video/mov'
          break
        case 'avi':
          type = 'video/avi'
          break
        case 'mkv':
          type = 'video/mkv'
          break
        case 'mpeg':
          type = 'video/mpeg'
          break
        case 'mp3':
          type = 'audio/mpeg'
          break
        case 'flac':
          type = 'audio/flac'
          break
        case 'wav':
          type = 'audio/wav'
          break
        case 'acc':
          type = 'audio/acc'
          break
        case 'png':
          type = 'image/png'
          break
        case 'jpg':
          type = 'image/jpeg'
          break
        case 'bmp':
          type = 'image/bmp'
          break
      }
    }
    arr.push({
      ...files.value[i],
      type,
      address: `http://${
        window.location.hostname
      }:3000/media/${encodeURIComponent(files.value[i].name)}`
    })
  }
  return arr
})

const getFiles = async () => {
  try {
    const r = await api.get(`/files?dir=${dir.value.join('/')}`)
    files.value = r.data.files
  } catch (err) {
    console.error(err)
  }
  // console.log(files.value)
  // if (r.data.dir) {
  //   dir.value = r.data.dir.split('/')
  // }
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
