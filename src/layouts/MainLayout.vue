<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { socket } from 'src/boot/socketio'
import MenuComponent from 'components/layout/menuComponent'
import StkRemote from 'src/components/stickyRemote'

import { playerStatus as ps } from 'src/composables/usePlayer'

const router = useRouter()

onBeforeMount(() => {
  socket.on('status', (args) => {
    ps.value = { ...ps.value, ...args }
  })
  socket.connect()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: #fff">
      <div
        class="bg-white text-grey-10 row justify-between items-center"
        style="height: 3.5rem; padding: 0 5%"
      >
        <div class="row no-wrap items-center q-gutter-x-md">
          <!-- home -->
          <div class="row no-wrap items-center q-gutter-x-md">
            <q-icon
              class="home"
              name="svguse:icons.svg#logo"
              color="primary"
              size="md"
              @click="router.push('/')"
            />
            <div class="home text-h5" @click="router.push('/')">
              Media Player
            </div>
          </div>
        </div>
        <!-- menu -->
        <MenuComponent />

        <!-- right pan -->
      </div>
      <q-separator color="grey-3" />
    </q-header>

    <q-page-container>
      <div class="page">
        <router-view />
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <StkRemote />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.home {
  cursor: pointer;
  font-weight: 700;
}
</style>
