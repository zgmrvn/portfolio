<template>
  <LazyLoaderContainer class="flex flex-wrap -mx-2 -mt-16">
    <div
      v-for="p of $page.projects.edges.map(edge => edge.node)"
      :key="p.slug"
      class="w-full sm:w-1/2 md:w-1/3 px-2 mt-16"
    >
      <Project v-bind="p" />
    </div>
  </LazyLoaderContainer>
</template>

<script>
import Project from '@/components/Project'

export default {
  components: {
    Project
  }
}
</script>
