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
  projects: allProject {
    edges {
      node {
        thumbnail
        title
        description
        path
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
    title: 'Équipe Arma 3 simulation/réalisme'
  }
}
</script>
