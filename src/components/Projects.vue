<template>
  <div class="flex flex-wrap -mx-2 -mt-16">
    <div
      v-for="p of $page.projects.edges.map(edge => edge.node)"
      :key="p.slug"
      class="w-1/3 px-2 mt-16"
    >
      <Project v-bind="p" />
    </div>
  </div>
</template>

<script>
import Project from '@/components/Project'

export default {
  components: {
    Project
  }
}
</script>
