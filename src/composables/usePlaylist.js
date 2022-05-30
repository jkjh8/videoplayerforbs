import { ref } from 'vue'
import { api } from 'src/boot/axios'

const playlist = ref([])

async function getPlaylist() {
  playlist.value = []
  const r = await api.get('/playlist')
  const pl = r.data.playlist
  for (let i = 0; i < pl.length; i++) {
    playlist.value.push({ ...pl[i], index: i + 1 })
  }
}

const columns = [
  {
    name: 'index',
    align: 'center',
    label: 'Index',
    field: 'Index',
    sortable: true
  },
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

export { playlist, getPlaylist, columns }
