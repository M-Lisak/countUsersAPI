const express = require('express')
const sequelize = require('./db')
const UserModel = require('./models');

const app = express()
const port = 3000


app.get('/init', (req, res) =>  {
    console.log("req", req.headers)
    //записываем в БД

})

app.get('/init1', async (req, res) =>  {
    //открываем БД
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("подключенно к БД")
    } catch (e) {
        console.error('error', e)
        console.error("подключение к БД сломалось")
    }

})

app.get('/getCount', (req, res) => {
    //Получаем из бд
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))