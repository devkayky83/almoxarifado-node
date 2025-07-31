import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Produto = sequelize.define('Produto', {
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
},
nome: {
  type: DataTypes.STRING(100),
  allowNull: false,
},
tipo: {
  type: DataTypes.ENUM('ALIMENTO', 'LIMPEZA', 'ESCOLAR', 'OUTROS'),
  allowNull: false,
  defaultValue: 'OUTROS',
},
quantidade: {
  type: DataTypes.INTEGER.UNSIGNED,
  allowNull: false,
},
data_fabricacao: {
  type: DataTypes.DATEONLY,
  allowNull: false,
},
data_validade: {
  type: DataTypes.DATEONLY,
  allowNull: false,
},
observacoes: {
  type: DataTypes.TEXT,
  allowNull: true,
}
}, {
  tableName: 'produtos',
  timestamps: false,
});

export default Produto;