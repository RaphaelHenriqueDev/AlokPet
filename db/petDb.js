import { Sequelize } from "sequelize"

const conn = new Sequelize({
    dialect: 'sqlite',
    storage: './db/pets.db', 
})
conn.authenticate().then(() => {
    console.log('conexão feita com o db!')
}).catch((err) => {
    console.log(err)
})

export default conn