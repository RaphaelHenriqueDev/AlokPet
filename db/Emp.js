import { Sequelize } from "sequelize"
import conn from './empDb.js'

const Emp = conn.define('emps', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    typeEmp: {
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

Emp.sync({ force: false}).then(() => {
    console.log('Tabela criada com sucesso')
}).catch((err) => {
    throw new Error(err)
});

export default Emp
