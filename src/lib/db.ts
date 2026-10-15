import { Project, ServiceItem, Inquiry, ServiceDivision, AdminUser } from '@/types';
import { allServices, weldingServices, interiorServices } from './services-data';
import { executeQuery, testMySQLConnection } from './mysql';
import bcrypt from 'bcryptjs';

class RoyalProDatabase {
  private static instance: RoyalProDatabase;

  private services: ServiceItem[] = [...allServices];

  private admins: { id: string; username: string; email: string; passwordHash: string; role: AdminUser['role']; createdAt: string }[] = [
    {
      id: 'adm_1',
      username: 'admin',
      email: 'admin@royalpro.com',
      // default hash for 'admin123'
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'superadmin',
      createdAt: new Date().toISOString(),
    },
  ];

  private projects: Project[] = [
    {
      id: 'proj_1',
      division: 'welding_industrial',
      title: 'Auto Parts Manufacturing Plant Shed',
      clientName: 'Apex Precision Engineering',
      location: 'Industrial Area Phase 2, Manesar',
      coveredAreaSqFt: 45000,
      specDetails: '0.50mm Galvalume Roofing, 15T Crane Beam, Heavy High Tensile Structural Steel',
      completionDate: '2026-03',
      status: 'completed',
      imageUrl: '/images/factory_tin_shed.jpg',
    },
    {
      id: 'proj_2',
      division: 'welding_industrial',
      title: 'Badminton Academy 4-Court Steel Enclosure',
      clientName: 'Smash Pro Badminton Arena',
      location: 'Sector 62, Sports Hub',
      coveredAreaSqFt: 18000,
      specDetails: '11 Meter BWF Clear Height, PUF Insulated Roof, Glare-Free LED Brackets',
      completionDate: '2026-05',
      status: 'completed',
      imageUrl: '/images/badminton_court_shed.jpg',
    },
    {
      id: 'proj_3',
      division: 'welding_industrial',
      title: 'Commercial Cold Storage Chambers',
      clientName: 'Himalaya Agro Fresh Cool Chain',
      location: 'NH-1 GT Road Logistics Zone',
      coveredAreaSqFt: 35000,
      specDetails: 'Heavy Rigid Steel Columns, 120mm PUF Cladding, Sub-Zero Seal Doors',
      completionDate: '2026-07',
      status: 'completed',
      imageUrl: '/images/cold_storage_himalaya.jpg',
    },
    {
      id: 'proj_4',
      division: 'interior_solution',
      title: 'Corporate IT Head Office & Conference Suites',
      clientName: 'Nexus Cloud Technologies',
      location: 'Cyber Park Towers, DLF Phase 5',
      coveredAreaSqFt: 14000,
      specDetails: 'Acoustic Glass Cabins, Gyproc False Ceilings, LVT Flooring & Magnet Tracks',
      completionDate: '2026-06',
      status: 'completed',
      imageUrl: '/images/luxury_interior_work.jpg',
    },
    {
      id: 'proj_5',
      division: 'interior_solution',
      title: 'Luxury Villa Turnkey Interior & Modular Kitchen',
      clientName: 'Singhania Villa',
      location: 'Golf Course Road, Gurgaon',
      coveredAreaSqFt: 6500,
      specDetails: 'BWP 710 Plywood, Hafele Tandem Kitchen, Italian Marble & Fluted Louvers',
      completionDate: '2026-08',
      status: 'completed',
      imageUrl: '/images/modular_kitchen_interior.jpg',
    },
    {
      id: 'proj_6',
      division: 'interior_solution',
      title: 'Multi-Brand Electronics Flagship Showroom',
      clientName: 'TechVision Megastore',
      location: 'Central Mall Ground Floor',
      coveredAreaSqFt: 8200,
      specDetails: '3D Acrylic LED Glow Signage, High-CRI Spotlights, Toughened Glass Facade',
      completionDate: '2026-09',
      status: 'completed',
      imageUrl: '/images/electronics_showroom.jpg',
    },
  ];

