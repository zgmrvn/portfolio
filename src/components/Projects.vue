<template>
  <div class="flex flex-wrap -mt-32">
    <Project
      v-for="p of $page.projects.edges.map(edge => edge.node)"
      :key="p.slug"
      v-bind="p"
      class="w-1/4 mt-32"
    />
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
