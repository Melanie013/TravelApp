const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const journey = new Schema(
  {
    destination: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date
  },
  owner: {
    type: Schema.Types.ObjectId,  
    ref: 'User.model'
    
  }
  
    // this second object adds extra properties: `createdAt` and `updatedAt`
  }
);

const Journey = model("Journey", journey);

module.exports = Journey;
