
This area over here could be used to provide commentary on the component

<template>
  <div class="container-fluid">
	  <div class="sidebar">
      <div class="logo"><i class="zmdi zmdi-cloud-circle"></i> Janis</div>
      <j-explore-toolbar></j-explore-toolbar>
		  <!-- <b-tree-view :data="treeData2" :contextMenuItems="contextMenuItems" @contextMenuItemSelect="handleContextMenu" @nodeSelect="handleNodeSelect"></b-tree-view> -->
	  </div>
	  <div class="content">
      <editor></editor>
    </div>
  </div>
</template>

<script>
import Editor from './editor/Editor.vue'
import { bTreeView } from 'bootstrap-vue-treeview'
import jExploreToolbar from './jExploreToolbar.vue'


export default {
  name: 'App',
  components: {
    Editor,
    bTreeView,
    jExploreToolbar
  },
	pouch:{
		databases:{}
	},
  methods:{
    handleContextMenu({code},{data}){
      console.log({code,data})
    },

    handleNodeSelect(node,selected){
      console.log(node)
      if(selected) node.toggle()
      console.log(this.treeData2)
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
  },

  computed:{
    treeData2(){
      return this.databases
    }
  }
}
</script>

<style lang="sass">
@import "../../styles/theme/default/colors.scss";

.logo{
  margin-top: 15px;
  font-size: 1.5rem;
  text-align: center;
}

body{
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
}
.container-fluid{
  padding-top: 15px;
  min-height: 100%;
  display: grid;
  grid-template: "sidebar content" "sidebar content";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
}

.content{
	background-color: $main-bg;
	margin: 15px;
	border-radius: 15px;
	padding: 15px;
	border: 2px solid $j-shade-3;
	box-shadow: 0 0 16px rgba(41,42,51,0.06), 0 6px 20px rgba(41,42,51,0.02);
}
</style>
