<template>
  <b-card header="Add Janis Database -- Webdav Endpoing" border-variant="primary" header-bg-variant="primary" header-text-variant="white" class="mt-5 mx-auto" style="max-width: 50%">
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
        <b-button variant="primary" type="submit">Add Janis Database</b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
const api = require('../api/index')

export default {
  name: 'AddDb',
  data () {
    return {
      name: '',
      url: '',
      path: '/',
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      api.setDavDb(this.name,{...this.$data})
      this.$.appState='initializing'
    }
  }
}
</script>

<style>
</style>
