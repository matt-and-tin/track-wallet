
const api = require("../utils/api")
const router = require('express').Router();
const Coin = require("../models/Coin.model");

//READ: List of all coins
router.get("/coins", (req, res, next) => {
    Coin.find()
      .then( coinsFromDB => {
        // console.log(coinsFromDB)
          res.render("coins/coins-list", {coins: coinsFromDB})
      })
      .catch( err => {
          console.log("error getting coins from DB", err);
          next(err);
      })
  });

//READ: Coin details
router.get("/coins/:coinId", (req, res, next) => {
    const id = req.params.coinId;

    Coin.findById(id)
    .then(coinDetails => {
      let x = coinDetails.ticker
      params = {
         base: "USD",
         currencies: x
       } 
       api.getFiatPrice(params)
        .then((data) => {
          coinDetails.value = parseFloat(Object.values(data.data))
          console.log(coinDetails)
          res.render("coins/coin-details", coinDetails)
        }) 
    })
    .catch( err => {
        console.log("error getting coin details fom DB", err);
        next();
    })
});


//CREATE: display form
router.get("/coins/create", (req, res, next) => {
    
      res.render("coins/new-coin");
   
    
})

//CREATE: process form
router.post('/coins/create', (req, res, next) =>

{
    const coinDetails = {

        name: req.body.name,
        value: req.body.value,
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

//UPDATE: display form
router.get("/coins/:coinId/edit", (req, res, next) => {
    Coin.findById(req.params.coinId)
      .then( (coinDetails) => {
        let x = coinDetails.ticker
      params = {
         base: "USD",
         currencies: x
       } 
       api.getFiatPrice(params)
        .then((data) => {
          coinDetails.value = parseFloat(Object.values(data.data))
          console.log(coinDetails)
        res.render("coins/edit-coins", coinDetails);
      })
    })
      .catch( err => {
        console.log("Error getting coin details from DB...", err);
        next();
      });
  });


  //UPDATE: process form
router.post("/coins/:coinId/edit", (req, res, next) => {
    const coinId = req.params.coinId;
  
    const newDetails = {
        name: req.body.name,
        value: req.body.value,
        marketcap: req.body.marketcap,
        ticker: req.body.ticker
    }
  
    Coin.findByIdAndUpdate(coinId, newDetails)
      .then( () => {
        res.redirect(`/coins/${coinId}`);
      })
      .catch( err => {
        console.log("Error updating coin...", err);
        next();
      });
  });


//DELETE
router.post("/coins/:coinId/delete", (req, res, next) => {
    Coin.findByIdAndDelete(req.params.coinId)
      .then(() => {
        res.redirect("/coins");
      })
      .catch(err => {
        console.log("Error deleting coin...", err);
        next();
      });
  
  });


module.exports = router;

