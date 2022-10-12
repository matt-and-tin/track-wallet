const { Schema, model } = require('mongoose');


const portSchema = new Schema(
    {
        title: String,
        value: Number,
        coin: [{
                 type: Schema.Types.ObjectId,
                 ref: "Coin",
               }],    
    },
);

module.exports = model('Portfolio', portSchema);