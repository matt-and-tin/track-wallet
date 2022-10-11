const router = require('express').Router();
const Coin = require("../models/Coin.model");

//READ: Portfolio details
router.get("/portfolio/:portfolioId", (req, res, next) => {
    const id = req.params.portfolioId;

    Portfolio.findById(id)
    .then(portDetails => {
        res.render("portfolio/user-portfolio", portDetails)
    })
    .catch( err => {
        console.log("error getting portfolio fom DB", err);
        next();
    })
});

//CREATE: display form
router.get("/portfolio/create", (req, res, next) => {
    
    res.render("portfolio/new-portfolio");
 
  
})

//CREATE: process form
router.post('/portfolio/create', (req, res, next) =>{
  const portDetails = {

      coin: req.body.coin,
  }

  Portfolio.create(portDetails)
  .then(() => {   
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
      .then( (portDetails) => {
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

        coin: req.body.coin,
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