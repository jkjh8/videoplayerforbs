<template>
  <div class="gt-xs" style="padding-top: 5px">
    <q-btn
      class="q-px-md q-py-sm"
      style="border-radius: 10px"
      flat
      to="/playlist"
    >
      <div>Play List</div>
    </q-btn>
    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat to="/files">
      <div>Files</div>
    </q-btn>
    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat to="/setup">
      <div>Setup</div>
    </q-btn>
  </div>
  <q-btn
    class="lt-sm"
    style="width: 2.5rem; height: 2.5rem"
    icon="menu"
    unelevated
  >
    <q-menu :offset="[0, 20]">
      <q-list separator>
        <q-item class="q-px-md" clickable to="/playlist">
          <q-item-section>
            <q-item-label>PLAY LIST</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-px-md" clickable to="/files">
          <q-item-section>
            <q-item-label>Files</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-px-md" clickable to="/setup">
          <q-item-section>
            <q-item-label>Setup</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped></style>
