const express = require('express')
const app = express()

const indexRouter = require('./routes/index')
const wordsRouter = require('./routes/words')
// const authRouter = require('./routes/auth')


const { config } = require('./middleware')
config(app)

app.use(indexRouter);
app.use('/words', wordsRouter)
// app.use('/auth',authRouter )

module.exports = {app}
