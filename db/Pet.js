import { Sequelize } from "sequelize"
import conn from './petDb.js'

const Pet = conn.define('pet', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // oq diferencia você de uma outra tabela -> notnull
        autoIncrement: true
    },
    tutorEmail:{
        type: Sequelize.STRING,
        allowNull: false
    },
    petName: {
        type: Sequelize.STRING,
        allowNull: false // Habilitar nulo?
    },
    petAge: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    petWeight: {
        type: Sequelize.REAL,
        allowNull: false
    },
    petRace:{
        type: Sequelize.STRING,
        allowNull: true
    },
})

Pet.sync({ force: false}).then(() => {
    console.log('Tabela criada com sucesso')
}).catch((err) => {
    throw new Error(err)
});

export default Pet