/*                          Aula 312 Bibliotecas Auxiliares 07/06  */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/*(1-312) IMPORTANDO A BIBLIOTECA BULMA */
import '../node_modules/bulma/css/bulma.css'


createApp(App).use(router).mount('#app')
