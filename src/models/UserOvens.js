const mongoose = require('mongoose');

const userOvensSchema = new mongoose.Schema({
  // power means working now or not
  power: {
    type: Boolean,
    required: true,
    default: false,
  },
  choosen_program: {
    type: String,
    required: false
  },
  appliance_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  model: {
    type: String,
    required: true
  },
  programms: {
    type: Array,
    required: true,
    default: ["Bottom Heat", "Top Heat"]
  },
  grill: {
    type: Boolean,
    required: true,
    default: false
  },
  grill_on: {
    type: Boolean,
    required: true,
    default: false
  },
  img: {
    type: String,
    required: true,
    default: "http://localhost:3001/img/noimageavailable.png"
  },
  type: {
    type: String,
    required: true
  }
});

const UserOvens = mongoose.model('UserOvens', userOvensSchema);
module.exports = UserOvens;