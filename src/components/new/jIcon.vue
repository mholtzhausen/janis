<template>
  <i :class="classes" :style="styleNames"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Boolean, String],
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: false
    },
    bullet: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    borderCircle: {
      type: Boolean,
      default: false
    },
    pullLeft: {
      type: Boolean,
      default: false
    },
    pullRight: {
      type: Boolean,
      default: false
    },
    spin: {
      type: Boolean,
      default: false
    },
    spinReverse: {
      type: Boolean,
      default: false
    },
    rotate90: {
      type: Boolean,
      default: false
    },
    rotate180: {
      type: Boolean,
      default: false
    },
    rotate270: {
      type: Boolean,
      default: false
    },
    flipH: {
      type: Boolean,
      default: false
    },
    flipV: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
  },
  computed: {
    classes () {
      let classes = ['zmdi', `zmdi-${this.name}`]
      if (this.size && typeof this.size === 'string') classes.push(this.size)
      if (this.fixedWidth) classes.push('zmdi-hc-fw')
      if (this.bullet) classes.push('zmdi-hc-li')
      if (this.border) classes.push('zmdi-hc-border')
      if (this.borderCircle) classes.push('zmdi-hc-border-circle')
      if (this.pullLeft) classes.push('pull-left')
      if (this.pullRight) classes.push('pull-right')
      if (this.spin) classes.push('zmdi-hc-spin')
      if (this.spinReverse) classes.push('zmdi-hc-spin-reverse')
      if (this.rotate90) classes.push('zmdi-hc-rotate-90')
      if (this.rotate180) classes.push('zmdi-hc-rotate-180')
      if (this.rotate270) classes.push('zmdi-hc-rotate-270')
      if (this.flipH) classes.push('zmdi-hc-flip-horizontal')
      if (this.flipV) classes.push('zmdi-hc-flip-vertical')
      return classes.join(' ')
    },
    styleNames () {
      let styles = []
      if (this.color) styles.push(`color: ${this.color}`)
      return `${styles.join(';')};`
    }
  }
}
</script>

<style>
</style>
