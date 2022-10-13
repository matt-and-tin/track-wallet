const router = require("express").Router();

const api = require('kucoin-node-api')



const config = {
  environment: 'live'
}

api.init(config)



router.get("/api", (req, res, next) => {
 api
 .getCurrencies(["BTC", "ETH"])
 .then((data) => {
     console.log(data)
     res.render("index", data)
 })
 .catch((e) => {
     console.log(e)
   })
 })

module.exports = api;