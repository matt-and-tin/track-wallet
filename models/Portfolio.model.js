const { Schema, model } = require('mongoose');


const portSchema = new Schema(
    {
        title: String,
        value: Number,
        owner: [{
            type: Schema.Types.ObjectId,
            ref: "User",
          }],
        coin: [{
                 type: Schema.Types.ObjectId,
                 ref: "Coin",
               }],    
    },
);

module.exports = model('Portfolio', portSchema);