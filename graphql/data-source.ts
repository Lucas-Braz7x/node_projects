import { DataSource } from 'typeorm';
import { DatabaseConfig } from './keys';

export const AppDataSource = new DataSource({
  ...DatabaseConfig,
  type: 'postgres',
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
