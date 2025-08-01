import { Sequelize } from "sequelize";
import dotenv from 'dotenv'; // Importa a biblioteca dotenv

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export async function syncer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Conexão com a base de dados estabelecida com sucesso.");
    } catch (error) {
        console.error('Erro ao acessar a base de dados.', error);
        return false;
    }
    return true;
}

export default sequelize;