const mongoose = require('mongoose');

const ovensSchema = new mongoose.Schema({});

const Ovens = mongoose.model('Ovens', ovensSchema, 'ovens');
module.exports = Ovens;