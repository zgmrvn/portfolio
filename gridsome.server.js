// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Prismic = require('@prismicio/client');

module.exports = function (api) {
  api.loadSource(async ({ addCollection, store, addSchemaResolvers  }) => {
    // create a "Project" collection
    const projectCollection = addCollection('Project')

    try {
      // fetch documents from Prismic
      const api = await Prismic.getApi(
        process.env.PRISMIC_API_ENDPOINT,
        { accessToken: process.env.PRISMIC_ACCESS_TOKEN }
      )

      const { results } = await api.query(Prismic.Predicates.at('document.type', 'project'))

      // prepare the data objects and sort them by date of first_publication_date
      const projects = results.map((r) => {
        return {
          slug: r.uid,
          date: r.data.date || r.first_publication_date, // because we can override date in Prismic
          thumbnail: r.data.thumbnail.url,
          title: r.data.title,
          description: r.data.description,
          introduction: JSON.stringify(r.data.introduction),
          mosaic: r.data.mosaic ? JSON.stringify(r.data.mosaic.map(({ image: img }) => ({ url: img.url, alt: img.alt }))) : null,
          body: JSON.stringify(r.data.body)
        }
      })

      // push them into the collection
      projects.forEach(project => projectCollection.addNode(project))
    } catch (error) {
      console.log(error)
    }

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
