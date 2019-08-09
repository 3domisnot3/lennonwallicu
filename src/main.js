import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import i18n from './i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueQRCodeComponent from 'vue-qrcode-component'
import VueClipboards from 'vue-clipboards';
import VModal from 'vue-js-modal'

Vue.use(BootstrapVue)
library.add(faGlobe)
library.add(faFileUpload)
library.add(faStickyNote)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(VueClipboards)
Vue.use(VModal)

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

new Vue({
  el: '#app',
  i18n,
  router,
  render: h => h(App),
  mounted () {
    // Needed for spa-prerender-plugin
    document.dispatchEvent(new Event('render-event'))
  },
})
