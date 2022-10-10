const { Schema, model } = require('mongoose');


const coinSchema = new Schema(
    {
        name: String,
        marketcap: String,
        value: Number,
        ticker: String,
    },
);

module.exports = model('Coin', coinSchema);