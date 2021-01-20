config = (app) => {
  
  //модули
  const express = require('express');
  const morgan = require('morgan');
  const hbs = require('hbs');
  const path = require('path');
  const bcrypt = require('bcrypt')
  // const methodOverride = require('method-override')
 
  // модуль для работы с куками (удаление, установка и чтение кук)
  const cookieParser = require("cookie-parser")

  // модуль для работы с сессиями
  const session = require("express-session")


  // модуль для хранения сессий в виде файлов на сервере (см. папку sessions)
  const FileStore = require("session-file-store")(session)

  // самописная функция очистки кук
  const { cookiesCleaner } = require("./auth")
  
  //подключаем БД
  // const dbConnect = require('./dbConnect')
  // dbConnect()
  //логирование
  app.use(morgan('dev'))

  // использование cookieParser (доступ к кукам которые хранятся в браузере)
  app.use(cookieParser())

  // через middleware (app.use), используем функцию session с нужными нам настройками
  app.use(
    session({
      store: new FileStore(), // тип хранилища - FileStore, который создаёт нам папку с файлами
      key: "user_sid", // ключ - название куки
      secret: "anything here", // слово используемое для шифрования, может быть любым
      resave: true, // настройка пересохранения куки, при каждом запросе
      saveUninitialized: false, // настройка создания сессии, даже без авторизации
      cookie: {
        expires: 600000, // время "протухания" куки
        httpOnly: false // по умолчанию true
      }
    })
  )

  // Возможность очищать куки
  app.use(cookiesCleaner)

  
  //статика('..' - выйти на уровень выше)
  app.use(express.static(path.join(__dirname, '..', 'public')))
  
  //установка граф.движка и место его основной папки
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'))
  //Регистрация Partials
  hbs.registerPartials(path.join(__dirname, '..', 'views/partials'));
  
  //установка расшифровки запросов
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())


  //подключаем метод оверрайд
  // app.use(methodOverride(function (req, res) {
  //   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  //     // look in urlencoded POST bodies and delete it
  //     const method = req.body._method;
  //     delete req.body._method;
  //     return method;
  //   }
  // }));
  
  // метод оверрайд
  app.use((req, res, next) => {
    // console.log(req);
    if(req.query._method) {
      req.method = req.query._method
    }
    next()
  })
    
 // подключаем рес.локалс, чтобы прокидывать  
  app.use((req, res, next) => {
    if(req.session.user) 
    res.locals.user = req.session.user
    next();
  })


  }
  module.exports = {config}
