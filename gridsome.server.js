// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Prismic = require('@prismicio/client');

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const projectCollection = addCollection('Project')

    try {
      const api = await Prismic.getApi(
        process.env.PRISMIC_API_ENDPOINT,
        { accessToken: process.env.PRISMIC_ACCESS_TOKEN, }
      )

      const { results } = await api.query(Prismic.Predicates.at('document.type', 'project'))

      for (const d of results) {
        projectCollection.addNode({
          slug: d.uid,
          publishAt: d.first_publication_date,
          thumbnail: d.data.thumbnail.url,
          title: d.data.title,
          description: d.data.description,
          introduction: JSON.stringify(d.data.introduction),
          mosaic: d.data.mosaic ? JSON.stringify(d.data.mosaic.map(({ image: img }) => ({ url: img.url, alt: img.alt }))) : null,
          body: JSON.stringify(d.data.body)
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
}
