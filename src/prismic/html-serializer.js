import PrismicDOM from 'prismic-dom'

const Elements = PrismicDOM.RichText.Elements
const IMAGE_WIDTH = 992

export default function(type, element, content, children) {
  switch(type) {
    case Elements.paragraph:
      return '<p class="text-justify w-3/4 mx-auto mt-4">' + children.join('') + '</p>'

    case Elements.image:
      const height = Math.round(IMAGE_WIDTH / element.dimensions.width * element.dimensions.width)

      return (`<img
                 src="${element.url}&w=${IMAGE_WIDTH}"
                 width="${IMAGE_WIDTH}"
                 height="${height}"
                 alt="${element.alt}"
                 class="mt-4"
               >
             `)

    case Elements.hyperlink:
      var target = element.data.target ? 'target="' + element.data.target + '" rel="noopener"' : ''
      var linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
      return '<a class="some-link"' + target + ' href="' + linkUrl + '">' + content + '</a>'

    case Elements.embed:
      const key = element.oembed.embed_url.split('/').slice(-1)[0] 

      return (`
        <div data-oembed="${element.oembed.embed_url}"
          data-oembed-type="${element.oembed.type}"
          data-oembed-provider="${element.oembed.provider_name}"
          class="relative w-3/4 mx-auto mt-4 h-0"
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

    // Return null to stick with the default behavior for all other elements
    default:
      return null
  }
}
