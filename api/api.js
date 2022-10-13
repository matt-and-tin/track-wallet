const router = require("express").Router();

const api = require('kucoin-node-api')



const config = {
  environment: 'live'
}

api.init(config)


// router.get("/api", (req, res, next) => {
// const currency = req.query.currency

// api
// .getCurrency("BTC")
// .then((data) => {
//     console.log(data)
//     res.render("index", data)
// })
// .catch((e) => {
//     console.log(e)
//   })
// })
// {
//     code: '200000',
//     data: {
//       currency: 'BTC',
//       name: 'BTC',
//       fullName: 'Bitcoin',
//       precision: 8,
//       confirms: 2,
//       contractAddress: '',
//       withdrawalMinSize: '0.001',
//       withdrawalMinFee: '0.0005',
//       isWithdrawEnabled: true,
//       isDepositEnabled: true,
//       isMarginEnabled: true,
//       isDebitEnabled: true
//     }



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