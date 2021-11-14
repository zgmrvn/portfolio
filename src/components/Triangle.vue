<template>
  <canvas
    ref="canvas"
    :width="size"
    :height="size"
  />
</template>

<script>
const COLOR_TABLE = [
  'aquamarine',
  'blueviolet',
  'chartreuse',
  'deeppink',
  'darkorange',
  'darkturquoise',
  'gold',
  'greenyellow',
  'lightgreen',
  'lightpink',
  'springgreen',
  'teal',
  'thistle',
  'tomato'
]

const COLOR_TABLE_LENGTH = COLOR_TABLE.length

const TAU = Math.PI * 2
const THIRD = TAU / 3
const TWELVETH = TAU / 12
// const MAX_POSITION_JITTER = 100 // px
const MAX_ROTATION_JITTER = TAU / 3

export default {
  props: {
    size: {
      type: Number,
      default: 100
    },

    image: {
      type: String,
      default: null
    },

    // percentage of the size of the canvas that will be used to jitter vertices
    jitter: {
      type: Number,
      default: 0.4
    }
  },

  mounted() {
    this.generate()
  },

  computed: {
    jitterPx() {
      return Math.floor(this.size * this.jitter / 2)
    }
  },

  methods: {
    generate() {
      const ctx = this.$refs.canvas.getContext('2d')
      const canvasHalfSize = this.size / 2

      // debug circles
      // ctx.beginPath()
      // ctx.arc(canvasHalfSize, canvasHalfSize, canvasHalfSize, 0, TAU)
      // ctx.stroke()
      // ctx.beginPath()
      // ctx.arc(canvasHalfSize, canvasHalfSize, canvasHalfSize - this.jitterPx, 0, TAU)
      // ctx.stroke()

      // draw triangle
      ctx.beginPath()

      // randomly rotate triangle
      const jitterRad = MAX_ROTATION_JITTER / 2 - Math.random() * MAX_ROTATION_JITTER

      for (let i = 0; i < 3; i++) {
        // find perfect vertice
        const rad = -TWELVETH + jitterRad + THIRD * i + THIRD
        const r = (canvasHalfSize - this.jitterPx / 2)
        const x = canvasHalfSize + Math.cos(rad)  * r
        const y = canvasHalfSize + Math.sin(rad) * r

        // jitter vertice
        const jitterDist = Math.sqrt(Math.random()) * this.jitterPx / 2
        const jitterX = Math.cos(jitterRad) * jitterDist
        const jitterY = Math.sin(jitterRad) * jitterDist

        const method = i === 0 ? 'moveTo' : 'lineTo'

        ctx[method](x + jitterX, y + jitterY)

        // more debug circles
        // ctx.beginPath()
        // ctx.arc(x, y, this.jitterPx / 2, 0, TAU)
        // ctx.stroke()
      }

      ctx.closePath()
      //  ctx.stroke()

      if (this.image) {
        ctx.clip()
        let img = new Image()

        img.onload = (o) => {
          ctx.drawImage(o.path[0], 0, 0, this.size, this.size)
        }
    
        img.src = this.image
      }

      // https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
      
      // ctx.clip()
      // ctx.fill()

      // ctx.closePath()

      // gradiant
      // const startX = canvasHalfWidth + Math.cos(jitterRad) * canvasHalfWidth
      // const startY = canvasHalfHeight + Math.sin(jitterRad) * canvasHalfHeight
      // const endX = canvasHalfHeight + Math.cos(jitterRad + Math.PI) * canvasHalfWidth
      // const endY = canvasHalfWidth + Math.sin(jitterRad + Math.PI) * canvasHalfHeight
      // const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
      // gradient.addColorStop(0, this.getRandomColor())
      // gradient.addColorStop(1, this.getRandomColor())
      // ctx.fillStyle = gradient


    },

    getRandomColor() {
      return COLOR_TABLE[Math.floor(Math.random() * COLOR_TABLE_LENGTH)]
    }
  }
}
</script>
