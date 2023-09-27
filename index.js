const express = require('express')
const sequelize = require('./db')
const UserModel = require('./models');

const app = express()
const port = 3000


app.get('/init', async (req, res) =>  {
    const api_Statistics = req.headers.api_statistics
    //записываем в БД
    //получаем нашего пользователя
    try{
        const isUserCreate = await UserModel.findOne({ where: { api_Statistics: `${api_Statistics}` } })
        if(isUserCreate) {
            //уже есть такой пользователь, значит просто обновляем ему последнее время
            isUserCreate.lastDate = new Date()
            await isUserCreate.save()
        } else {
            //такого пользователя нет, значит создаём его
            UserModel.create({
                startDate: new Date(),
                lastDate: new Date(),
                api_Standart: req.headers.api_standart || '',
                api_Statistics: api_Statistics || '',
                api_Advert: req.headers.api_advert || '',
            }).catch(err=>console.error("Ошибка создания пользователя",err))
        }
        res.send('SUCCESS!')
    } catch(err) {
        console.error("Ошибка поиска пользователя или изменения lastDate у него",err)
        res.send('ERROR!')
    }
})

app.get('/startBD', async (req, res) =>  {
    //запускаем БД
    try {
        await sequelize.authenticate()
        await sequelize.sync(/* {force: true} */)
        console.log("подключенно к БД")
        res.send('SUCCESS Start BD!')
    } catch (e) {
        console.error('подключение к БД сломалось', e)
        res.send('ERROR!')
    }
})

// app.get('/stopBD', async (req, res) => {
//     //останавливаем БД
//     try {
//         await sequelize.authenticate()
//         await sequelize.sync(/* {force: true} */)
//         console.log("подключенно к БД")
//     } catch (e) {
//         console.error('error', e)
//         console.error("подключение к БД сломалось")
//     } finally {
//         res.send('SUCCESS!')
//     }
// })

app.get('/getCount', (req, res) => {
    //Получаем из бд
    const data = UserModel.findAll()
    console.log("data", data)
    res.send(data)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))