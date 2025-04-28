import { Sequelize } from "sequelize"
import conn from './usersDb.js'

const User = conn.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false}).then(() => {
    console.log('tabela criada com sucesso')
}).catch((err)=> {
    throw new Error(err)
})

export default User