import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import MuseUI from 'muse-ui';
import axios from 'axios';
import axiosConfig from '@/modules/axios-config';
import util from '@/modules/util';

import 'muse-ui/dist/muse-ui.css';

util.registerArrayLast();

// 關閉 vue instance 產生時的提示
Vue.config.productionTip = false;
Vue.use(MuseUI);
Vue.use(axiosConfig);

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app');
