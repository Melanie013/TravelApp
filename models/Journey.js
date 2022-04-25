const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const journey = new Schema(
  {
    destination: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    date: date,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Journey = model("Journey", journey);

module.exports = User;
