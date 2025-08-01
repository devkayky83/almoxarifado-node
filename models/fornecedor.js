import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Fornecedor = sequelize.define('Fornecedor', {
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
}, 
{
  tableName: 'fornecedores',
  timestamps: false,
});

export default Fornecedor;