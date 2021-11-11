<template>
  <Layout>
    <div class="sticky w-full bg-white border-b border-gray-200 py-6">
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

      <div v-html="body" />

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
import PrismicDOM from 'prismic-dom'

import htmlSerializer from '@/prismic/html-serializer.js'
import linkResolver from '@/prismic/link-resolver.js'

import Triangle from '@/components/Triangle'

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
      return PrismicDOM.RichText.asHtml(JSON.parse(this.$page.project.body), linkResolver, htmlSerializer)
    }
  }
}
</script>
