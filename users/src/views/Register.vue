/*                              Aula 313 Formulário de Cadastro 09/06/23
                                Aula 314 Capturando dados de um formulário 09/06/23 
                                Aula 315 Enviando dados para a API 13/06/23
                                Aula 316 Tratando Resposta 13/06/23*/

                                /*  [  CRIANDO PÁGINA DE REGISTRO ]  */

/*(1-313) PÁGINA DE REGISTR0 */
<template>
    <div>
    <h2> Registro de Usuário</h2>
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
        <p>Password</p>
        <input type="password" placeholder="******" class="input" v-model="password">
        <hr>
<!--(5-314) INSERINDO UM EVENTO DE CLICK NO BOTÃO QUE VAI CHAMAR O MÉTODO REGISTER (4-314)-->
        <button class="button is-success" @click="register">Cadastrar</button>
    </div>
</div>  
</div>
</template>

/*(2-314) CRIANDO UM MÉTODO (DATA BINDING) */
<script> 

/*(6-315) IMPORTANDO O AXIOS */
import axios from 'axios';

export default{
    data(){
        return{
            name: '',
            password: '',
            email: '',
/*(8-316) VOU CRIAR UMA VARIÁVEL ERRO, PARA TRATAR ERROS */
            error: undefined,
        }
    },
/*(4-314) CRIANDO MÉTODO DE REGISTER QUE VAI DAR UM CONSOLE.LOG NO NAME, PASSWORD E EMAIL */
    methods: {
        register(){
/*(7-315) IMPORTAR O AXIOS E FAZER UMA REQUISIÇÃO GET PARA A ROTA PRINCIPAL DA API (PASTA UsersAPI)
-> 1º REQUISIÇÃO  axios.get("http://localhost:8686/"
-> 2º REQUISIÇÃO axios.post("http://localhost:8686/user"*/
        axios.post("http://localhost:8686/user",{
            name: this.name,
            password: this.password,
            email: this.email

        }).then(res =>{
            console.log(res);
// ASSIM QUE O USUÁRIO CADASTRAR COM SUCESSO O LOGIN, VOU REDIRECIONÁ-LO PARA A ROTA PRINCIPAL
            this.$router.push({name: 'Home'});
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