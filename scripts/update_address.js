const mysql = require('mysql2/promise');

async function updateAddress() {
  const address = 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009';
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'royalpro_db',
  });

  await conn.query(
    'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
    ['address', address, address]
  );

  console.log('Successfully saved address in MySQL royalpro_db.settings table!');
  const [rows] = await conn.query("SELECT * FROM settings WHERE setting_key = 'address'");
  console.log('Current DB row:', rows);
  await conn.end();
}

updateAddress().catch(console.error);
