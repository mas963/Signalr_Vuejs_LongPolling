import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import { useSignalRStore } from './stores/signalRStore';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const signalRStore = useSignalRStore();
signalRStore.initializeSignalR();

app.mount('#app');