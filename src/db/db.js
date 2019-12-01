import { Pool } from 'pg';
import { config } from 'dotenv';

config();

class Database {
  static connection() {
    if (process.env.NODE_ENV === 'production') {
      return new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }

    if (process.env.NODE_ENV === 'testing') {
      return new Pool({
        connectionString: process.env.TEST_DB_URL,
      });
    }
    return 0;
  }
}
export default Database;
