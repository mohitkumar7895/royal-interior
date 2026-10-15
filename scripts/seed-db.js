const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Read services-data.ts compiled or extracted
const fs = require('fs');

async function seed() {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = Number(process.env.MYSQL_PORT) || 3306;
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'royalpro_db';

  console.log(`Connecting to MySQL database '${database}' on ${host}:${port}...`);
  const conn = await mysql.createConnection({ host, port, user, password });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await conn.query(`USE \`${database}\`;`);

  // Ensure tables exist
  await conn.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id VARCHAR(64) PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(64) PRIMARY KEY,
      division ENUM('welding_industrial', 'interior_solution') NOT NULL,
      number INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      tagline VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      features JSON NOT NULL,
      specs JSON NOT NULL,
      starting_rate VARCHAR(100) DEFAULT NULL,
      badge VARCHAR(50) DEFAULT NULL,
      image_url VARCHAR(255) DEFAULT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(64) PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) DEFAULT NULL,
      division ENUM('welding_industrial', 'interior_solution') NOT NULL,
      service_title VARCHAR(255) NOT NULL,
      plot_length_feet DECIMAL(10,2) DEFAULT NULL,
      plot_width_feet DECIMAL(10,2) DEFAULT NULL,
      shed_height_feet DECIMAL(10,2) DEFAULT NULL,
      total_area_sqft DECIMAL(12,2) DEFAULT NULL,
      estimated_budget DECIMAL(15,2) DEFAULT NULL,
      location VARCHAR(255) NOT NULL,
      requirements TEXT DEFAULT NULL,
      status ENUM('new', 'contacted', 'quotation_sent', 'closed') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Check default admin
  const [adminRows] = await conn.query('SELECT * FROM admins WHERE username = "admin" LIMIT 1;');
  if (adminRows.length === 0) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update('royal123').digest('hex');
    await conn.query(
      'INSERT INTO admins (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      ['adm_master', 'admin', 'admin@royalpro.com', hash, 'superadmin']
    );
    console.log('Inserted default admin: admin / royal123');
  }

  // Parse services from services-data.ts
  const rawFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'services-data.ts'), 'utf8');
  
  // Extract all service objects using regex pattern matching or eval in safe context
  const servicesMatch = rawFile.match(/export const (weldingServices|interiorServices): ServiceItem\[\] = (\[[\s\S]*?\]);\s*export const/g);
  
  // Alternative: run a tsx / node script with typescript compilation
}

seed().catch(console.error);
