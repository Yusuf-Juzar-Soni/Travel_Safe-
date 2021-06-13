const mongoose = require('mongoose');

const { Schema } = mongoose;

const predictSchema = new Schema({
  Date: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Code:{
    type:String,
  },
  Confirmed: {
    type: Number,
  },
  Deaths: {
    type: Number,
  },
  Recovered: {
    type: Number,
  },
  Active: {
    type: Number,
  },
  New_cases: {
    type: Number,
  },
  New_deaths: {
    type: Number,
  },
  New_recovered: {
    type: Number,
  },
  Pscore: {
    type: Number,
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('prediction', predictSchema);
