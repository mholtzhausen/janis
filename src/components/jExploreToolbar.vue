<template>
  <b-dropdown class="dbSelect" size="sm" variant="secondary">
    <template v-slot:button-content>{{currentDbName}}</template>
    <b-dropdown-item
      v-for="database in databases"
      :key="database._id"
      @click="selectDb(database._id)"
      :active="database._id === $s.selectedDb"
    >
      {{database.name}}
      <button
        class="btn btn-round btn-tiny"
        style="display: inline-block;width: auto;float: right;"
        @click.prevent.stop="editDatabase(database._id)"
        autoblur        
      >
        <j-icon name="settings" color="red" x-style="float:right; margin-top: 2px;"></j-icon>
      </button>
    </b-dropdown-item>
    <b-dropdown-item>
      <button class="btn btn-secondary btn-small btn-round" @click="addDatabase">
        <j-icon name="plus"></j-icon>
      </button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
// const { icon } = require('../lib/consts/index')
// icon.names.folder



export default {
  pouch: {
    databases: {},
  },
  methods: {
    selectDb (selectedDb) {
      this.$s.selectedDb=selectedDb
    },
    addDatabase () {
      this.$.appState = 'addDatabase'
    },
    editDatabase(did){
      console.log(this.$conf)
    }
  },
  computed: {
    currentDbName () {
      console.log(this.$s)
      if (this.$s.selectedDb && this.databases) {
        return this.databases.find(db => db._id == this.$s.selectedDb).name
      } else {
        return 'Select Database'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  width: 100%;
  display: block;
  padding: 15px 0;
  margin: 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size: 0.6em;
  .btn {
    font-size: inherit;
  }
}

.dbSelect {
  width: 100%;
  /deep/ button {
    width: 100%;
  }
}

/deep/ .dropdown-toggle::after {
  float: right;
  display: block;
  margin-top: 9px;
}

/deep/ .dropdown-menu {
  width: 100%;
  font-size: 0.8rem;
  // button {
  //   width: initial;
  //   float: right;
  //   line-height: 1;
  //   margin-right: 10px;
  //   padding: 0.15rem 0.25rem 0.05rem 0.25rem;
  // }
  a[role=menuitem]{
    padding: 0.25rem 0.5rem;
  }
}
/deep/ .dropdown-item.active{
  color: #000;
  background-color: #cfe6ff;
}
</style>
