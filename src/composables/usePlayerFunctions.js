import { mediaplayer, _file, _play, source, _ready, _wait } from './usePlayer'

function fnPlay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearInterval(_wait.value)
      reject()
    }, 2000)

    _wait.value = setInterval(() => {
      if (_ready.value) {
        const promise = mediaplayer.value.play()
        if (promise !== undefined) {
          promise
            .then((_) => {
              // Auto play
              console.log('play ok')
              _play.value = true
            })
            .catch((error) => {
              console.error('play error', error)
            })
        }
        _ready.value = false
        clearInterval(_wait.value)
        resolve()
      }
    }, 200)
  })
}

function clearSource() {
  _file.value = null
  source.value = ''
}

export { fnPlay, clearSource }
