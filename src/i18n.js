import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './i18n/en/lang'
import zhtw from './i18n/zh-tw/lang'

Vue.use(VueI18n)

const locale = localStorage.getItem('locale') || 'zhtw'

const i18n = new VueI18n({
  locale,
  messages: { en, zhtw }
})

export default i18n