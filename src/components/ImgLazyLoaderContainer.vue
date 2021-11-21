<template>
  <div ref="lazyload">
    <slot />
  </div>
</template>

<script>
export default {
  mounted() {
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

      const imgs = Array.from(this.$refs.lazyload.querySelectorAll('img'))

      imgs.forEach((img) => {
        img.setAttribute('data-src', img.getAttribute('src'))
        img.removeAttribute('src')
        img.classList.add('opacity-0')
      })

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.dataset.src)
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('transition-opacity', 'duration-500', 'ease-out', 'opacity-100')
          }
        })
      })

      imgs.forEach(img => observer.observe(img))
    }
  }
}
</script>
