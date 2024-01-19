    /*                      Aula 319 Router Guard 17/06/23  */


class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }
/*(1-319) */
    async validate(req, res){
        res.send("okay");
    }

}

module.exports = new HomeController();