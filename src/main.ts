// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders";
import { registerPlugins } from "@/plugins"; // Assuming this initializes Vuetify and other plugins

const app = createApp(App);

// Register the DataLoaderPlugin before the router
app.use(DataLoaderPlugin, { router });
app.use(router);

registerPlugins(app);

app.mount("#app");
