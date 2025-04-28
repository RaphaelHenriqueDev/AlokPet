import express from 'express'
import ejs from 'ejs'
import dotenv from 'dotenv'
import conn from './db/usersDb.js'
import User from './db/User.js'

//Configurções
dotenv.config();
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Rotas
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/login', (req,res) => {
    res.render('login')
})
app.get('/cadastrar', (req, res) =>{
    res.render('cadastrar')
})

app.post('/saveuser', (req, res) => {
    const { name, phone, email, password, confirmPsw } = req.body

    if (password !== confirmPsw) {
        return res.status(400).send('As senhas não conferem')
    }

    User.create({name, phone, email, password}).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
        res.status(500).send('Erro ao criar o usuário')
    })
})
//Porta
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
