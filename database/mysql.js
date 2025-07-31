import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'Force_sql994',
    database: 'almoxarifado-node',
});

export async function syncer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        console.error('Erro ao acessar a base de dados.');
        return false;
    }
    return true;
}

export default sequelize;