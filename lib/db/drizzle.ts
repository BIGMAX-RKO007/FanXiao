import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_URL || 'postgres://dummy:dummy@localhost:5432/dummy';

export const client = postgres(connectionString);
export const db = drizzle(client, { schema });
