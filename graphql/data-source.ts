import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'graphql',
  synchronize: false,
  logging: false,
  entities: ['./src/database/models/*.ts'],
  subscribers: [],
  migrations: [
    './src/database/migrations/*.ts',
  ],
});

AppDataSource.initialize()
  .then(() => { console.log('Banco rodando'); })
  .catch((er) => console.log(`Deu merda ${er}`));
