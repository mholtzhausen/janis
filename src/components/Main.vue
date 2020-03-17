

This area over here could be used to provide commentary on the component

<template>
  <div style="  min-height: 100%;display: grid;">
    <ux-state name="appState" value="initializing">initializing</ux-state>
    <ux-state name="appState" value="addDatabase">
      <add-edit-db></add-edit-db>
    </ux-state>
    <ux-state name="appState" value="editDatabase" key="">
      <add-edit-db :edit="$shared.editDatabaseId"></add-edit-db>
    </ux-state>
    <main-app v-if="$.appState==='ready'"></main-app>
  </div>
</template>

<script>
import AddEditDb from './AddEditDb.vue'
import App from './App.vue'

export default {
  components:{
    AddEditDb,
    MainApp:App
  }
}
</script>

<style lang="sass">
@import "../styles/theme/default/colors.scss";

body{
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
}
.container-fluid{
}


</style>
