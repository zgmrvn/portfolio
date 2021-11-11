<template>
  <Layout>
    <div class="fixed w-full bg-white border-b border-gray-200 py-6">
      <div class="container">
        <div class="flex justify-between">
          <GLink to="/">

            Home
          </GLink>

          <GLink to="/">
            Next project
          </GLink>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="text-4xl font-semibold text-center">
        {{ $page.project.title }}
      </h1>

      <div
        v-html="body"
        class="c-content"
      />

      <GLink to="/">
        Next project
      </GLink>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  project(id: $id) {
    title
    body
  }
}
</page-query>

<script>
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es'

import Triangle from '@/components/Triangle'

const resolver = new RichTextResolver()
 
export default {
  components: {
    Triangle
  },

  metaInfo() {
    return {
      title: this.$page.project.title
    }
  },

  computed: {
    body() {
      return resolver.render(JSON.parse(this.$page.project.body))
    }
  }
}
</script>


<style lang="scss" scoped>
.c-content {
  ::v-deep p {
    @apply mb-4 text-justify;
  }
}
</style>
