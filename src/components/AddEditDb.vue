<template>
  <b-card :header="`${this.edit?'Edit':'Add'} Janis Database -- Webdav Endpoing`" border-variant="primary" header-bg-variant="primary" header-text-variant="white" class="mt-5 mx-auto" style="max-width: 50%">
    <b-form @submit="onSubmit">
      <b-form-group label="Database Name" label-for="dbName">
        <b-form-input id="dbName" v-model="name" type="text" requiredx placeholder="Enter your database name here"></b-form-input>
      </b-form-group>
      <b-form-group label="Webdav Url" label-for="dbUrl">
        <b-form-input id="dbUrl" v-model="url" type="text" requiredx placeholder="https://example.com/dav"></b-form-input>
      </b-form-group>
      <b-form-group label="Webdav Path" label-for="dbPath">
        <b-form-input id="dbPath" v-model="path" type="text" requiredx></b-form-input>
      </b-form-group>
      <b-form-group label="Webdav Username" label-for="dbUser">
        <b-form-input id="dbUser" v-model="username" type="text" requiredx autocomplete="off"></b-form-input>
      </b-form-group>
      <b-form-group label="Webdav Password" label-for="dpPass">
        <b-form-input id="dpPass" v-model="password" type="password" requiredx autocomplete="off"></b-form-input>
      </b-form-group>
      <div class="text-right">
        <b-button variant="info" @click="cancel">Cancel</b-button>
        <b-button v-if="this.edit" variant="warning" @click="del">Delete</b-button>
        <b-button variant="primary" type="submit">Add Janis Database</b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>

export default {
  name: 'AddDb',
  props:{
    edit:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: '',
      url: '',
      path: '/',
      username: '',
      password: ''
    }
  },
  computed:{
    db(){
      if(this.$shared, this.databases){
        return this.databases.find(db=>db._id===this.$shared.editDatabaseId)
      }
      return null
    }
  },

  mounted(){
    this.$watch(()=>{
      let flag=true
      if(!this.$shared) return false
      if(!('databases' in this)) return false
      if(!this.databases) return false
      return true
    },(oldVal, newVal)=>{
      console.log('change detected',{...this.$shared},{...this.databases})
      const db=this.db
      Object.keys(db).forEach(prop=>{
        this.$data[prop]=db[prop]
      })
    })
  },

  pouch:{
    databases:{}
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      console.log('submit',{...this.$data})
      if(this.db){
        console.log('editing')
      }else{
        this.$pouch.post({...this.$data},{},'databases')
      }
      this.$.appState='ready'
    },
    cancel(){
      $.appState='ready'
    },
    del(){
      this.$pouch.remove({...this.$data})
      $.appState = 'ready'
    }
  }
}
</script>

<style>
</style>
