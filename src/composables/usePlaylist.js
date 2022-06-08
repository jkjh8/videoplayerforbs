import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { socket } from 'src/boot/socketio'

const playlist = ref([])

async function getPlaylist() {
  playlist.value = []
  const r = await api.get('/playlist')
  const pl = r.data.playlist
  for (let i = 0; i < pl.length; i++) {
    playlist.value.push({ ...pl[i] })
  }
  console.log(playlist.value)
  socket.emit('command', {
    command: 'update_playlist',
    playlist: playlist.value
  })
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

function updatePlaylist(plist) {
  socket.emit('command', { command: 'update_playlist', playlist: plist })
}

export { playlist, getPlaylist, columns, updatePlaylist }
