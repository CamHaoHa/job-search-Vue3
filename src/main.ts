import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import "@/index.css";

library.add(faSearch);
library.add(faAngleUp);
library.add(faAngleDown);

const pinia = createPinia();
createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
