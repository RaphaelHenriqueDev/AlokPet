import express from 'express'
import ejs from 'ejs'
import dotenv from 'dotenv'
import conn from './db/usersDb.js'
import User from './db/User.js'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'

//Configurções
dotenv.config();
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}))
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})


//Rotas
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/login', (req,res) => {
    res.render('login')
})
app.post('/login', async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({where: { email }})

        if (!user) {
            return res.status(400).send('Usuário não encontrado')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).send('Senha inválida')
        }

        req.session.userId = user.id
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro interno no servidor')
    }
})
app.get('/cadastrar', (req, res) =>{
    res.render('cadastrar')
})
app.post('/saveuser', async (req, res) => {
    const { name, phone, email, password, confirmPsw } = req.body;

    if (password !== confirmPsw) {
        return res.status(400).send('As senhas não conferem');
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword
        });

        req.session.userId = newUser.id;
        req.session.save((err) => {
            if (err) {
                console.log('Erro ao salvar a sessão:', err);
                return res.status(500).send('Erro ao criar sessão');
            }
            res.redirect('/');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar o usuário');
    }
})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})
//Porta
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
