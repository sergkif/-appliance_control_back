const mongoose = require('mongoose');

const washingMachinesSchema = new mongoose.Schema({});

const WashingMachines = mongoose.model('WashingMachines', washingMachinesSchema, 'washing_machines');
module.exports = WashingMachines;