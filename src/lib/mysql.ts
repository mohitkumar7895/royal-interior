import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'royalpro_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;
let initAttempted = false;

// Auto-initialize royalpro_db and tables if MySQL is running
export async function ensureDatabaseAndTables(): Promise<boolean> {
  if (initAttempted) return pool !== null;
  initAttempted = true;

  try {
    // 1. Connect without selecting database
    const conn = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    // 2. Create database if it doesn't exist
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await conn.query(`USE \`${dbConfig.database}\`;`);

    // 3. Create tables if they don't exist
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

    await conn.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await conn.end();

    // Establish connection pool with the database
    pool = mysql.createPool(dbConfig);
    console.log(`[MySQL Success] Connected to database '${dbConfig.database}' on ${dbConfig.host}:${dbConfig.port}`);

    // Seed default settings if empty
    try {
      await pool.execute(`
        INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
        ('banner_image', '/images/factory_tin_shed.jpg'),
        ('phone', '9557323216'),
        ('email', 'contact@royalproindustrial.com'),
        ('company_name', 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution'),
        ('address', 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009');
      `);
    } catch (setErr) {
      console.warn('[MySQL Settings Seed Warning]', setErr);
    }

    // Auto-seed initial 32 services if services table is empty
    try {
      const { allServices } = await import('./services-data');
      const [countResult] = await pool.query<mysql.RowDataPacket[]>('SELECT COUNT(*) as count FROM services');
      const count = Number((countResult as any)[0]?.count || 0);
      if (count === 0 && allServices.length > 0) {
        for (const s of allServices) {
          await pool.execute(
            `INSERT IGNORE INTO services (id, division, number, title, slug, tagline, description, features, specs, starting_rate, badge, image_url, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              s.id,
              s.division,
              s.number,
              s.title,
              s.slug,
              s.tagline,
              s.description,
              JSON.stringify(s.features || []),
              JSON.stringify(s.specs || {}),
              s.startingRate || null,
              s.badge || null,
              s.imageUrl || null,
              s.isActive !== false ? 1 : 0,
            ]
          );
        }
        console.log(`[MySQL Seed] Seeded ${allServices.length} services into royalpro_db.services!`);
      }

      // Auto-seed admin if empty
      const [adminCountResult] = await pool.query<mysql.RowDataPacket[]>('SELECT COUNT(*) as count FROM admins');
      const adminCount = Number((adminCountResult as any)[0]?.count || 0);
      if (adminCount === 0) {
        const bcrypt = await import('bcryptjs');
        const hash = await bcrypt.hash('royal123', 10);
        await pool.execute(
          'INSERT IGNORE INTO admins (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
          ['adm_master', 'admin', 'admin@royalpro.com', hash, 'superadmin']
        );
        console.log('[MySQL Seed] Seeded default superadmin: admin / royal123');
      }

      // Auto-seed sample inquiries if empty
      const [inqCountResult] = await pool.query<mysql.RowDataPacket[]>('SELECT COUNT(*) as count FROM inquiries');
      const inqCount = Number((inqCountResult as any)[0]?.count || 0);
      if (inqCount === 0) {
        await pool.execute(
          `INSERT INTO inquiries (id, client_name, company_name, phone, email, division, service_title, plot_length_feet, plot_width_feet, total_area_sqft, estimated_budget, location, requirements, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            'inq_sample_1',
            'Rajesh Sharma',
            'Apex Industrial Logistics',
            '9557323216',
            'rajesh@apexlogistics.in',
            'welding_industrial',
            'Industrial Factory Tin Shed',
            120,
            60,
            7200,
            1584000,
            'Phase 2 Industrial Corridor',
            'Need heavy-duty tin shed structure with 28ft height and Tata Galvalume sheet roofing.',
            'new'
          ]
        );
        await pool.execute(
          `INSERT INTO inquiries (id, client_name, company_name, phone, email, division, service_title, total_area_sqft, estimated_budget, location, requirements, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            'inq_sample_2',
            'Sunil Malhotra',
            'Malhotra Residency',
            '9811002233',
            'sunil@malhotradesign.com',
            'interior_solution',
            'Modular Kitchen',
            280,
            245000,
            'Royal City Villa #14',
            'Complete acrylic modular kitchen setup with quartz countertop and soft-close tandem drawers.',
            'contacted'
          ]
        );
      }
    } catch (seedErr) {
      console.warn('[MySQL Seed Warning]', seedErr);
    }

    return true;
  } catch (err: unknown) {
    pool = null;
    console.warn(`[MySQL Notice] Running with fallback storage. MySQL Server info: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

export async function testMySQLConnection(): Promise<boolean> {
  return await ensureDatabaseAndTables();
}

export async function executeQuery<T = unknown>(
  sql: string,
  params: (string | number | boolean | null | undefined | Date)[] = []
): Promise<{ rows: T[]; isUsingMySQL: boolean }> {
  try {
    const isReady = await ensureDatabaseAndTables();
    if (!isReady || !pool) {
      return { rows: [], isUsingMySQL: false };
    }

    const sanitizedParams = params.map((v) => (v === undefined ? null : v));
    const [rows] = await pool.execute(sql, sanitizedParams as (string | number | boolean | null | Date)[]);
    return { rows: rows as T[], isUsingMySQL: true };
  } catch (err: unknown) {
    console.warn('[MySQL Query Warning - Fallback Used]', err instanceof Error ? err.message : err);
    return { rows: [], isUsingMySQL: false };
  }
}

export interface TableColumnInfo {
  field: string;
  type: string;
  null: string;
  key: string;
  default: string | null;
  extra: string;
}

export interface TableInspectorInfo {
  tableName: string;
  rowCount: number;
  columns: TableColumnInfo[];
  sampleRows: Record<string, unknown>[];
}

export interface DatabaseInspectorResult {
  databaseName: string;
  isConnected: boolean;
  host: string;
  port: number;
  tables: TableInspectorInfo[];
}

export async function getDatabaseInspectorData(): Promise<DatabaseInspectorResult> {
  const isReady = await ensureDatabaseAndTables();

  if (!isReady || !pool) {
    const { allServices } = await import('./services-data');
    return {
      databaseName: dbConfig.database,
      isConnected: false,
      host: dbConfig.host,
      port: dbConfig.port,
      tables: [
        {
          tableName: 'services',
          rowCount: allServices.length,
          columns: [
            { field: 'id', type: 'varchar(64)', null: 'NO', key: 'PRI', default: null, extra: '' },
            { field: 'division', type: "enum('welding_industrial','interior_solution')", null: 'NO', key: '', default: null, extra: '' },
            { field: 'number', type: 'int', null: 'NO', key: '', default: null, extra: '' },
            { field: 'title', type: 'varchar(255)', null: 'NO', key: '', default: null, extra: '' },
            { field: 'slug', type: 'varchar(255)', null: 'NO', key: 'UNI', default: null, extra: '' },
            { field: 'tagline', type: 'varchar(255)', null: 'NO', key: '', default: null, extra: '' },
            { field: 'starting_rate', type: 'varchar(100)', null: 'YES', key: '', default: null, extra: '' },
            { field: 'image_url', type: 'varchar(255)', null: 'YES', key: '', default: null, extra: '' },
            { field: 'is_active', type: 'tinyint(1)', null: 'YES', key: '', default: '1', extra: '' },
          ],
          sampleRows: allServices.slice(0, 10).map((s) => ({
            id: s.id,
            division: s.division,
            number: s.number,
            title: s.title,
            slug: s.slug,
            starting_rate: s.startingRate,
            image_url: s.imageUrl,
            is_active: 1,
          })),
        },
        {
          tableName: 'inquiries',
          rowCount: 0,
          columns: [
            { field: 'id', type: 'varchar(64)', null: 'NO', key: 'PRI', default: null, extra: '' },
            { field: 'client_name', type: 'varchar(255)', null: 'NO', key: '', default: null, extra: '' },
            { field: 'phone', type: 'varchar(50)', null: 'NO', key: '', default: null, extra: '' },
            { field: 'service_title', type: 'varchar(255)', null: 'NO', key: '', default: null, extra: '' },
            { field: 'status', type: "enum('new','contacted','quotation_sent','closed')", null: 'YES', key: '', default: 'new', extra: '' },
          ],
          sampleRows: [],
        },
        {
          tableName: 'admins',
          rowCount: 1,
          columns: [
            { field: 'id', type: 'varchar(64)', null: 'NO', key: 'PRI', default: null, extra: '' },
            { field: 'username', type: 'varchar(100)', null: 'NO', key: 'UNI', default: null, extra: '' },
            { field: 'email', type: 'varchar(255)', null: 'NO', key: 'UNI', default: null, extra: '' },
            { field: 'role', type: 'varchar(50)', null: 'YES', key: '', default: 'admin', extra: '' },
          ],
          sampleRows: [{ id: 'adm_master', username: 'admin', email: 'admin@royalpro.com', role: 'superadmin' }],
        },
      ],
    };
  }

  try {
    const tableNames = ['services', 'inquiries', 'admins', 'settings'];
    const tables: TableInspectorInfo[] = [];

    for (const name of tableNames) {
      // Describe table columns
      const [colRows] = await pool.query<mysql.RowDataPacket[]>(`DESCRIBE \`${name}\``);
      const columns: TableColumnInfo[] = (colRows as any[]).map((c) => ({
        field: c.Field,
        type: c.Type,
        null: c.Null,
        key: c.Key,
        default: c.Default,
        extra: c.Extra || '',
      }));

      // Count rows
      const [countRes] = await pool.query<mysql.RowDataPacket[]>(`SELECT COUNT(*) as count FROM \`${name}\``);
      const rowCount = Number((countRes as any[])[0]?.count || 0);

      // Fetch sample rows safely
      let dataRows: mysql.RowDataPacket[] = [];
      try {
        const [rows] = await pool.query<mysql.RowDataPacket[]>(`SELECT * FROM \`${name}\` LIMIT 50`);
        dataRows = rows;
      } catch {
        dataRows = [];
      }
      
      // Sanitize password_hash in admins table for security
      const sanitizedRows = (dataRows as any[]).map((row) => {
        const copy = { ...row };
        if (copy.password_hash) {
          copy.password_hash = '•••••••••••••••• [Protected Hash]';
        }
        return copy;
      });

      tables.push({
        tableName: name,
        rowCount,
        columns,
        sampleRows: sanitizedRows,
      });
    }

    return {
      databaseName: dbConfig.database,
      isConnected: true,
      host: dbConfig.host,
      port: dbConfig.port,
      tables,
    };
  } catch (err) {
    console.error('[MySQL Inspector Error]', err);
    throw err;
  }
}
