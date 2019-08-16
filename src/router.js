import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewMessage from './views/NewMessage.vue'
import NewFile from './views/NewFile.vue'
import Read from './views/Read.vue'
import ReadRopsten from './views/ReadRopsten.vue'
import Redirect from './views/Redirect.vue'

Vue.use(Router)

export default new Router({
  publicPath: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '連儂牆 ICU | Lennon Wall ICU',
        metaTags: [
          {
            name: 'description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          },
          {
            property: 'og:description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: Home,
      meta: {
        title: '連儂牆 ICU - 關於| Lennon Wall ICU - About',
        metaTags: [
          {
            property: 'og:description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          }
        ]
      }
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: Redirect,
    },
    {
      path: '/new-message',
      name: 'NewMessage',
      component: NewMessage,
      meta: {
        title: '連儂牆 ICU - 新增記錄| Lennon Wall ICU - New Message',
        metaTags: [
          {
            name: 'description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          },
          {
            property: 'og:description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          }
        ],
      }
    },
    {
      path: '/new-file',
      name: 'NewFile',
      component: NewFile,
      meta: {
        title: '連儂牆 ICU - 新增檔案| Lennon Wall ICU - New File',
        metaTags: [
          {
            name: 'description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          },
          {
            property: 'og:description',
            content: '表達自由的恒久地 Permanent place for freedom of expression'
          }
        ],
      }
    },
    {
      path: '/tx/:txHash',
      name: 'read2',
      component: Read,
      props: true,
      meta: {
        title: '連儂牆 ICU - 閱讀記錄| Lennon Wall ICU - Read Message',
      }
    },
    {
      path: '/ropsten/tx/:txHash',
      name: 'readropsten2',
      component: ReadRopsten,
      props: true,
      meta: {
        title: '連儂牆 ICU - 閱讀 Ropsten 記錄| Lennon Wall ICU - Read Ropsten Message',
      }
    },
    {
      path: '/qrcodegenerator',
      name: 'qrcodegenerator',
      component: Home,
      meta: {
        title: '連儂牆 ICU - QRCode生產器| Lennon Wall ICU - QR Code Generator',
        metaTags: [
          {
            property: 'og:description',
            content: '連儂牆 ICU - QRCode生產器| Lennon Wall ICU - QR Code Generator'
          }
        ]
      }
    },
  ]
})
