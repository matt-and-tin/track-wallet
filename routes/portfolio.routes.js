const router = require('express').Router();
const Coin = require("../models/Coin.model");
const Portfolio = require("../models/Portfolio.model");

//READ: List of portfolios
router.get("/portfolio", (req, res, next) => {
    Portfolio.find()
    .populate("coin")
      .then( portFromDB => {
        
        //console.log({portfolios: portFromDB})
          res.render("portfolio/portfolio-list", {portfolios: portFromDB})
      })
      .catch( err => {
          console.log("error getting portfolios from DB", err);
          next(err);
      })
  });


//READ: Portfolio details
router.get("/portfolio/:portfolioId", (req, res, next) => {
    const id = req.params.portfolioId;

    Portfolio.findById(id)
    .populate("coin")
    .then(portDetails => {
        let tv = 0
         for(let i=0; i < portDetails.coin.length; i++){
            
             tv = tv + portDetails.coin[i].value
         }
         portDetails.value = tv

        console.log(portDetails)
        //console.log(portDetails)
        res.render("portfolio/portfolio-details", portDetails)
    })
    .catch( err => {
        console.log("error getting portfolio fom DB", err);
        next();
    })
});

//CREATE: display form
router.get("/portfolio/create", (req, res, next) => {
    Coin.find()
    .then((coinArr) => {
        res.render("portfolio/new-portfolio", {coinArr});
    })
    .catch(err => {
        console.log("error getting coins from DB", err);
        next(err);
      })
 
  
})

//CREATE: process form
router.post('/portfolio/create', (req, res, next) =>{
  const portDetails = {
    title: req.body.title,
      coin: req.body.coin,
       
  }

  Portfolio.create(portDetails)
  .then((portDetails) => {   
      res.redirect("/portfolio")
  })
  .catch(err => {

      console.log("error creating new portfolio in DB", err)
      next(err);
  })
})

//UPDATE: display form
router.get("/portfolio/:portfolioId/edit", (req, res, next) => {
    Portfolio.findById(req.params.portfolioId)
        .populate("coin")
      .then( (portDetails) => {
        console.log(portDetails)
        res.render("portfolio/edit-portfolio", portDetails);
      })
      .catch( err => {
        console.log("Error getting portfolio from DB...", err);
        next();
      });
  });

  //UPDATE: process form
  router.post("/portfolio/:portfolioId/edit", (req, res, next) => {
    const portfolioId = req.params.portfolioId;
  
    const newDetails = {
        title: req.body.title,
      coin: req.body.coin,
      amount: req.body.amount,
    }
  
    Portfolio.findByIdAndUpdate(portfolioId, newDetails)
      .then( () => {
        res.redirect(`/portfolio/${portfolioId}`);
      })
      .catch( err => {
        console.log("Error updating portfolio...", err);
        next();
      });
  });


//DELETE
router.post("/portfolio/:portfolioId/delete", (req, res, next) => {
    Portfolio.findByIdAndDelete(req.params.portfolioId)
      .then(() => {
        res.redirect("/portfolio");
      })
      .catch(err => {
        console.log("Error deleting portfolio...", err);
        next();
      });
  
  });

module.exports = router;