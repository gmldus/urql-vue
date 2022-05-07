import { createApp } from 'vue';
import urql from '@urql/vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(urql, {
  url: 'http://localhost:4000/graphql',
});

app.use(router);

app.mount('#app');
