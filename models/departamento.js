import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Departamento = sequelize.define('Departamento', {
nome: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
representante: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
email: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
data_criacao: {
  type: DataTypes.DATEONLY,
  allowNull: false,
},
}, 
{
  tableName: 'departamentos',
  timestamps: false,
});

export default Departamento;