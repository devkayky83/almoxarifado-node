import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Funcionario = sequelize.define('Funcionario', {
nome: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
email: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
endereco: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
cargo: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
data_nascimento: {
  type: DataTypes.TEXT,
  allowNull: true,
},
}, 
{
  tableName: 'funcionarios',
  timestamps: false,
});

export default Funcionario;