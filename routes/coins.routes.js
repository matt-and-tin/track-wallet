

const router = require('express').Router();
const Coin = require("../models/Coin.model");

//READ: List of all coins
router.get("/coins", (req, res, next) => {
    Coin.find()
      .then( coinsFromDB => {
          res.render("coins/coins-list", {coins: coinsFromDB})
      })
      .catch( err => {
          console.log("error getting coins from DB", err);
          next(err);
      })
  });

router.post('/coin/create', (req, res, next) =>

{
    const coinDetails = {

        name: req.body.name,
        value: req.body.value,
        marketcap: req.body.marketcap,
        ticker: req.body.ticker
    }

    Coin.create(coinDetails)
    .then(() => {   
        res.redirect("/coins")
    })
    .catch(err => {

        console.log("error creating new coin in DB", err)
        next(err);
    })
})

router.get("/coins", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        res.render("coins/coins", {coinsFromDB})
    })
    .catch(err => {

        console.log("error reading coins in DB", err)
        next(err);
    })
})

module.exports = router;