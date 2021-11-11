// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faTeamspeak, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

import './main.css'
// import logo from './assets/images/corp.png'
import DefaultLayout from '~/layouts/Default.vue'

config.autoAddCss = false
library.add(faTeamspeak)
library.add(faDiscord)
library.add(faYoutube)

export default function (Vue, { head }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Rajdhani:wght@400;500;600&display=swap'
  })

  head.meta.push({ name: 'keywords',  content: 'équipe, team, clan, Arma, simulation, réalisme, tactique' })

  // Open Graph
  head.meta.push({ property: 'og:type', content: 'website' })
  head.meta.push({ property: 'og:title', content: 'CORP - Équipe Arma 3 simulation/réalisme' })
  head.meta.push({ property: 'og:url', content: 'https://www.corp-arma.fr' })
  // head.meta.push({ property: 'og:image', content: 'https://www.corp-arma.fr' + logo })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('FontAwesome', FontAwesomeIcon)
}
