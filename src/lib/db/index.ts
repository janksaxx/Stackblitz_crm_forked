import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'stackblitxboltdev.cbk006eeo6no.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'qytwUc-8tymra-pochef',
  database: 'crm_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  contacts: {
    getAll: async () => {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY createdAt DESC');
      return rows;
    },
    create: async (data: any) => {
      const [result] = await pool.execute(
        'INSERT INTO contacts (id, name, email, phone, company, position) VALUES (UUID(), ?, ?, ?, ?, ?)',
        [data.name, data.email, data.phone, data.company, data.position]
      );
      return result;
    },
    update: async (id: string, data: any) => {
      const [result] = await pool.execute(
        'UPDATE contacts SET name = ?, email = ?, phone = ?, company = ?, position = ? WHERE id = ?',
        [data.name, data.email, data.phone, data.company, data.position, id]
      );
      return result;
    },
    delete: async (id: string) => {
      const [result] = await pool.execute('DELETE FROM contacts WHERE id = ?', [id]);
      return result;
    }
  }
};