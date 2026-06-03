-- George Steuart & Company Ltd - Job Portal Database
-- Import this file into phpMyAdmin

CREATE DATABASE IF NOT EXISTS gs_jobs DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gs_jobs;

-- ========================================
-- COMPANIES TABLE
-- ========================================
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo VARCHAR(255) DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ========================================
-- COMPANY LOCATIONS TABLE
-- ========================================
CREATE TABLE company_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ========================================
-- ADMINS TABLE
-- ========================================
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'sub_admin') NOT NULL DEFAULT 'sub_admin',
    company_id INT DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    require_password_change TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ========================================
-- VACANCIES TABLE
-- ========================================
CREATE TABLE vacancies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    reference_number VARCHAR(50) DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    employment_type ENUM('Full-Time', 'Part-Time', 'Contract', 'Internship') DEFAULT 'Full-Time',
    publish_date DATE NOT NULL,
    expire_date DATE NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    hired_application_id INT DEFAULT NULL,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ========================================
-- APPLICATIONS TABLE
-- ========================================
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vacancy_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    overall_experience ENUM('0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years') NOT NULL,
    relevant_experience ENUM('0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years') NOT NULL,
    qualification ENUM('O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification') NOT NULL,
    salary_expectation VARCHAR(100) DEFAULT NULL,
    cv_path VARCHAR(500) NOT NULL,
    status ENUM('pending', 'shortlisted', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT DEFAULT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    future_consent TINYINT(1) DEFAULT 0,
    is_blocked TINYINT(1) DEFAULT 0,
    block_reason TEXT DEFAULT NULL,
    tags VARCHAR(255) DEFAULT NULL,
    interview_type VARCHAR(50) DEFAULT NULL,
    interview_date DATE DEFAULT NULL,
    interview_time VARCHAR(50) DEFAULT NULL,
    interview_location TEXT DEFAULT NULL,
    interview_location_link TEXT DEFAULT NULL,
    FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_email_vacancy (email, vacancy_id),
    UNIQUE KEY unique_phone_vacancy (contact_number, vacancy_id)
) ENGINE=InnoDB;

-- ========================================
-- SEED DATA: Companies
-- ========================================
INSERT INTO companies (name, slug, description) VALUES
('George Steuart & Company Ltd', 'george-steuart', 'Parent company - one of the oldest mercantile firms in Sri Lanka'),
('Steuart Teas', 'steuart-teas', 'Premium tea exports and retail'),
('George Steuart Health', 'gs-health', 'Healthcare and pharmaceutical solutions'),
('George Steuart Engineering', 'gs-engineering', 'Engineering and construction services'),
('George Steuart Travels', 'gs-travels', 'Travel and tourism services'),
('George Steuart Finance', 'gs-finance', 'Financial services and insurance'),
('Steuart Motors', 'steuart-motors', 'Automobile sales and servicing'),
('George Steuart Solutions', 'gs-solutions', 'IT and business solutions'),
('Steuart Foods', 'steuart-foods', 'Food and beverage manufacturing'),
('George Steuart Retail', 'gs-retail', 'Retail and distribution'),
('Steuart Property', 'steuart-property', 'Real estate and property management');

-- ========================================
-- SEED DATA: Super Admin (password: admin123)
-- ========================================
INSERT INTO admins (username, email, password, full_name, role, company_id) VALUES
('superadmin', 'admin@georgesteuart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Administrator', 'super_admin', NULL);

-- ========================================
-- FOREIGN KEYS DEFINED AFTER CREATION
-- ========================================
ALTER TABLE vacancies ADD CONSTRAINT fk_hired_application FOREIGN KEY (hired_application_id) REFERENCES applications(id) ON DELETE SET NULL;
















