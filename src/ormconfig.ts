import { ConnectionOptions } from "typeorm";

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'elpoeta',
  password: 'elpoeta',
  database: 'playnestjs',
  entities: [
    __dirname + '/**/*.entity{.ts,.js}',
  ],
  logging: true,
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  }
};

export default ormconfig;