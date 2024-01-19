/*                          Aula 317 Front do Login 15/06/23 
                            Aula 318 Capturando o token 15/06/23 */

                                /*  [  CRIANDO PÁGINA DE REGISTRO ]  */

/*(1-313) PÁGINA DE REGISTR0 */
<template>
    <div>
    <h2>Login</h2>
    <hr>

<div class="columns is-centered">
    <div class="column is-half">

<!--(1-317) VOU VERIFICAR SE A VARIÁVEL ERRO É DIFERENTE DE UNDEFINED -->
        <div v-if="error != undefined">
<!--    ESTOU RETIRANDO ESSE CÓD DA DOCUMENTAÇÃO DO BULMA, VAI TER UMA APARÊNCIA NO FRONT-END DE ERRO
COM BACKGROUND VERMELHO-->
        <div class="notification is-danger">
            {{error}}
        </div>
        </div>
        <p>E-mail</p>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
        <p>Password</p>
        <input type="password" placeholder="******" class="input" v-model="password">
        <hr>
<!--(2-317) INSERINDO UM EVENTO DE CLICK NO BOTÃO QUE VAI CHAMAR O MÉTODO REGISTER (4-314)-->
        <button class="button is-success" @click="login">Logar</button>
    </div>
</div>  
</div>
</template>

/*(3-317) CRIANDO UM MÉTODO (DATA BINDING) */
<script> 

/*(4-317) IMPORTANDO O AXIOS */
import axios from 'axios';

export default{
    data(){
        return{
            password: '',
            email: '',
/*(5-317) VOU CRIAR UMA VARIÁVEL ERRO, PARA TRATAR ERROS */
            error: undefined,
        }
    },
/*(6-317) CRIANDO MÉTODO LOGIN QUE VAI DAR UM CONSOLE.LOG PASSWORD E EMAIL */
    methods: {
        login(){

/*(7-318) IMPORTAR O AXIOS E FAZER UMA REQUISIÇÃO GET PARA A ROTA DE LOGIN DA API (PASTA UsersAPI) (ROUTES)*/
        axios.post("http://localhost:8686/login",{
            password: this.password,
            email: this.email

        }).then(res =>{
            console.log(res);
/*EU VOU SALVAR O TOKEN DENTRO DO LOCALSTORAGE DO NAVEGADOR (RES.DATA.TOKEN É JUSTAMENTE A RESPOSTA 
QUE ME DÁ NO CONSOLE.LOG) */
            localStorage.setItem('token', res.data.token)
// ASSIM QUE O USUÁRIO CADASTRAR COM SUCESSO O LOGIN, VOU REDIRECIONÁ-LO PARA A ROTA PRINCIPAL
            this.$router.push({name: 'Home'});
        }).catch(err => {
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