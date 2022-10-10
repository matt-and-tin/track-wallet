const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema(
    {
        name: String,
        marketcap: String,
        value: Number,
        ticker: String,
    },
);

module.exports = model('Coin', coinSchema);