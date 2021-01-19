//подключаем http
const http = require('http')
// одключаем будущий файл app.js
const {app} = require('./app.js')
//задаем порт
const port = process.env.PORT || 3000
const mongoose = require('mongoose')



const dbURI = 'mongodb+srv://user:admin@cluster2.pn1s3.mongodb.net/testbase?retryWrites=true&w=majority'// адрес дала БД, заменили только пароль суперюзера и имя кластера
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})// само подклчюение
.then((result) => http.createServer(app).listen(port, () => {
  console.log(`DB connected, ***Listening at ${port} port***`);
}))
.catch((err)=> console.log(err))
