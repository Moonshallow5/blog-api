/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#13171f',
  }
}
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  
  theme: {

    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
