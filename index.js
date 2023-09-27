const express = require('express')
const sequelize = require('./db')
const UserModel = require('./models');

const app = express()
const port = 3000


app.get('/init', async (req, res) =>  {
    console.log("req", req.headers)
    const api_Statistics = req.headers.api_statistics
    //записываем в БД
    //получаем нашего пользователя
    try{
        const isUserCreate = await UserModel.findOne({ where: { api_Statistics: `${api_Statistics}` } })
        if(isUserCreate) {
            //уже есть такой пользователь, значит просто обновляем ему последнее время
        } else {
            //такого пользователя нет, значит создаём его
            UserModel.create({
                startDate: new Date(),
                lastDate: new Date(),
                api_Standart: req.headers.api_standart || '',
                api_Statistics: req.headers.api_statistics || '',
                api_Advert: req.headers.api_advert || '',
            }).catch(err=>console.error("Ошибка создания пользователя",err))
        }
    } catch(err) {
        console.error("Ошибка поиска пользователя",err)
    } finally {
        res.send('SUCCESS!')
    }
})

app.get('/init1', async (req, res) =>  {
    //открываем БД
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
        console.log("подключенно к БД")
    } catch (e) {
        console.error('error', e)
        console.error("подключение к БД сломалось")
    } finally {
        res.send('SUCCESS!')
    }
})

app.get('/getCount', (req, res) => {
    //Получаем из бд
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))