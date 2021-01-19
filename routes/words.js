const router = require('express').Router()
const fetch = require('node-fetch');
const mongoose = require('mongoose')
const Card = require('../models/Card')

router.get('/', async (req, res)=> {// все слова списком
  const cards = await Card.sorted()
  // console.log(cards);

  res.render('words', {cards})
})

module.exports = router


router.get('/new', (req, res) => {
  res.render('newWord')
})



router.post('/new', async (req, res) => {
  const {word, lang} = req.body  // принимаем данные с фронта(слово и язык)
  // console.log(word, lang);/

  const projectId = 'translator-297506';

  // подключаем библиотеку Гугл для перевода
  const {Translate} = require('@google-cloud/translate').v2;
  
  // идентифицируем  ключ и проект
  const translate = new Translate({projectId,
    keyFilename: './Translator-a16e57c5715f.json' });
  
  async function quickStart() {
    // получили текст с фронта для перевода
    const text = word;
  
    // Tполучили целевой язык с фронта
    const target = lang;
  
 //переводим
    const [translation] = await translate.translate(text, target);
  // отправляем на форнт результаты
    res.json({translation, text, target})
    
  }
  quickStart();

})

router.post('/new/add', async (req, res)=> {
  const {incomeText, outcomeText, tag} = req.body
  // if()
  // console.log(incomeText, outcomeText, tag);
  const card = await Card.create({incomeText, outcomeText, tag})

  res.status(201).json({card: card._id})
})


router.get('/:id', async (req, res) => {// одна карточка
  const {id} = req.params
  console.log(id);

  const card = await Card.findById(req.params.id)
  res.render('card', {card})
})
  

router.get('/bytag/:id', async (req, res) => {// получение всех карт по тэгу
  const {id} = req.params
  console.log(id);
  const cards = await Card.find({tag: id})
  console.log(cards);
  res.json({cards})
  // res.render('byTag', {cards})

})


router.delete('/:id', async function (req, res, next) {// удаление карточки
  let cardToDel = await Card.findByIdAndDelete(req.params.id)
  console.log(req.params.id);
  let cards = await Card.find();
  cards.sort(function(a, b) {
    return a.createdAt - b.createdAt;
  })
  setTimeout(()=> {
    res.render('words', {cards })
  }, 500)

});
