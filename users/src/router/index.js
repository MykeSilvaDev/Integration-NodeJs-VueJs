/*                          Aula 313 Formulário de Cadastro 07/06/23
                            Aula 317 Front Login 15/06/23 
                            Aula 319 Router Guard 15/06/23
                            Aula 320 Autorização no back-end 17/06/23
                            Aula 324 Página de Edição 24/06/23
 */


import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
/*(1-313) IMPORTAR ARQUIVO DA PASTA VIEWS (Register.vue) */
import Register from '../views/Register.vue'
/*(3-317) IMPORTAR ARQ DA PASTA VIEWS (Login.vue) */
import Login from '../views/Login.vue'
/*(5-319) IMPORTAR ARQ DA PASTA VIEWS (Users.vue) */
import Users from '../views/Users'
/*(7-320) IMPORTAR O AXIOS */
import axios from 'axios';
/*(11-324) IMPORTAR ARQ DA PASTA VIEWS (Edit.vue) */
import Edit from '../views/Edit.vue'


/*(8-320) ESSA FUNÇÃO VAI TER OS MESMO PARÂMETROS QUE O BEFORE ENTER (6-319) */ 
function AdminAuth(to, from, next ){
  /*SE LOCALSTORAGE FOR DIFERENTE DE UNDEFINED SIGNIFICA QUE O TOKEN EXISTE E VOU FAZER UM NEXT, O USUÁRIO
PODE PROSSEGUIR PARA A PRÓXIMA ROTA */
if(localStorage.getItem('token') != undefined){
  /*(9-320) CHAMANDO O AXIOS E FAZENDO UMA REQUISIÇÃO  */
  
  // VOU CRIAR UMA VARIÁVEL PARA PASSAR O TOKEN JWT 
        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }

/* PRINTA {headers: {...}} {data: "okay"} */
        console.log(req);
        axios.post("http://localhost:8686/validate",{},req).then(res => {
        console.log(res);
        next();
  // SE ACONTECER UM ERRO VOU REDIRECIONAR PARA A ROTA DE LOGIN
        }).catch(err => {
          console.log(err.response);
          next("/login")
        });
  // SE NEXT FOR FALSO, O USUÁRIO É IMPEDIDO DE PROSSEGUIR NA ROTA E SERÁ REDIRECIONADO PARA A ROTA DE LOGIN
      }else{
        next("/login"); 
      }
}

              /*          [ ROTAS ] */

// ROTA DA HOME
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

/*(2-313) CRIANDO UMA NOVA ROTA REGISTER */
  {
// caminho
    path: '/register',
//  nome
    name: 'Register',
// componente
    component: Register
  },

/*(4-317) CRIANDO ROTA LOGIN */
{
  path:'/login',
  name: 'Login',
  component : Login
},
/*(6-319) CRIANDO ROTA USERS */
{
  path: '/admin/users',
  name: 'Users',
  component: Users,
/*(10-320) EU ESTOU FAZENDO ESSA VALIDAÇÃO NO BEFORE ENTER
(ANTES DO USUÁRIO ENTRAR NA ROTA EU VOU FAZER A VERIFICAÇÃO SE É ADMIN OU NÃO, COM ISSO COM GERAR
 UM TOKEN DIFERENTDE UNDEFINED) */
  beforeEnter: AdminAuth
},

/*(12-324) CRIANDO UMA ROTA  */
{
  path: '/admin/users/edit/:id',
  name: 'UsersEdit',
  component: Edit,
  beforeEnter: AdminAuth
},

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
