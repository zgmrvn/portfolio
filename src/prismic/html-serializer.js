import PrismicDOM from 'prismic-dom'

const Elements = PrismicDOM.RichText.Elements

export default function(type, element, content, children) {
  switch(type) {
    case Elements.paragraph:
      return '<p class="text-justify w-3/4 mx-auto mt-4">' + children.join('') + '</p>'

    case Elements.image:
      return '<img src="' + element.url + '" alt="' + element.alt + '" class="mt-4">'

    // Add a class to hyperlinks
    case Elements.hyperlink:
      var target = element.data.target ? 'target="' + element.data.target + '" rel="noopener"' : ''
      var linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
      return '<a class="some-link"' + target + ' href="' + linkUrl + '">' + content + '</a>'

    // Return null to stick with the default behavior for all other elements
    default:
      return null
  }
}
