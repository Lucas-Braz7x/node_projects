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
  entities: ['./src/database/migrations/*.ts'],
  subscribers: [],
  migrations: [
    './src/database/migrations/*.ts',
  ],
});

AppDataSource.initialize()
  .then(() => { console.log('BAnco rodando'); })
  .catch((er) => console.log(`Deu merda ${er}`));
