import { DataSource, DataSourceOptions } from "typeorm";
import { configDotenv } from "dotenv";

configDotenv();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT),
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;