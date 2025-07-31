import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Usuario = sequelize.define('User', {
    nome: DataTypes.STRING(100),
    nome_usuario: {type: DataTypes.STRING(100), unique: true},
    email: {type: DataTypes.STRING(100), unique: true},
    senha: DataTypes.STRING(100)
});

export default Usuario;