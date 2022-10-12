const mongoose = require("mongoose");
const Coin = require("../models/Coin.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/track-wallet";

const coins = [
    { name: "Bitcoin", ticker: "BTC", value: 19500, marketcap: 378000000000 },
    { name: "Ethereum", ticker: "ETH", value: 1300, marketcap: 164000000000 },
    { name: "Solana", ticker: "SOL", value: 30, marketcap: 11000000000 }
  ];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Coin.create(coins);
  })
  .then(coinsFromDB => {
    console.log(`Created ${coinsFromDB.length} coins`);

    return mongoose.connection.close();
  })
  .then(() => {
    console.log('DB connection closed');
  })
  .catch(err => {
    console.log(`An error occurred while creating coins from the DB: ${err}`);
});