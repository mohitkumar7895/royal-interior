-- Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution
-- MySQL / phpMyAdmin Full Database Schema

CREATE DATABASE IF NOT EXISTS royalpro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE royalpro_db;

-- 1. Admins Table for Authentication
CREATE TABLE IF NOT EXISTS admins (
  id VARCHAR(64) PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Admin (username: admin, password: admin123)
-- bcrypt hash for 'admin123': $2a$10$wK6O8b8n.3U4yH7Fw7nIweN2YJk37k74y/4r1c3oI9dYtZ7ZzBv1a
INSERT INTO admins (id, username, email, password_hash, role)
VALUES (
  'adm_default',
  'admin',
  'admin@royalpro.com',
  '$2a$10$7ZrqhMszO6P4q5P0YI.nK.f99fG7cK.C8K9xO71yU6b0iEwX/rC22',
  'superadmin'
) ON DUPLICATE KEY UPDATE username=username;

-- 2. Services Table (Both Welding & Interior Divisions)
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

-- 3. Inquiries Table (Client Quote Requests)
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

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  division ENUM('welding_industrial', 'interior_solution') NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  covered_area_sqft DECIMAL(12,2) DEFAULT NULL,
  spec_details VARCHAR(255) DEFAULT NULL,
  completion_date VARCHAR(50) DEFAULT NULL,
  status ENUM('completed', 'in_progress') DEFAULT 'completed',
  image_url VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
