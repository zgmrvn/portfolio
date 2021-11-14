<template>
  <Layout>
    <div class="sticky top-0 w-full bg-white border-b border-gray-200 py-6">
      <div class="container">
        <div class="flex justify-between text-gray-700 font-semibold">
          <!-- home -->
          <GLink
            to="/"
            class="flex items-center"
          >
            <ArrowLeftCircleIcon
              size="2x"
              stroke-width="1.5"
              class="inline mr-2"
            />
            Home
          </GLink>

          <!-- next project - top -->
          <GLink
            v-if="nextProject"
            :to="nextProject.path"
            class="flex items-center"
          >
            Next project
            <ArrowLeftCircleIcon
              size="2x"
              stroke-width="1.5"
              class="inline transform rotate-180 ml-2"
            />
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

      <!-- next project - bottom -->
      <GLink
        v-if="nextProject"
        :to="nextProject.path"
      >
        Next project {{ nextProject.name }}
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
    nextProject {
      path
      title
    }
  }
}
</page-query>

<script>
import PrismicDOM from 'prismic-dom'
import { ArrowLeftCircleIcon } from 'vue-feather-icons'

import htmlSerializer from '@/prismic/html-serializer.js'
import linkResolver from '@/prismic/link-resolver.js'

import Triangle from '@/components/Triangle'
import Mosaic from '@/components/Mosaic'

export default {
  components: {
    Triangle,
    Mosaic,
    ArrowLeftCircleIcon
  },

  metaInfo() {
    return {
      title: this.$page.project.title
    }
  },

  computed: {
    nextProject() {
      return this.$page.project.nextProject
    },

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
