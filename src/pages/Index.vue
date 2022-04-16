<template>
  <Layout>
    <Header />

    <section
      id="projects"
      class="overflow-hidden"
    >
      <div class="container py-32">
        <Projects />
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  projects: allProject(sortBy: "date", order: DESC) {
    edges {
      node {
        thumbnail
        title
        description
        path
        tags {
          title
        }
      }
    }
  }
}
</page-query>

<script>
import Header from '@/components/Header'
import Projects from '@/components/Projects'

export default {
  components: {
    Header,
    Projects
  },

  metaInfo: {
    title: 'Portfolio'
  }
}
</script>
