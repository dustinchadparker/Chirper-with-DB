import * as mysql from "mysql";
import chirps from './chirpdb';

export const Connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "app",
  password: "blahblah",
  database: "chirpr"
});

export const query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};


export default {
chirps
}

