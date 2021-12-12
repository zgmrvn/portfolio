// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Prismic = require('@prismicio/client');

module.exports = function (api) {
  api.loadSource(async ({ addCollection, store, addSchemaResolvers  }) => {
    // initialize Prismic API
    const api = await Prismic.getApi(
      process.env.PRISMIC_API_ENDPOINT,
      { accessToken: process.env.PRISMIC_ACCESS_TOKEN }
    )

    //  fetch tags
    const { results: tags } = await api.query(Prismic.Predicates.at('document.type', 'tag'))

    const tagCollection = addCollection('Tag')
    
    tags.forEach((tag) => {
      tagCollection.addNode({
        id: tag.id,
        title: tag.data.title,
        color: tag.data.color
      })
    })

    // fetch projects
    const { results: projects } = await api.query(Prismic.Predicates.at('document.type', 'project'))

    const projectCollection = addCollection('Project')

    projects.forEach((project) => {
      projectCollection.addNode({
        slug: project.uid,
        date: project.data.date || project.first_publication_date,
        thumbnail: project.data.thumbnail.url,
        title: project.data.title,
        tags: project.data.tags.map(p => store.createReference('Tag', p.tag.id)),
        gitHubLink: project.data.github_link.url,
        projectLink: project.data.project_link.url,
        description: project.data.description,
        introduction: JSON.stringify(project.data.introduction),
        mosaic: project.data.mosaic ? JSON.stringify(project.data.mosaic.map(({ image: img }) => ({ url: img.url, alt: img.alt }))) : null,
        body: JSON.stringify(project.data.body),
      })
    })

    // custom resolvers
    addSchemaResolvers({
      Project: {
        nextProject: {
          type: 'Project',
          resolve(obj, args, context, info) {  
            return context.store.getCollection('Project')
              .findNodes({ date: { '$lte' : obj.date }, slug: { '$ne': obj.slug } })
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              [0]
          }
        }
      }
    })
  })
}
