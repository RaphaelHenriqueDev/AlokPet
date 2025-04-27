import express from 'express'
import ejs from 'ejs'
import dotenv from 'dotenv'

//Configurções
dotenv.config();
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

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
//Porta
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
