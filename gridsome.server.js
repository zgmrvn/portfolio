// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Prismic = require('@prismicio/client');

const projects = [
  {
    title: 'Terrain editor replacement for Arma 3 SDK tool',
    description: 'A prototype of a terrain editor aiming a replacing Arma 3 Terrain Builder, Made with Unity',
    slug: 'terrain-replace',
    thumbnail: 'https://cdnb.artstation.com/p/assets/images/images/013/305/417/large/m-s-sans-titre-2.jpg?1539017059'
  },
  {
    title: 'Environnment mod for Arma 3',
    description: 'A environement pack to add variety to ',
    slug: 'utd-sahels',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Documentation UTD',
    description: 'Project gridsome, technical blog',
    slug: 'udt-documentaiton-ls',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Terrain editor replacement for Arma 3 SDK tool',
    description: 'A prototype of a terrain editor aiming a replacing Arma 3 Terrain Builder, Made with Unity',
    slug: 'terrain-replace-ss',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Environnment mod for Arma 3',
    description: 'A environement pack to add variety to ',
    slug: 'utd-sahel-kk',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Documentation UTD',
    description: 'Project gridsome, technical blog',
    slug: 'udt-documentaiton-dfg',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Terrain editor replacement for Arma 3 SDK tool',
    description: 'A prototype of a terrain editor aiming a replacing Arma 3 Terrain Builder, Made with Unity',
    slug: 'terrain-replace-dd',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Environnment mod for Arma 3',
    description: 'A environement pack to add variety to ',
    slug: 'utd-sahel-dfd',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  },
  {
    title: 'Documentation UTD',
    description: 'Project gridsome, technical blog',
    slug: 'udt-documentaiton-fdf',
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/009/587/554/large/m-s-sans-titre-1.jpg?1519815148'
  }
]

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
          body: JSON.stringify(d.data.body)
        })
      }
    }
    catch (error) {
      console.log(error)
    }

    for (const project of projects) {
      projectCollection.addNode(project)
    }
  })
}


// module.exports = function (api) {
//   api.createPages(({ graphql, createPage }) => {
//     const result = await graphql('query sorted posts')

//     result.data.allPost.edges.forEach(({ node }, i, edges) => {
//       const prev = edges[i - 1]
//       const next = edges[i + 1]
    
//       createPage({
//         path: edge.node.path,
//         component: './src/templates/PostTemplate.vue'
//         queryVariables: {
//           id: edge.node.id,
//           prevId: prev ? prev.node.id : null,
//           nextId: next ? next.node.id : null
//         }
//       })
//     })
//   })
// }