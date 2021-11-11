// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const StoryblokClient = require('storyblok-js-client')

// 2. Initialize the client with the preview token
// from your space dashboard at https://app.storyblok.com
let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
})

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
      const { data } = await Storyblok.get('cdn/stories', { starts_with: 'projects/' })

      for (const s of data.stories) {
        console.log(s.content.body)

        // const content 
        // https://www.storyblok.com/docs/image-service

        // /m/500x500/filters:quality(50)

        projectCollection.addNode({
          slug: s.slug,
          publishAt: s.published_at,
          thumbnail: s.content.thumbnail.filename,
          title: s.content.title,
          description: s.content.description,
          body: JSON.stringify(s.content.body)
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