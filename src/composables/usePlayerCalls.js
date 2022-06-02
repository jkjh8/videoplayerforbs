import { playerStatus as ps } from 'src/composables/usePlayer'
import { api } from 'src/boot/axios'
import { socket } from 'src/boot/socketio'

import useNotify from 'src/composables/useNotify'
const { notifyWarn, notifyError } = useNotify()

async function callPlayDirect(file) {
  try {
    const r = await api.post('/files/exist', file)
    if (r.data.result) {
      socket.emit('command', { command: 'play', file: file })
    } else {
      notifyWarn({ message: '파일이 존재 하지 않습니다' })
    }
  } catch (err) {
    console.error(err)
    notifyError({
      message: '파일 로딩중 오류가 발생하였습니다.',
      caption:
        '잠시후에 다시 시도해 주세요. 오류가 계속되면 관리자에게 문의 해주세요.'
    })
  }
}

async function callLoadFile(file) {
  try {
    const r = await api.post('/files/exist', file)
    if (r.data.result) {
      ps.value.file = file
      socket.emit('data', ps.value)
    } else {
      notifyWarn({ message: '파일이 존재 하지 않습니다' })
    }
  } catch (err) {
    console.error(err)
    notifyError({
      message: '파일 로딩중 오류가 발생하였습니다.',
      caption:
        '잠시후에 다시 시도해 주세요. 오류가 계속되면 관리자에게 문의 해주세요.'
    })
  }
}

function callPlay() {
  socket.emit('command', { command: 'play' })
}
function callClear() {
  socket.emit('command', { command: 'stop' })
}

function callMute(value) {
  socket.emit('command', { command: 'mute', value: value })
}

function callChangeTime(time) {
  console.log(time, ps)
  socket.emit('command', {
    command: 'setposition',
    value: ps.value.position
  })
}

export {
  callPlayDirect,
  callPlay,
  callClear,
  callChangeTime,
  callLoadFile,
  callMute
}
