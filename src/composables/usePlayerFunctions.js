import { mediaplayer, playerStatus as ps } from './usePlayer'

function fnPlay() {
  if (ps.value.ready) {
    return mediaplayer.value.play()
  }

  // if (ps.value.wait) {
  //   clearInterval(ps.value.wait)
  //   ps.value.wait = null
  // }
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (ps.value.wait) {
  //       clearInterval(ps.value.wait)
  //       ps.value.wait = null
  //     }
  //     reject('play timeout')
  //   }, 2000)

  //   ps.value.wait = setInterval(() => {
  //     if (ps.value.ready) {
  //       clearInterval(ps.value.wait)
  //       mediaplayer.value.play()
  //       ps.value.ready = false
  //       resolve()
  //     }
  //   })
  // const result = playProcess()
  // console.log('play result', result)

  // if (!result) {
  //   ps.value.wait = setInterval(() => {
  //     console.log(playProcess())
  //   }, 200)
  // }
  // })
}

// function playProcess() {
//   if (ps.value.ready) {
//     const promise = mediaplayer.value.play()
//     if (promise !== undefined) {
//       promise
//         .then((_) => {
//           // Auto play
//           console.log('play ok')
//           ps.value.play = true
//           clearInterval(ps.value.wait)
//           return true
//         })
//         .catch((error) => {
//           console.error('play error', error)
//         })
//     }
//     ps.value.ready = false
//     clearInterval(ps.value.wait)
//     ps.value.wait = null
//     return false
//   }
// }

function fnClear() {
  ps.value.file = null
  ps.value.source = ''
  ps.value.play = false
}

function fnPause() {
  clearInterval(ps.value.wait)
  ps.value.wait = null
  ps.value.ready = true
  mediaplayer.value.pause()
}

function fnSetTime(time) {
  mediaplayer.value.setCurrentTime(time)
}

export { fnPlay, fnClear, fnPause, fnSetTime }
