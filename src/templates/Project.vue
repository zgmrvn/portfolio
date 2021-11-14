<template>
  <Layout>
    <div class="sticky top-0 w-full bg-white border-b border-gray-200 py-6">
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

    <div class="container py-32">
      <h1 class="text-4xl font-semibold text-center">
        {{ $page.project.title }}
      </h1>

      <div
        v-html="introduction"
        class="mt-24"
      />

      <Mosaic
        :images="mosaic"
        class="mt-4"
      />

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
    introduction
    mosaic
    body
  }
}
</page-query>

<script>
import PrismicDOM from 'prismic-dom'

import htmlSerializer from '@/prismic/html-serializer.js'
import linkResolver from '@/prismic/link-resolver.js'

import Triangle from '@/components/Triangle'
import Mosaic from '@/components/Mosaic'

export default {
  components: {
    Triangle,
    Mosaic
  },

  metaInfo() {
    return {
      title: this.$page.project.title
    }
  },

  computed: {
    introduction() {
      return PrismicDOM.RichText.asHtml(JSON.parse(this.$page.project.introduction), linkResolver, htmlSerializer)
    },

    mosaic() {
      return JSON.parse(this.$page.project.mosaic)
    },

    body() {
      return PrismicDOM.RichText.asHtml(JSON.parse(this.$page.project.body), linkResolver, htmlSerializer)
    }
  }
}
</script>
