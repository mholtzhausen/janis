<template>
  <div class="card">
    <b-container fluid class="card-body pt-0 mt-0">
      <div class="b-row text-right">
        <b-button-group size="tiny">
          <b-button autoblur @click="$.editorType='code'" :pressed="this.$.editorType==='code'" variant="secondary">Code</b-button>
          <b-button autoblur @click="$.editorType='preview'" :pressed="this.$.editorType==='preview'" variant="secondary">Preview</b-button>
          <b-button autoblur @click="$.editorType='both'" :pressed="this.$.editorType==='both'" variant="secondary">Both</b-button>
        </b-button-group>
      </div>
      <ux-state name="editorType" value="code">
        <b-row>
          <textarea v-model="content" class="fullHeight"></textarea>
        </b-row>
      </ux-state>
      <ux-state name="editorType" value="preview">
        <b-row>
          <div class="col fullHeight" v-html="preview"></div>
        </b-row>
      </ux-state>
      <ux-state name="editorType" value="both">
        <b-row>
          <b-col>
            <textarea v-model="content" class="fullHeight" ref="ta"></textarea>
          </b-col>
          <div class="col divider fullHeight" v-html="preview" ref="pv"></div>
        </b-row>
      </ux-state>
    </b-container>
  </div>
</template>

<script>
let cidx = 0
const marked = require('marked')

export default {
  components: {
  },
  data () {
    return {
      content: require('./defaultContent')
    }
  },
  computed: {
    preview () {
      return marked(this.content, { })
    }
  },
  methods: {
    matchMouseScroll () {

      function matchScroll (e1, e2) {
        let evts = ['mousewheel', 'keyup', 'keypress', 'keydown']
        evts.forEach(evt => {
          e1.addEventListener(evt, function(e) {
            let p = e1.scrollTop / (e1.scrollHeight - e1.clientHeight)
            let h = (e2.scrollHeight - e2.clientHeight) * p
            e2.scrollTop = Math.floor(h)
          })
        })
      }
      if (this.$refs.pv &&  this.$refs.ta) {
        matchScroll(this.$refs.pv, this.$refs.ta)
        matchScroll(this.$refs.ta, this.$refs.pv)
      }
    }
  },
  mounted () {
    this.matchMouseScroll()
  },
  updated () {
    this.matchMouseScroll()
  }

}
</script>

<style>

textarea{
	font-family:'Courier New', Courier, monospace !important;
	white-space: nowrap;
	font-size: 0.8rem !important;
}

.btn-group-tiny > .btn {
  padding: 0.15rem 0.25rem;
  font-size: 0.675rem;
  line-height: 1.2;
  border-radius: 0.2rem;
}

.divider {
  border-left: 1px dashed #eee;
}

.fullHeight {
  height: calc(100vh - 115px);
  overflow: scroll;
  width: 100%;
}
</style>
