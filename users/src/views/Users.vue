                    /*  Aula 319 Router Guard 15/06/23 
                        Aula 321 Listagem de Usuários 19/06/23
                        Aula 322 Programando um modal do zero 19/06/23
                        Aula 323 Deletando Usuário 24/06/23
                        Aula 325 Linkando Views */


/*(1-319) VOU CRIAR A TELA DE GESTÃO DE USUÁRIOS */

<template>
    <div>
        <h1 class="h1">Painel Administrativo</h1>

<!--(4-321) CRIANDO UMA TABELA (EU COPIEI DA DOCUMENTAÇÃO DO BULMA )-->
<table class="table">
  <thead>
    <tr>
     
      <th>Nome</th>
      <th>E-mail</th>
      <th>Cargo</th>
      <th>Ações</th>
 
    </tr>
  </thead>

<!--(5-321) VOU FAZER UM V-FOR PARA CADA USUÁRIO NO MEU ARRAY DE USUÁRIOS (users) CHAVE QUE VAI SER O ID 
DO USUÁRIO -->
  <tbody>
    <tr v-for="user in users" :key= "user.id">
      <td>{{user.name}}</td>
      <td>{{user.email }}</td>
<!-- ESTOU RETORNANDO O VALOR DE O PARA USER, E O VALOR DE 1 PARA ADMIN, EU NÃO QUERO APENAS MOSTRAR
NÚMEROS PARA IDENTIFICAR USER DE ADMIN -->
      <td v-if="user.role == 0">User</td>
      <td v-if="user.role == 1">Admin</td>


      <td>
<!--(20-325) linkando os botões, QUANDO O USUÁRIO CLICAR EM EDITAR, VOU REDIRECIONÁ-LO PARA A ROTA
USERSEDIT-->
        <router-link :to="{name: 'UsersEdit', params:{id: user.id}}"><button class="button is-success">Editar</button></router-link>
      <!--(14-322)-->
        <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button>
      </td>
    </tr>
  </tbody>
  </table>
<!--(9-322) CLASSE COM BASE NA VARIÁVEL SHOWMODAL (8-322)-->
<!--(6-322) PARA ATIVAR O MODAL EU PRECISO INSERIR UM IS ACTIVE--->
<div  :class="{modal: true, 'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-content">

<!--(7-322) COLANDO A ESTRUTURA CARD DENTRO DO MODAL -->
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Tem certeza que deseja deletar esse usuário ?
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <p>Teste Modal</p>
    </div>
  </div>
  <footer class="card-footer">
<!--(12-322) CLICAR EM FECHAR O MODAL FECHA-->
    <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
<!--(18-323) EVENTO DE CLICK, REF A FUNÇÃO DELETEUSER (17-323)-->
    <a href="#" class="card-footer-item" @click="deleteUser()">Sim, quero deletar!</a>
  </footer>
</div>

  </div>
<!--(11-322) ESCONDE O MODAL ATRÁVES DO MÉTODO DE CLICK (chamando o hidemodal (10-322))-->
  <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
</div>

  </div>    
</template>



<script>
/*(1-321) IMPORTAR AXIOS - CRIANDO UMA FUNÇÃO CREATE*/
import axios from 'axios';

export default {
    created(){
/*(2-321) LEMBRANDO QUE ESSA ROTA USER, ESTÁ PROTEGIDA POR UM MIDDLEWARE, ISSO SIGNIFICA QUE EU PRECISO 
MANDAR JUNTO COM O TOKEN  */
        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }

        axios.get("http://localhost:8686/user",req).then(res => {
            console.log(res);
/*QUANDO A REQUISIÇÃO DO AXIOS DAR CERTO */
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        })
        console.log("Olá");
    },
    
    /*(3-321) CRIAR MÉTODO DATA QUE VAI RETORNAR UM JSON COM OS DADOS PARA A GENTE*/
    data()
  {
    return {
        users: [],
/*(8-322) CRIAR UMA VARIÁVEL NO DATA */
        showModal: false,
/*(15-323) VAI ARMAZENAR O ID DO USUÁRIO QUE EU QUERO DELETAR, SÓ COLOCO -1 PORQUE NÃO EXISTE 
NENHUM USUÁRIO COM ESSE VALOR*/
        deleteUserId: -1
    }
  },

/*(10-322) MÉTODO HIDE MODAL QUE BASICAMENTE QUE VAI DAR UM THIS.SHOWMODAL = FALSE */
  methods: {
    hideModal(){
      this.showModal = false;
    },
    /*(13-322)ESSE MÉTODO VAI RECEBER O ID DO USUÁRIO QUE VAI SER DELETADO  */
  showModalUser(id){
    console.log("Id do user: "+ id);
    this.showModal = true;
    /*(16-323) */
    this.deleteUserId = id;
    },
/*(17-323) ESSA FUNÇÃO VAI TRABALHAR COM O A PROPRIEDADE DELETEUSERID, VAI FAZER UMA REQUISIÇÃO AXIOS */
    deleteUser(){

/* A ROTA DE DELETE ESTA PROTEGID A PELO MIDDLEWARE
LEMBRANDO QUE ESSA ROTA USER, ESTÁ PROTEGIDA POR UM MIDDLEWARE, ISSO SIGNIFICA QUE EU PRECISO 
MANDAR JUNTO COM O TOKEN  */
        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }
// ESTOU PASSANDO O MEU TOKEN AQUI NO REQ (req)
      axios.delete("http://localhost:8686/user/"+this.deleteUserId, req).then(res => {
          console.log(res);
          this.showModal = false;
/*(19-323)QUERO ATUALIZAR EM TEMPO REAL TODA VEZ QUE EU DELETO UM USUÁRIO EM VEZ DE CARREGAR A PÁGINA 
TODA HORA */
/* ESTOU FILTRANDO OS USUÁRIOS QUE SEJAM DIFERENTES DE DELETE-USER-ID (vou percorrer o array de 
usuários e vou manter somente os usuários que tenham o id diferentes do usuário que eu quero deletar)*/
          this.users = this.users.filter(u => u.id != this.deleteUserId);

      }).catch(err => {
        console.log(err);
        this.showModal = false;
      });
    }
  }
}
</script>


<style scoped>
    .h1{
        background-color: greenyellow;
        padding: 20px;
        color: white;
        font-weight: bold;
        font-size: 18px;
    }

    .table{
       margin-left: 30%;
       background: rgba(160, 151, 151, 0.945);
       margin-top: 10px;
       border: solid 1px black;
       color: white;
    }
    
    .button{
      margin-left: 10px;
    }
    

</style>