import express from 'express';
import ejs from 'ejs'

// const, let ou var -- const valor fixo --  let valor a ser mudado -- var escopo global    

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req,res) => {
    res.render('login')
})
const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});



//GET, POST, DELETE, PATCH
// GET pra pegar um informação
// POST, pra enviar informações
// DELETE, deleta um dado já cadastrado
//PATCH, Update/ atuialização já possui