  private inquiries: Inquiry[] = [
    {
      id: 'inq_101',
      clientName: 'Rajesh Sharma',
      companyName: 'Sharma Engineering & Forgings',
      phone: '9557323216',
      email: 'rajesh@sharmaeng.in',
      division: 'welding_industrial',
      serviceTitle: 'Industrial Factory Tin Shed',
      plotLengthFeet: 150,
      plotWidthFeet: 80,
      shedHeightFeet: 24,
      totalAreaSqFt: 12000,
      estimatedBudget: 2640000,
      location: 'Kundli Industrial Area, Sonipat',
      requirements: 'Need 10 Ton crane provision and 4 sky-light sheets per bay.',
      status: 'quotation_sent',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'inq_102',
      clientName: 'Amit Verma',
      companyName: 'Verma Lifestyle Living',
      phone: '9557323216',
      email: 'amit@vermadecor.com',
      division: 'interior_solution',
      serviceTitle: 'Modular Kitchen Fabrication',
      totalAreaSqFt: 2400,
      estimatedBudget: 1850000,
      location: 'Sector 57, Sushant Lok',
      requirements: 'Full 3BHK interior with Hafele modular kitchen and gypsum false ceilings.',
      status: 'new',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  private constructor() {}

  public static getInstance(): RoyalProDatabase {
    if (!RoyalProDatabase.instance) {
      RoyalProDatabase.instance = new RoyalProDatabase();
    }
    return RoyalProDatabase.instance;
  }

  // --- Services Management ---
  public async getServices(division?: ServiceDivision): Promise<ServiceItem[]> {
    try {
      const isMySQLAvailable = await testMySQLConnection();
      if (isMySQLAvailable) {
        const sql = division
          ? 'SELECT * FROM services WHERE division = ? AND is_active = TRUE ORDER BY number ASC'
          : 'SELECT * FROM services WHERE is_active = TRUE ORDER BY division ASC, number ASC';
        const params = division ? [division] : [];
        const { rows, isUsingMySQL } = await executeQuery<Record<string, unknown>>(sql, params);
        if (isUsingMySQL && rows.length > 0) {
          return rows.map((r) => ({
            id: String(r.id),
            division: r.division as ServiceDivision,
            number: Number(r.number),
            title: String(r.title),
            slug: String(r.slug),
            tagline: String(r.tagline || ''),
            description: String(r.description || ''),
            features: typeof r.features === 'string' ? JSON.parse(r.features) : (r.features as string[]) || [],
            specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : (r.specs as ServiceItem['specs']) || { materials: '', warranty: '', finishOrGrade: '', workScope: '' },
            startingRate: r.starting_rate ? String(r.starting_rate) : undefined,
            badge: r.badge ? String(r.badge) : undefined,
            imageUrl: r.image_url ? String(r.image_url) : undefined,
          }));
        }
      }
    } catch {
      // fallback
    }

    if (division) {
      return this.services.filter((s) => s.division === division);
    }
    return [...this.services];
  }

  public async addService(input: Omit<ServiceItem, 'id' | 'number'>): Promise<ServiceItem> {
    const nextNumber =
      this.services.filter((s) => s.division === input.division).length + 1;
    const id = (input.division === 'welding_industrial' ? 'wld_' : 'int_') + Date.now();
    const newService: ServiceItem = {
      ...input,
      id,
      number: nextNumber,
    };

    this.services.push(newService);

    // Save to MySQL
    try {
      await executeQuery(
        `INSERT INTO services (
          id, division, number, title, slug, tagline, description, features, specs, starting_rate, badge, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newService.id,
          newService.division,
          newService.number,
          newService.title,
          newService.slug,
          newService.tagline,
          newService.description,
          JSON.stringify(newService.features),
          JSON.stringify(newService.specs),
          newService.startingRate || null,
          newService.badge || null,
          newService.imageUrl || null,
        ]
      );
    } catch (err) {
      console.warn('[MySQL addService Warning]', err);
    }

    return newService;
  }

  public async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
    const idx = this.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    this.services[idx] = { ...this.services[idx], ...updates };
    const updated = this.services[idx];

    // Update in MySQL
    try {
      await executeQuery(
        `UPDATE services SET
          title = COALESCE(?, title),
          tagline = COALESCE(?, tagline),
          description = COALESCE(?, description),
          starting_rate = COALESCE(?, starting_rate),
          image_url = COALESCE(?, image_url)
        WHERE id = ?`,
        [
          updates.title || null,
          updates.tagline || null,
          updates.description || null,
          updates.startingRate || null,
          updates.imageUrl || null,
          id,
        ]
      );
    } catch (err) {
      console.warn('[MySQL updateService Warning]', err);
    }

    return updated;
  }

  public async deleteService(id: string): Promise<boolean> {
    const prevLen = this.services.length;
    this.services = this.services.filter((s) => s.id !== id);

    try {
      await executeQuery('DELETE FROM services WHERE id = ?', [id]);
    } catch (err) {
      console.warn('[MySQL deleteService Warning]', err);
    }

    return this.services.length < prevLen;
  }

  // --- Admin Authentication ---
  public async registerAdmin(
    username: string,
    email: string,
    passwordPlain: string
  ): Promise<AdminUser> {
    // Check if exists
    const existing = this.admins.find(
      (a) => a.username.toLowerCase() === username.toLowerCase() || a.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      throw new Error('Admin username or email already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordPlain, salt);
    const id = 'adm_' + Math.random().toString(36).substring(2, 9);
    const newAdmin = {
      id,
      username: username.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: 'admin' as const,
      createdAt: new Date().toISOString(),
    };

    this.admins.push(newAdmin);

    // Persist to MySQL
    try {
      await executeQuery(
        'INSERT INTO admins (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        [newAdmin.id, newAdmin.username, newAdmin.email, newAdmin.passwordHash, newAdmin.role]
      );
    } catch (err) {
      console.warn('[MySQL registerAdmin Warning]', err);
    }

    return {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: newAdmin.createdAt,
    };
  }

  public async loginAdmin(username: string, passwordPlain: string): Promise<AdminUser> {
    // Try finding in MySQL first
    try {
      const isMySQLAvailable = await testMySQLConnection();
      if (isMySQLAvailable) {
        const { rows, isUsingMySQL } = await executeQuery<{
          id: string;
          username: string;
          email: string;
          password_hash: string;
          role: AdminUser['role'];
          created_at: string;
        }>(
          'SELECT id, username, email, password_hash, role, created_at FROM admins WHERE username = ? OR email = ? LIMIT 1',
          [username, username]
        );

        if (isUsingMySQL && rows.length > 0) {
          const userRow = rows[0];
          const isMatch = await bcrypt.compare(passwordPlain, userRow.password_hash);
          if (!isMatch) {
            throw new Error('Invalid username or password');
          }
          return {
            id: userRow.id,
            username: userRow.username,
            email: userRow.email,
            role: userRow.role,
            createdAt: userRow.created_at,
          };
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Invalid username or password') {
        throw err;
      }
    }

    // In-Memory lookup
    const admin = this.admins.find(
      (a) => a.username.toLowerCase() === username.toLowerCase() || a.email.toLowerCase() === username.toLowerCase()
    );
    if (!admin) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(passwordPlain, admin.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    };
  }

  // --- Projects ---
  public async getProjects(division?: ServiceDivision): Promise<Project[]> {
    if (division) {
      return this.projects.filter((p) => p.division === division);
    }
    return [...this.projects];
  }

  // --- Inquiries ---
  public async getInquiries(): Promise<Inquiry[]> {
    try {
      const isMySQLAvailable = await testMySQLConnection();
      if (isMySQLAvailable) {
        const { rows, isUsingMySQL } = await executeQuery<Inquiry>(
          'SELECT id, client_name AS clientName, company_name AS companyName, phone, email, division, service_title AS serviceTitle, plot_length_feet AS plotLengthFeet, plot_width_feet AS plotWidthFeet, shed_height_feet AS shedHeightFeet, total_area_sqft AS totalAreaSqFt, estimated_budget AS estimatedBudget, location, requirements, status, created_at AS createdAt FROM inquiries ORDER BY created_at DESC LIMIT 100'
        );
        if (isUsingMySQL && rows.length > 0) {
          return rows;
        }
      }
    } catch {
      // Fallback
    }
    return [...this.inquiries];
  }

  public async addInquiry(inquiry: Inquiry): Promise<Inquiry> {
    this.inquiries.unshift(inquiry);

    try {
      const isMySQLAvailable = await testMySQLConnection();
      if (isMySQLAvailable) {
        await executeQuery(
          `INSERT INTO inquiries (
            id, client_name, company_name, phone, email, division, service_title,
            plot_length_feet, plot_width_feet, shed_height_feet, total_area_sqft,
            estimated_budget, location, requirements, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            inquiry.id,
            inquiry.clientName,
            inquiry.companyName || null,
            inquiry.phone,
            inquiry.email || null,
            inquiry.division,
            inquiry.serviceTitle,
            inquiry.plotLengthFeet || null,
            inquiry.plotWidthFeet || null,
            inquiry.shedHeightFeet || null,
            inquiry.totalAreaSqFt || null,
            inquiry.estimatedBudget || null,
            inquiry.location,
            inquiry.requirements || null,
            inquiry.status,
          ]
        );
      }
    } catch (err) {
      console.warn('[MySQL Save Notice]', err);
    }

    return inquiry;
  }

  public async updateInquiryStatus(
    id: string,
    status: Inquiry['status']
  ): Promise<Inquiry | null> {
    const item = this.inquiries.find((inq) => inq.id === id);
    if (!item) return null;
    item.status = status;

    try {
      await executeQuery('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    } catch {
      // In-memory sync
    }

    return item;
  }

  public async deleteInquiry(id: string): Promise<boolean> {
    const prev = this.inquiries.length;
    this.inquiries = this.inquiries.filter((inq) => inq.id !== id);
    try {
      await executeQuery('DELETE FROM inquiries WHERE id = ?', [id]);
    } catch {
      // in-memory
    }
    return this.inquiries.length < prev;
  }
}

export const db = RoyalProDatabase.getInstance();
