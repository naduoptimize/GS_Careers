-- George Steuart & Company Ltd - Job Portal Database
-- Import this file into phpMyAdmin
-- Last synced with live database: 2026-06-03

CREATE DATABASE IF NOT EXISTS gs_jobs DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gs_jobs;

-- ========================================
-- COMPANIES TABLE
-- ========================================
CREATE TABLE companies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    logo VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- COMPANY LOCATIONS TABLE
-- ========================================
CREATE TABLE company_locations (
    id INT(11) NOT NULL AUTO_INCREMENT,
    company_id INT(11) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY company_id (company_id),
    CONSTRAINT company_locations_ibfk_1 FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- ADMINS TABLE
-- ========================================
CREATE TABLE admins (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'sub_admin') NOT NULL DEFAULT 'sub_admin',
    company_id INT(11) DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    require_password_change TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY username (username),
    UNIQUE KEY email (email),
    KEY company_id (company_id),
    CONSTRAINT admins_ibfk_1 FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- VACANCIES TABLE
-- ========================================
CREATE TABLE vacancies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    company_id INT(11) NOT NULL,
    reference_number VARCHAR(50) DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    employment_type ENUM('Full-Time', 'Part-Time', 'Contract', 'Internship') DEFAULT 'Full-Time',
    min_experience ENUM('0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years') NOT NULL DEFAULT '0 years',
    min_relevant_experience ENUM('0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years') NOT NULL DEFAULT '0 years',
    publish_date DATE NOT NULL,
    expire_date DATE NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    hired_application_id INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY company_id (company_id),
    KEY created_by (created_by),
    KEY fk_hired_application (hired_application_id),
    CONSTRAINT vacancies_ibfk_1 FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT vacancies_ibfk_2 FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- APPLICATIONS TABLE
-- ========================================
CREATE TABLE applications (
    id INT(11) NOT NULL AUTO_INCREMENT,
    vacancy_id INT(11) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    overall_experience ENUM('0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years') NOT NULL,
    relevant_experience ENUM('0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years') NOT NULL,
    qualification ENUM('O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification') NOT NULL,
    salary_expectation VARCHAR(100) DEFAULT NULL,
    cv_path VARCHAR(500) NOT NULL,
    status ENUM('pending', 'under_review', 'shortlisted', 'rejected') DEFAULT 'pending',
    tags VARCHAR(255) DEFAULT NULL,
    rejection_reason TEXT DEFAULT NULL,
    interview_type VARCHAR(50) DEFAULT NULL,
    interview_date DATE DEFAULT NULL,
    interview_time VARCHAR(50) DEFAULT NULL,
    interview_location TEXT DEFAULT NULL,
    interview_location_link TEXT DEFAULT NULL,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    future_consent TINYINT(1) DEFAULT 0,
    is_blocked TINYINT(1) DEFAULT 0,
    block_reason TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_email_vacancy (email, vacancy_id),
    UNIQUE KEY unique_phone_vacancy (contact_number, vacancy_id),
    KEY vacancy_id (vacancy_id),
    CONSTRAINT applications_ibfk_1 FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- FOREIGN KEY: vacancies.hired_application_id -> applications.id
-- (Added after applications table is created)
-- ========================================
ALTER TABLE vacancies ADD CONSTRAINT fk_hired_application FOREIGN KEY (hired_application_id) REFERENCES applications(id) ON DELETE SET NULL;


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
('superadmin', 'admin@georgesteuart.com', '$2y$10$cUdT2ngu7OHP/42jb792QOwUyuxdw7n3CYTA993MIagvmqSSFVpdq', 'Super Administrator', 'super_admin', NULL);
