<script setup>
import { ref } from 'vue'
const props = defineProps({
  name: String,
  size: String,
  color: String,
  msg: String
})
const isHover = ref(false)
const emit = defineEmits(['click'])

function onClick() {
  isHover.value = true
  emit('click')
  setTimeout(() => {
    isHover.value = false
  }, 1000)
}
</script>

<template>
  <q-icon
    :class="isHover ? 'animate__animated animate__heartBeat' : ''"
    style="cursor: pointer"
    :name="props.name"
    :size="props.size ?? 'sm'"
    :color="props.color ?? 'primary'"
    @click.prevent.stop="onClick"
  >
    <q-tooltip
      v-if="props.msg"
      class="tooltip-bg"
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
    >
      {{ props.msg }}
    </q-tooltip>
  </q-icon>
</template>
