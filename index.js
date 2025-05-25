import express from 'express'
import ejs from 'ejs'
import dotenv from 'dotenv'
import conn from './db/usersDb.js'
import User from './db/User.js'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'
import Emp from './db/Emp.js'
import Pet from './db/Pet.js'

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
app.get('/', async (req, res) => {
    try {
        const empresas = await Emp.findAll()
        res.render('home', { empresas })
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar empresas');
      }
})
app.get('/empresa/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const empresa = await Emp.findByPk(id); // Busca pelo ID
      
      if (!empresa) {
        return res.status(404).send('Empresa não encontrada');
      }
  
      res.render('empresa', { empresa }); // Renderiza a view com os dados
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar empresa');
    }
  });
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
app.get('/pet', async  (req, res) => {
    res.render('pet')
})
app.post('/pet', async (req, res) =>{
    const { tutorEmail, petName, petAge, petWeight, petRace } = req.body;

    const user = await User.findOne({where: { email: tutorEmail }})
    if(!user){  
        res.status(403).send('Email inválido')
        return
    }

    try {
        const newPet = await Pet.create({
            tutorEmail,
            petName,
            petAge,
            petWeight,
            petRace
        });

        req.session.petId = newPet.id;
        req.session.save((err) => {
            if (err) {
              console.log('Erro ao salvar sessão:', err)
              return res.status(500).send('Erro ao salvar sessão')
            }
            res.redirect('/')
          })
        } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar o pet');
    }
})
app.get('/solicTransp/:id', async (req, res) => {
     const { id } = req.params;
    //verifico se está logado e puxo os dados do user logado
    if (req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);// procuro o usuário pelo id
            if (user) {
                const pets = await Pet.findAll({ where: { tutorEmail: user.email } });// agora com os dados do usuário eu procuro o Pet pelo email dele porque o email dele é o tutorEmail no pets db
                const emp = await Emp.findByPk(id)
                res.render('solicTransp', { pets, emp });//renderizo o arquivo solicTransp e passo os objetos pets e emp que achei no meu db
                return;
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send('Erro ao buscar pets');
        }
    }
    res.render('solicTransp', { pets: [] });//mando o array pets vazio para o front identificar que não tem pets
})
app.get('/thanks', (req, res) =>{
    res.render('thanks')
})
//Porta
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
