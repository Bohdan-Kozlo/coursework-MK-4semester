const {Schema, model} = require('mongoose');

const dataSchema = new Schema({
  temperature: Number,
  humidity: Number,
  heatIndex: Number,
  pressure: Number,
  isRaining: Boolean,
  lightIntensity: Number,
  windSpeed: Number,
  windDirection: String,
  date: Date
});

module.exports = model('Data', dataSchema)