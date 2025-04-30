import express from 'express'
import ejs from 'ejs'
import dotenv from 'dotenv'
import conn from './db/usersDb.js'
import User from './db/User.js'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'
import Emp from './db/Emp.js'

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
    console.log(req.session) 
    res.render('home')
})
app.get('/login', (req,res) => {
    res.render('login')
})
app.post('/login', async (req,res) => {
    const { tipoCadastro, email, password } = req.body
    if(tipoCadastro === 'cliente'){
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
        req.session.save((err) => {
            if (err) {
              console.log('Erro ao salvar sessão:', err)
              return res.status(500).send('Erro ao salvar sessão')
            }
            res.redirect('/')
          })
        } catch (error) {
        console.log(error)
        res.status(500).send('Erro interno no servidor')
        }
    } else if (tipoCadastro === "false"){
        res.status(400).send('Por favor selecione um tipo de login')
    } else {
        try {
        const emp = await Emp.findOne({where: { email }})

        if (!emp) {
            return res.status(400).send('Empresa não encontrado')
        }

        const passwordMatch = await bcrypt.compare(password, emp.password)

        if (!passwordMatch) {
            return res.status(400).send('Senha inválida')
        }

        req.session.empId = emp.id
        req.session.save((err) => {
            if (err) {
              console.log('Erro ao salvar sessão:', err)
              return res.status(500).send('Erro ao salvar sessão')
            }
            res.redirect('/')
          })
        } catch (error) {
        console.log(error)
        res.status(500).send('Erro interno no servidor')
        }
    }
})
app.get('/cadastrar', (req, res) =>{
    res.render('cadastrar')
})
app.post('/saveuser', async (req, res) => {
    const { name, phone, email, password, confirmPsw, empName, cnpj } = req.body;

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
              console.log('Erro ao salvar sessão:', err)
              return res.status(500).send('Erro ao salvar sessão')
            }
            res.redirect('/')
          })
        } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar o usuário');
    }
})
app.post('/saveemp', async (req, res) => {
    const {empName, cnpj, typeEmp, phone, email, password, confirmPsw } = req.body;

    if (password !== confirmPsw) {
        return res.status(400).send('As senhas não conferem');
    }
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newEmp = await Emp.create({
            empName,
            cnpj,
            typeEmp,
            phone,
            email,
            password: hashedPassword
        });

        req.session.empId = newEmp.id;
        req.session.save((err) => {
            if (err) {
              console.log('Erro ao salvar sessão:', err)
              return res.status(500).send('Erro ao salvar sessão')
            }
            res.redirect('/')
          })
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar empresa');
    }
})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})
app.get('/quem-somos', (req, res)=> {
    res.render('quem-somos')
})
//Porta
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
