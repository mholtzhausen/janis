<template>
  <b-container fluid>
    <ux-state name="appState" value="initializing">initializing</ux-state>
    <ux-state name="appState" value="requiresConfig">
      <add-db></add-db>
    </ux-state>
    <ux-state name="appState" value="ready" style="height: 100%">
      <top-nav></top-nav>
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <b-tree-view :data="treeData" :contextMenuItems="contextMenuItems" @contextMenuItemSelect="handleContextMenu" @nodeSelect="handleNodeSelect"></b-tree-view>
          </b-col>
          <b-col cols="10">
            <editor></editor>
          </b-col>
        </b-row>
      </b-container>
    </ux-state>
  </b-container>
</template>

<script>
import TopNav from './navigation/TopNav.vue'
import AddDb from './AddDb.vue'
import Editor from './editor/Editor.vue'
import { bTreeView } from 'bootstrap-vue-treeview'
export default {
  name: 'Main',
  components: {
    TopNav,
    AddDb,
    Editor,
    bTreeView
  },
  methods:{
    handleContextMenu({code},{data}){
      console.log({code,data})
    },

    handleNodeSelect(node,selected){
      console.log(node)
      if(selected) node.toggle()
    }

  },
  data () {
    return {
      contextMenuItems: [
        { code: 'subfolder', label: 'New Subfolder' },
        { code: 'note', label: 'New Note' }
      ],
      treeData: [
        {
          "id": 2,
          "more": 'stuff',
          "name": "Venus",
          "children": [
            { "id": 3, "name": "Neptune" },
            { "id": 4, "name": "Stratus" }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
