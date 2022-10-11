const { Schema, model } = require('mongoose');


const portSchema = new Schema(
    {
        coin: {
                 type: Schema.Types.ObjectId,
                 ref: "Coin",
                 amount: Number
               }
    },
);

module.exports = model('Portfolio', portSchema);