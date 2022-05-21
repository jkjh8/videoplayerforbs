import { ref } from 'vue'
import { api } from 'src/boot/axios'

const files = ref([])
const dir = ref([])

const getFiles = async () => {
  const r = await api.get(`/files?dir=${dir.value.join('/')}`)
  console.log(r)
  files.value = r.data.files
  if (r.data.dir) {
    dir.value = r.data.dir.split('/')
  }
  console.log(dir.value, files.value)
}

export { dir, files, getFiles }
