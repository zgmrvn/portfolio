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

    <div class="container py-24 md:py-32">
      <h1 class="text-4xl font-semibold text-center">
        {{ $page.project.title }}
      </h1>

      <div class="flex flex-wrap items-center justify-center -mx-1 mt-2">
        <div
          v-for="(tag, i) of $page.project.tags"
          :key="i"
          class="px-1"
        >
          <Tag class="text-sm">
            {{ tag.title }}
          </Tag>
        </div>
      </div>

      <div
        v-html="introduction"
        class="mt-16 md:mt-24"
      />

      <LazyLoaderContainer>
        <Mosaic
          :images="mosaic"
          class="mt-4"
        />
      </LazyLoaderContainer>

      <LazyLoaderContainer :video="true">
        <div v-html="body" />
      </LazyLoaderContainer>

      <!-- next project - bottom -->
      <div
        v-if="nextProject"
        class="flex justify-center mt-28"
      >
        <GLink
          v-if="nextProject"
          :to="nextProject.path"
          class="flex items-center text-gray-800"
        >
          <div class="font-semibold leading-tight">
            <span class="text-gray-600">
              Next project
            </span>
            <br>
            <span class="text-3xl">
              {{ nextProject.title }}
            </span>
          </div>
          <ArrowLeftCircleIcon
            size="5.2x"
            stroke-width="0.85"
            class="inline transform rotate-180 ml-2"
          />
        </GLink>
      </div>
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
    tags {
      title
    }
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

import Mosaic from '@/components/Mosaic'
import Tag from '@/components/Tag'

export default {
  components: {
    ArrowLeftCircleIcon,
    Mosaic,
    Tag
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
