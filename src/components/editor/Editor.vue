<template>
    <b-container fluid class="p-0 m-0">
      <link rel="stylesheet" type="text/css" :href="themes[$s.theme]">
      <div class="b-row buttons" style="left:0">
        <b-button-group size="tiny">
          <b-button v-for="(tfile,tname) in themes" :key="tname" autoblur :pressed="$s.theme===tname" @click="$s.theme=tname" variant="secondary">{{tname}}</b-button>
        </b-button-group>
      </div>
      <div class="b-row buttons">
        <b-button-group size="tiny">
          <b-button autoblur @click="changeEditor('code')" :pressed="this.$s.editorType==='code'" variant="secondary">Code</b-button>
          <b-button autoblur @click="changeEditor('preview')" :pressed="this.$s.editorType==='preview'" variant="secondary">Preview</b-button>
          <b-button autoblur @click="changeEditor('both')" :pressed="this.$s.editorType==='both'" variant="secondary">Both</b-button>
        </b-button-group>
      </div>
      <ux-state name="editorType" value="code">
        <b-row>
          <textarea v-model="content" class="fullHeight"></textarea>
        </b-row>
      </ux-state>
      <ux-state name="editorType" value="preview">
        <b-row>
          <div class="col fullHeight md" v-html="preview"></div>
        </b-row>
      </ux-state>
      <ux-state name="editorType" value="both">
        <b-row>
          <b-col>
            <textarea v-model="content" class="fullHeight" ref="ta"></textarea>
          </b-col>
          <div class="col divider fullHeight md" v-html="preview" ref="pv"></div>
        </b-row>
      </ux-state>
    </b-container>
</template>

<script>
let cidx = 0
const marked = require('marked')

export default {
  components: {
  },
  data () {
    return {
      content: require('./defaultContent'),
      themes:{
        github: require('!!file-loader?outputPath=dist&name=[name].[hash].css!sass-loader!../../styles/render/default.scss').default,
        avenirWhite: require('!file-loader?outputPath=dist&name=[name].[hash].css!../../styles/render/avenir-white.scss').default,
        amblin: require('!file-loader?outputPath=dist&name=[name].[hash].css!../../styles/render/amblin.scss').default,
        lopash: require('!file-loader?outputPath=dist&name=[name].[hash].css!../../styles/render/lopash.scss').default,
        swiss: require('!file-loader?outputPath=dist&name=[name].[hash].css!../../styles/render/swiss.scss').default,
        foghorn: require('!file-loader?outputPath=dist&name=[name].[hash].css!../../styles/render/foghorn.scss').default,
      }
    }
  },
  computed: {
    preview () {
      return marked(this.content, { })
    }
  },
  methods: {
    changeEditor(type){
      this.$.editorType=type
      this.$s.editorType = type
      // this.$conf.editorType = type      
    },
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
      this.$.editorType=this.$s.editorType || this.$.editorType
  },
  updated () {
    this.matchMouseScroll()
  }

}
</script>

<style lang="sass" scoped >

.buttons{
  position:absolute;
  top: -28px;
  right: 0px;
}

.container-fluid{
  position: relative;
  display:block;
}

textarea{
	font-family:'Courier New', Courier, monospace !important;
	white-space: nowrap;
	font-size: 0.8rem !important;
  border: none;
  resize: none;
}


.divider {
  border-left: 1px dashed #eee;
}

.fullHeight {
  height: calc(100vh - 90px);
  overflow: scroll;
  width: 100%;
}
</style>
