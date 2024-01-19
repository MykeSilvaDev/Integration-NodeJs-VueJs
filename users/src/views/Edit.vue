/*                              Aula 313 Formulário de Cadastro 09/06/23
                                Aula 314 Capturando dados de um formulário 09/06/23 
                                Aula 315 Enviando dados para a API 13/06/23
                                Aula 316 Tratando Resposta 13/06/23
                                Aula 324 Página de Edição 24/06/23
                                Aula 326 Editando Usuário */

                                /*  [  CRIANDO PÁGINA DE REGISTRO ]  */

/*(1-313) PÁGINA DE REGISTR0 */
<template>
    <div>
    <h2>Edição de Usuário</h2>
    <hr>

<div class="columns is-centered">
    <div class="column is-half">

<!--(9-316) VOU VERIFICAR SE A VARIÁVEL ERRO É DIFERENTE DE UNDEFINED -->
        <div v-if="error != undefined">
<!--    ESTOU RETIRANDO ESSE CÓD DA DOCUMENTAÇÃO DO BULMA, VAI TER UMA APARÊNCIA NO FRONT-END DE ERRO
COM BACKGROUND VERMELHO-->
        <div class="notification is-danger">
            {{error}}
        </div>
        </div>

<!-- NO ARQUIVO USERSAPI - CONTROLLER -> ARQ UserController TEM O MÉTODO CREATE, QUE EXIGEM NAME, EMAIL, PASSWORD
PARA CRIAR UM USUÁRIO-->
        <p>Nome</p>
<!--(3-314) ADICIONANDO V-MODEL (2-314) ESTOU FAZENDO UM DATA BINDING, ESTOU DECLARANDO AS PROPRIEDADES QUE SERÃO
LIGADAS AS TAGS HTML (name, password, email)-->
        <input type="text" placeholder="Nome do Usuário" class="input" v-model="name">
        <p>E-mail</p>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
       
        <hr>
<!--(5-314) INSERINDO UM EVENTO DE CLICK NO BOTÃO QUE VAI CHAMAR O MÉTODO REGISTER (4-314)-->
        <button class="button is-success" @click="update">Editar</button>
    </div>
</div>  
</div>
</template>

/*(2-314) CRIANDO UM MÉTODO (DATA BINDING) */
<script> 

/*(6-315) IMPORTANDO O AXIOS */
import axios from 'axios';

export default{
/*(11-324) VOU FAZER UMA VERIFICAÇÃO COM O MÉTODO CREATE, E O ID QUE O USUÁRIO PASSOU, É VÁLIDO OU NÃO  */
    created(){

        // VOU CRIAR UMA VARIÁVEL PARA PASSAR O TOKEN JWT 
        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }

// VAI PUXAR OS PARÂMETROS QUE O USUÁRIO DIGITOU NA ROTA 
        axios.get("http://localhost:8686/user/" +  this.$route.params.id, req).then(res => {
            console.log(res);
// CASO EU ACHE O USUÁRIO (OS CAMPOS VÃO MOSTRAR OS DADOS DOS USUÁRIOS)
            this.name = res.data.name;
            this.email = res.data.email;
            this.id = res.data.id;
        
        }).catch(err => {
            console.log(err.response);
/*CASO O USUÁRIO NÃO EXISTIR EU VOU PASSAR O USUÁRIO PARA A OUTRA ROTA  */
            this.$router.push({name: 'Users'});
        })
    },
    data(){
        return{
            name: '',
            email: '',
/*(12-324) CRIANDO CAMPO EMAIL */
            id: -1,
/*(8-316) VOU CRIAR UMA VARIÁVEL ERRO, PARA TRATAR ERROS */
            error: undefined,
        }
    },



/*(4-314) CRIANDO MÉTODO DE REGISTER QUE VAI DAR UM CONSOLE.LOG NO NAME, PASSWORD E EMAIL */
    methods: {
        update(){

  // (13-326) VOU CRIAR UMA VARIÁVEL PARA PASSAR O TOKEN JWT 
  var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }


/*(14-326) MUDAR O VERBO DE GET PARA PUT*/
/*(7-315) IMPORTAR O AXIOS E FAZER UMA REQUISIÇÃO GET PARA A ROTA PRINCIPAL DA API (PASTA UsersAPI)
-> 1º REQUISIÇÃO  axios.get("http://localhost:8686/"
-> 2º REQUISIÇÃO axios.post("http://localhost:8686/user"*/
        axios.put("http://localhost:8686/user",{
            name: this.name,
            email: this.email,
/*(15-326) PASSANDO O ID E O REQ, */
            id: this.id
        }, req).then(res =>{
            console.log(res);
/*(16-326) SE TUDO DER CERTO, VOU REDIRECIONAR O USUÁRIO PARA A ROTA USERS*/
            this.$router.push({name: 'Users'});
        }).catch(err => {
/*(10-316) */
            var msgErro = err.response.data.err;
            this.error = msgErro;

           
        })

    }
}    

}

</script>


/**/
<style scoped>

</style>