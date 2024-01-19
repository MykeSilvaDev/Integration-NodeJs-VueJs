    /*                      Aula 315 Enviando dados para a API 13/06/23  */

var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/routes")
/*(1-315) INSTALANDO A BIBLIOTECA (CORS) */
var cors = require("cors");
/*(2-315) */
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
