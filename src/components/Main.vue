<template>
  <b-container>
    <ux-state name="appState" value="initializing">initializing</ux-state>
    <ux-state name="appState" value="requiresConfig"><add-db></add-db></ux-state>
    <ux-state name="appState" value="ready" style="height: 100%">
      <top-nav></top-nav>
      <editor></editor>
    </ux-state>
  </b-container>
</template>

<script>
import TopNav from './navigation/TopNav.vue'
import AddDb from './AddDb.vue'
import Editor from './editor/Editor.vue'
export default {
  name: 'Main',
  components: {
    TopNav,
    AddDb,
    Editor
  }
}
</script>

<style>
</style>
