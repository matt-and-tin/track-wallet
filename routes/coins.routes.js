

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

//READ: Coin details
router.get("/coins/:coinId", (req, res, next) => {
    const id = req.params.coinId;

    Coin.findById(id)
    .then(coinDetails => {
        res.render("coins/coin-details", coinDetails)
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

router.post('/coins/create', (req, res, next) =>

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

//UPDATE: display form
router.get("/coins/:coinId/edit", (req, res, next) => {
    Coin.findById(req.params.bookId)
      .then( (coinDetails) => {
        res.render("coins/coin-edit", coinDetails);
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
>>>>>>> refs/remotes/origin/main
