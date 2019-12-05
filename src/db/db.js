import { Pool } from 'pg';
import { config } from 'dotenv';
import User from '../model/user.model';

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

  static async selectBy(table, column, value) {
    const con = Database.connection();
    const result = await con.query(
      `SELECT * FROM ${table} WHERE ${column}='${value}';`,
    );
    await con.end();
    return result;
  }

  static async userSelectBy(table, column, value, userId) {
    const con = Database.connection();
    const result = await con.query(
      `SELECT * FROM ${table} WHERE ${column}='${value}' AND createdby='${userId}';`,
    );
    await con.end();
    return result;
  }

  static async selectUser(email) {
    const con = Database.connection();
    const result = await con.query(`SELECT COUNT(1) FROM users WHERE email = '${email}';`);
    await con.end();
    return result;
  }

  static async updateIncident(id, column, value, userId) {
    const con = Database.connection();
    const result = await con.query(
      `UPDATE Incident SET ${column} = '${value}' WHERE incidentid=${id} AND createdBy='${userId}' AND status='pending' returning *;`,
    );
    await con.end();
    return result;
  }

  static async insertIntoUser(data) {
    const con = Database.connection();
    const newUser = await con.query(`Insert into users(
      fullName,
      email,
      password,
      phoneNumber,
      username,
      role
    ) values(
      '${data.fullName}',
      '${data.email}',
      '${data.password}',
      '${data.phoneNumber}',
      '${data.username}',
      '${data.role}'
    ) returning *`);
    await con.end();
    return newUser;
  }

  static async insertIntoIncident(data) {
    const con = Database.connection();
    const newIncident = await con.query(`Insert into INCIDENT(
      createdBy,
      title,
      type,
      location,
      images,
      videos,
      comment,
      status
    ) values(
      '${data.createdBy}',
      '${data.title}',
      '${data.type}',
      '${data.location}',
      '${data.images}',
      '${data.videos}',
      '${data.comment}',
      '${data.status}'
    ) returning *`);
    await con.end();
    return newIncident;
  }

  static async createScripts() {
    const con = Database.connection();
    await con.query(`
          CREATE TABLE IF NOT EXISTS USERS (
            userId SERIAL,
            fullName VARCHAR(250),
            email VARCHAR(250),
            username VARCHAR(250),
            password VARCHAR(250),
            phoneNumber VARCHAR (30),
            role VARCHAR(250),
            PRIMARY KEY(userId)
          );
          
          CREATE TABLE IF NOT EXISTS INCIDENT (
            IncidentId SERIAL,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            createdBy INTEGER REFERENCES users(userId) ON DELETE CASCADE,
            title VARCHAR (200),
            type VARCHAR(300),
            location VARCHAR(250),
            images VARCHAR(250),
            videos VARCHAR(250),
            comment VARCHAR(250),
            status VARCHAR(250),
            PRIMARY KEY (IncidentId)
          );
      `);
    const result = await con.query(
      "SELECT COUNT(1) FROM users WHERE email = 'admin@gmail.com';",
    );
    if (result.rows[0].count === '0') {
      const user = new User(
        '',
        'Mutesi Sharon K',
        'admin@gmail.com',
        '$2b$10$s4RN8ri.6or1GwLHRVRpW.r6YMfD2tkTK0NV.SV01KuwKQQ71YcZG',
        '0787555555',
        'tesi',
        'admin',
      );
      await con.query(`Insert into users(
        fullName,
        email,
        password,
        phoneNumber,
        username,
        role
      ) values(
        '${user.fullName}',
        '${user.email}',
        '${user.password}',
        '${user.phoneNumber}',
        '${user.username}',
        '${user.role}'
      ) returning *`);
    }
    await con.end();
  }

  static async deleteIfExist(table, column, value, userId) {
    const conn = this.connection();
    const result = await conn.query(`DELETE FROM ${table} WHERE status='pending' AND createdby='${userId}' AND ${column}=${value};`);
    await conn.end();
    return result;
  }

  static async deleteTables() {
    const con = Database.connection();
    await con.query('DROP TABLE IF EXISTS USERS,INCIDENT CASCADE;');
    await con.end();
  }
}

export default Database;
