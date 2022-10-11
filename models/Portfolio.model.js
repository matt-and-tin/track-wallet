const { Schema, model } = require('mongoose');


const portSchema = new Schema(
    {
        title: String,
        coin: {
                 type: Schema.Types.ObjectId,
                 ref: "Coin",
               },
        amount: Number
    },
);

module.exports = model('Portfolio', portSchema);