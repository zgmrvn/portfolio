import PrismicDOM from 'prismic-dom'

import linkResolver from './link-resolver.js'

const Elements = PrismicDOM.RichText.Elements
const IMAGE_WIDTH = 992

export default function(type, element, content, children) {
  switch(type) {
    case Elements.paragraph:
      return `<p class="text-justify w-full md:w-3/4 mx-auto mt-4">${children.join('')}</p>`

    case Elements.hyperlink:
      const target = element.data.target ? `target="${element.data.target}" rel="noopener"` : ''
      const linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
      return `<a class="underline text-gray-600 hover:text-blue-500" ${target} href="${linkUrl}">${content}</a>`

    case Elements.list:
      return `<ul class="w-full md:w-3/4 mx-auto mt-4 list-disc list-inside px-4">${children.join('')}</ul>`

    case Elements.listItem:
      return `<li>${children.join('')}</li>`

    case Elements.image:
      const height = Math.round(IMAGE_WIDTH / element.dimensions.width * element.dimensions.width)

      return (`<img
                 src="${element.url}&w=${IMAGE_WIDTH}"
                 width="${IMAGE_WIDTH}"
                 height="${height}"
                 alt="${element.alt}"
                 class="mt-4 border border-gray-200 rounded-sm"
               >
             `)

    case Elements.embed:
      switch (element.oembed.provider_name) {
        case 'YouTube':
          const key = element.oembed.embed_url.split('/').slice(-1)[0]

          return (`
            <div data-oembed="${element.oembed.embed_url}"
              data-oembed-type="${element.oembed.type}"
              data-oembed-provider="${element.oembed.provider_name}"
              class="relative w-full md:w-3/4 mx-auto mt-4 h-0 overflow-hidden"
              style="padding-bottom: 42%;"
            >
              <iframe
                width="480"
                height="360"
                class="absolute w-full h-full left-0 top-0"
                src="https://www.youtube.com/embed/${key}?feature=oembed"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          `)
    
        case 'Imgur':
          const url = element.oembed.embed_url.slice(8)

          return (`
            <video
              width="${element.oembed.width}"
              height="${element.oembed.height}"
              class="w-full md:w-3/4 mx-auto mt-4"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="https://i.${url}.mp4" type="video/mp4">
            </video>
          `)
      }

    // Return null to stick with the default behavior for all other elements
    default:
      return null
  }
}
