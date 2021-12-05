<template>
  <div ref="lazyload">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: Boolean,
      default: true
    },

    video: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tags: []
    }
  },

  mounted() {
    if (this.img === true) {
      this.tags.push('img')
    }

    if (this.video === true) {
      this.tags.push('video')
    }

    this.initializeIntersectionObserver()
  },

  watch: {
    '$route.params.slug': function() {
      this.$nextTick(() => {
        this.initializeIntersectionObserver()
      })
    }
  },

  methods: {
    initializeIntersectionObserver() {
      if (!process.isClient) {
        return
      }

      const elements = Array.from(this.$refs.lazyload.querySelectorAll(this.tags))

      elements.forEach((element) => {
        const type = element.tagName.toLowerCase()
        this['init' + type.charAt(0).toUpperCase() + type.slice(1)](element)
      })

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const type = entry.target.tagName.toLowerCase()
            this['show' + type.charAt(0).toUpperCase() + type.slice(1)](entry.target)
          }
        })
      })

      elements.forEach(element => observer.observe(element))
    },

    initImg(img) {
      img.setAttribute('data-src', img.getAttribute('src'))
      img.removeAttribute('src')
      img.classList.add('opacity-0')
    },

    showImg(img) {
      img.setAttribute('src', img.dataset.src)
      img.classList.remove('opacity-0')
      img.classList.add('transition-opacity', 'duration-500', 'ease-out', 'opacity-100')
    },

    initVideo(video) {
      const source = video.querySelector('source')

      source.setAttribute('data-src', source.getAttribute('src'))
      source.removeAttribute('src')
      video.classList.add('opacity-0')
    },

    showVideo(video) {
      const source = video.querySelector('source')

      console.log(source.dataset.src)
      source.setAttribute('src', source.dataset.src)
      video.load()
      video.classList.remove('opacity-0')
      video.classList.add('transition-opacity', 'duration-500', 'ease-out', 'opacity-100')
    }
  }
}
</script>
