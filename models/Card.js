const mongoose = require("mongoose");


// const { Schema } = mongoose

const cardSchema = new mongoose.Schema({
  // cоздаем схему
  incomeText: String,
  outcomeText: String,
  tag: {
    type: String,
    default: 'No tag'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  direction: String 

 
});
cardSchema.statics.sorted = async function() {// метод сортировки
  return this.find().sort('createdAt').exec();
}

const Card = mongoose.model("Card", cardSchema); // создаем модель

module.exports = Card;// вывозим модель со всеми фичами
