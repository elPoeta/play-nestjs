import { ConnectionOptions } from "typeorm";

export const ormconfig : ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'elpoeta',
  password: 'elpoeta',
  database: 'playnestjs',
  entities: [
    __dirname + '/**/*.entity{.ts,.js}',
  ],
  synchronize: true,
};