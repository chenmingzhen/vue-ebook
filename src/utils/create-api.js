import CreateAPI from 'vue-create-api';
import Vue from 'vue';
import Toast from '../components/common/Toast';
import Popup from '../components/common/Popup';

Vue.use(CreateAPI);
Vue.createAPI(Toast, true);
Vue.createAPI(Popup, true);
 Vue.mixin({
  methods: {
    toast(settings, time = 10000) {
      return this.$createToast({
        $props: { text: settings, timeout: time }
      });
    },
    popup(settings) {
      return this.$createPopup({
        $props: settings
      });
    }
  }
});
