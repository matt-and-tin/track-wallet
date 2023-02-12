const { Schema, model } = require('mongoose');


const portSchema = new Schema(
    {
        title: String,
        value: Number,
        owner: [{
            type: Schema.Types.ObjectId,
            ref: "User",
          }],
              coin:[{
                type: Schema.Types.ObjectId,
                   ref: "Coin"
              }],
  //       portfolio: [
  //         {
  //           coin:{
  //             type: Schema.Types.ObjectId,
  //                ref: "Coin"
  //           },
  //             amount: Number
  //   }
  // ],    
    },
);

module.exports = model('Portfolio', portSchema);