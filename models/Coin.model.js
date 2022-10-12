const { Schema, model } = require('mongoose');


const coinSchema = new Schema(
    {
        name: String,
        ticker: String,
        value: Number,
        marketcap: String,
    },
);

module.exports = model('Coin', coinSchema);