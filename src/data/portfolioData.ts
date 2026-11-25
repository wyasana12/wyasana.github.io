import avatarImg from '../assets/avatar.png';
import logoImg from '../assets/logo.png';

export type Language = 'id' | 'en';

export interface Experience {
  id: string;
  period: string;
  role: { id: string; en: string };
  company: string;
  description: { id: string; en: string };
  achievements: { id: string[]; en: string[] };
  skills: string[];
}

export interface CVItem {
  id: string;
  role: { id: string; en: string };
  category: string;
  description: { id: string; en: string };
  fileName: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: { id: string; en: string };
  category: 'Software Engineer' | 'Data Engineer' | 'Business Intelligence Analyst';
  description: { id: string; en: string };
  highlights: { id: string[]; en: string[] };
  metrics?: string;
  skills: string[];
  link?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: { id: string; en: string };
  icon: string;
  description: { id: string; en: string };
  items: string[];
}

export const PERSONAL_INFO = {
  greeting: {
    id: "Halo, saya",
    en: "Hi, I am"
  },
  name: "Wyasana Aji Kusuma Wardana",
  avatarUrl: avatarImg,
  logoUrl: logoImg,
  title: {
    id: "Backend Developer, Data Engineer, & BI Analyst.",
    en: "Backend Developer, Data Engineer, & BI Analyst."
  },
  tagline: {
    id: "Membangun sistem backend yang tangguh, merancang arsitektur pipa data yang efisien, dan mengubah data kompleks menjadi insight bisnis yang berdampak.",
    en: "Building resilient backend systems, designing efficient data pipeline architectures, and turning complex data into impactful business insights."
  },
  about: {
    id: [
      "Saya adalah lulusan D3 Teknik Informatika Universitas Sebelas Maret (UNS) dengan tiga fokus keahlian utama: Backend Development, Data Engineering, serta Business Intelligence (BI) Analysis. Di sisi rekayasa perangkat lunak, saya berfokus pada pembangunan arsitektur aplikasi web dan API yang efisien, scalable, serta mudah dipelihara. Sementara di sisi data, saya mengelola siklus analitik secara menyeluruh (end-to-end) mulai dari perancangan pipa data dan data warehouse hingga penyajian visualisasi dashboard interaktif untuk mendukung pengambilan keputusan strategis."
    ],
    en: [
      "I am an Informatics Engineering graduate from Universitas Sebelas Maret (UNS) with three primary expertise areas: Backend Development, Data Engineering, as well as Business Intelligence (BI) Analysis. On the software engineering side, I focus on building efficient, scalable, and maintainable web applications and API architectures. On the data side, I manage the end-to-end analytics lifecycle from architecting data pipelines and warehouses to delivering interactive dashboard visualizations that empower strategic decision-making."
    ]
  },
  socials: [
    { name: "GitHub", url: "https://github.com/wyasana12", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/wyasana12/", icon: "linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/wysnaa_/", icon: "instagram" },
    { name: "CV / Resume", url: "#", icon: "file-text" }
  ]
};

export const CV_DATA: CVItem[] = [
  {
    id: "backend",
    role: {
      id: "CV — Backend Developer",
      en: "CV — Backend Developer"
    },
    category: "Software Engineering",
    description: {
      id: "Fokus pada arsitektur REST API, Clean Architecture, Go, Laravel, skema database, & optimasi performa backend.",
      en: "Focused on REST API architecture, Clean Architecture, Go, Laravel, database design, & backend performance tuning."
    },
    fileName: "CV_Backend Developer_Wyasana Aji Kusuma Wardana.pdf",
    url: `${import.meta.env.BASE_URL}CV_Backend%20Developer_Wyasana%20Aji%20Kusuma%20Wardana.pdf`
  },
  {
    id: "data-bi",
    role: {
      id: "CV — Data Engineer & BI Analyst",
      en: "CV — Data Engineer & BI Analyst"
    },
    category: "Data & Analytics",
    description: {
      id: "Fokus pada pipeline ETL/ELT, Data Warehousing (Star Schema), optimasi query SQL, Power BI, DAX, & analitik logistik global.",
      en: "Focused on ETL/ELT pipelines, Data Warehousing (Star Schema), SQL query tuning, Power BI, DAX, & global logistics analytics."
    },
    fileName: "CV_Data engineer & Bussiness Intelligence_Wyasana Aji Kusuma Wardana.pdf",
    url: `${import.meta.env.BASE_URL}CV_Data%20engineer%20&%20Bussiness%20Intelligence_Wyasana%20Aji%20Kusuma%20Wardana.pdf`
  }
];

export const UI_STRINGS = {
  id: {
    navAbout: "Tentang Saya",
    navSkills: "Keahlian",
    navExperience: "Pengalaman",
    navProjects: "Proyek",
    sectionAbout: "Tentang Saya",
    sectionSkills: "Keahlian",
    sectionExperience: "Pengalaman",
    sectionProjects: "Proyek",
    specializationsTitle: "Keahlian & Core Stack",
    viewResume: "Lihat CV / Résumé Lengkap",
    viewResumeSub: "Tersedia 2 versi CV spesialisasi yang dapat ditinjau atau diunduh sesuai kebutuhan kualifikasi:",
    cvDropdownTitle: "Pilih Versi CV",
    downloadPdf: "Buka Dokumen PDF",
    avatarEnlargeHint: "Klik untuk memperbesar foto",
    avatarModalTitle: "Foto Profil",
    closeModal: "Tutup",
    categoryAll: "Semua",
    sourceCode: "Lihat Source Code di GitHub",
    liveDemo: "Arsitektur / Demo",
    footerText1: "Diprogram dengan",
    footerText2: "Tipografi diatur dengan font Inter dan JetBrains Mono. Terinspirasi dari estetika minimalis Brittany Chiang.",
    activeRoleBadge: "Sedang bekerja di Datasea sebagai Data Engineer & BI Analyst",
  },
  en: {
    navAbout: "About Me",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    sectionAbout: "About Me",
    sectionSkills: "Skills",
    sectionExperience: "Experience",
    sectionProjects: "Projects",
    specializationsTitle: "Specializations & Core Stack",
    viewResume: "View Full Résumé / CV",
    viewResumeSub: "Two specialized CV versions are available to view or download based on role requirements:",
    cvDropdownTitle: "Select CV Version",
    downloadPdf: "Open PDF Document",
    avatarEnlargeHint: "Click to enlarge photo",
    avatarModalTitle: "Profile Photo",
    closeModal: "Close",
    categoryAll: "All",
    sourceCode: "View Source Code on GitHub",
    liveDemo: "Architecture / Demo",
    footerText1: "Engineered with",
    footerText2: "Typography set in Inter and JetBrains Mono. Inspired by Brittany Chiang's minimalist aesthetic.",
    activeRoleBadge: "Currently working at Datasea as Data Engineer & BI Analyst",
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    period: "Maret 2026 – Sekarang",
    role: {
      id: "Data Engineer & Business Intelligence Analyst (Intern to Contract)",
      en: "Data Engineer & Business Intelligence Analyst (Intern to Contract)"
    },
    company: "Datasea",
    description: {
      id: "Mengembangkan, mengelola, dan mengoptimalkan ekosistem data serta pelaporan analitik untuk divisi Global Logistics di Kraft Heinz, dengan cakupan operasional di wilayah ekonomi EMEA, LATAM, dan ANZ.",
      en: "Developing, managing, and optimizing the data ecosystem and analytical reporting for the Global Logistics division at Kraft Heinz, covering operational scopes across EMEA, LATAM, and ANZ economic regions."
    },
    achievements: {
      id: [
        "Membangun alur pemrosesan data end-to-end mulai dari ekstraksi data mentah (data ingestion), pembersihan (data cleansing), hingga transformasi logika bisnis untuk mengintegrasikan data logistik serta inventaris global.",
        "Merancang struktur Dimensional Modeling (Star/Snowflake Schema) serta melakukan tuning dan optimasi SQL Query untuk mempercepat waktu muat (load time) dan efisiensi pemrosesan data berskala besar.",
        "Merancang dashboard analitik interaktif dengan mengimplementasikan kalkulasi metrik tingkat lanjut serta parameter dinamis guna memantau KPI rantai pasok, performa pengiriman, dan efisiensi biaya logistik lintas regional.",
        "Melakukan validasi data secara menyeluruh (data quality assurance), rekonsiliasi angka antara database sumber dengan laporan akhir, serta melakukan troubleshooting anomali data untuk menjamin akurasi informasi bagi pemangku kepentingan (stakeholders).",
        "Mengelola jadwal pembaruan data otomatis (scheduled refresh), mengatur hak akses keamanan data, serta menerjemahkan kebutuhan bisnis tim logistik global menjadi solusi visualisasi yang siap mendukung pengambilan keputusan strategis."
      ],
      en: [
        "Built end-to-end data processing pipelines from raw ingestion, cleansing, to business logic transformations integrating global logistics and inventory data.",
        "Architected Dimensional Modeling structures (Star/Snowflake Schema) and performed complex SQL query tuning to accelerate load times and maximize large-scale data processing efficiency.",
        "Designed interactive analytics dashboards implementing advanced metric calculations and dynamic parameters to monitor supply chain KPIs, delivery performance, and cross-regional logistics cost efficiency.",
        "Conducted comprehensive data quality validation, cross-source numerical reconciliation between database source and final reports, and anomaly troubleshooting ensuring pristine accuracy for stakeholders.",
        "Managed automated scheduled refresh pipelines, configured data access security, and translated global logistics business requirements into actionable data visualizations supporting strategic decisions."
      ]
    },
    skills: []
  },
  {
    id: "exp-2",
    period: "Februari 2026 – Maret 2026",
    role: {
      id: "Backend Developer (Intern)",
      en: "Backend Developer (Intern)"
    },
    company: "Datasea",
    description: {
      id: "Mengembangkan sistem E-Procurement terintegrasi untuk Arya Noble dan 7 Events yang menangani alur pengadaan barang secara menyeluruh (end-to-end), mulai dari pengajuan pembelian (purchase request), penerimaan barang (good receipt), pemrosesan invoice, hingga sinkronisasi data ke sistem SAP.",
      en: "Developed an integrated E-Procurement system for Arya Noble and 7 Events managing the end-to-end procurement lifecycle, from purchase requests and goods receipts to invoice processing and SAP data synchronization."
    },
    achievements: {
      id: [
        "Membangun layanan backend dan RESTful API dengan pendekatan Clean Architecture untuk menangani proses CRUD, autentikasi keamanan, serta manajemen transaksi pengadaan yang kompleks.",
        "Mengembangkan dan mengoptimalkan Stored Procedure serta View pada database untuk mempercepat agregasi data transaksi, mengotomatisasi validasi logika bisnis di level database, dan menyiapkan struktur data yang siap diintegrasikan ke sistem enterprise."
      ],
      en: [
        "Constructed backend services and RESTful APIs adhering to Clean Architecture principles to handle CRUD workflows, security authentication, and complex procurement transactions.",
        "Engineered and optimized Stored Procedures and Views to accelerate transaction data aggregation, automate database-level business validations, and prepare enterprise-ready data structures."
      ]
    },
    skills: []
  },
  {
    id: "exp-3",
    period: "November 2025 – Februari 2026",
    role: {
      id: "Web Developer (Contract)",
      en: "Web Developer (Contract)"
    },
    company: "Neo Edukasi",
    description: {
      id: "Mengembangkan dan memelihara platform manajemen bimbingan belajar (bimbel) serta sistem ujian Try Out daring internal perusahaan untuk mendukung operasional akademik dan evaluasi siswa.",
      en: "Developed and maintained the tutoring management platform and internal online Try Out examination system supporting academic operations and student evaluations."
    },
    achievements: {
      id: [
        "Mengembangkan arsitektur backend meliputi pembuatan Model, Controller, dan RESTful API untuk menangani proses CRUD, autentikasi pengguna, penjadwalan kelas, serta manajemen transaksi dan penilaian try out.",
        "Mengimplementasikan manajemen hak akses berbasis peran (Role & Permission / RBAC) untuk memisahkan otorisasi fitur secara ketat antara administrator, pengajar, dan siswa.",
        "Melakukan pemeliharaan rutin (maintenance), perbaikan bug, dan optimasi performa sistem agar tetap stabil saat menangani sesi ujian try out secara bersamaan."
      ],
      en: [
        "Engineered backend architecture including Models, Controllers, and RESTful APIs to handle CRUD processes, user authentication, class scheduling, and try out examination grading.",
        "Implemented Role-Based Access Control (RBAC) to enforce strict feature authorization boundaries between administrators, teachers, and students.",
        "Conducted routine system maintenance, bug fixes, and performance optimizations to maintain platform stability under concurrent exam sessions."
      ]
    },
    skills: []
  },
  {
    id: "exp-4",
    period: "Juli 2025 – Oktober 2025",
    role: {
      id: "Web Developer (Intern)",
      en: "Web Developer (Intern)"
    },
    company: "PT Edukarir Global Nusantara",
    description: {
      id: "Mengelola pemeliharaan dan peningkatan fungsionalitas pada sistem internal perusahaan, meliputi platform Learning Management System (Moodle) dan Human Resource Management (OrangeHRM).",
      en: "Managed maintenance and feature enhancements across internal enterprise platforms, including Moodle Learning Management System (LMS) and OrangeHRM Human Resource Management."
    },
    achievements: {
      id: [
        "Memelihara dan meningkatkan performa sistem HRM dan LMS perusahaan, serta melakukan debugging dan perbaikan masalah teknis (troubleshooting) di berbagai modul untuk menjaga stabilitas sistem dan kenyamanan pengguna (user experience).",
        "Berkolaborasi dengan tim internal untuk memberikan dukungan teknis (technical support), mengelola pembaruan konfigurasi modul, dan memastikan operasional platform berjalan lancar setiap hari."
      ],
      en: [
        "Maintained and enhanced corporate HRM and LMS platforms, conducting debugging and technical troubleshooting across diverse modules to ensure stability and seamless user experience.",
        "Collaborated with internal teams to provide dedicated technical support, handle module configuration updates, and ensure daily platform reliability."
      ]
    },
    skills: []
  },
  {
    id: "exp-5",
    period: "Januari 2025 – Juli 2025",
    role: {
      id: "Backend Developer (Intern)",
      en: "Backend Developer (Intern)"
    },
    company: "Diskominfo Kabupaten Karanganyar",
    description: {
      id: "Mengembangkan aplikasi web Sistem Manajemen Laboratorium Karanganyar (SiLaNyar) untuk Dinas Lingkungan Hidup (DLH) Kabupaten Karanganyar guna mendigitalisasi layanan pengajuan uji sampel, penjadwalan pengujian, manajemen pembayaran, hingga penerbitan laporan hasil uji (LHU).",
      en: "Developed the SiLaNyar Laboratory Management System web application for the Environmental Agency (DLH) of Karanganyar Regency to digitalize sample testing requests, scheduling, payment management, and test result report issuance (LHU)."
    },
    achievements: {
      id: [
        "Merancang skema database relasional dan normalisasi tabel untuk mendukung integritas data pada modul pengujian laboratorium, transaksi pembayaran, dan pencetakan laporan hasil uji.",
        "Membangun logika bisnis backend, Model, Controller, dan endpoint API untuk menangani alur CRUD, autentikasi, serta manajemen status transaksi pengajuan.",
        "Mengimplementasikan sistem Role & Permission untuk mengatur pembagian hak akses antara petugas laboratorium, admin pengelola, dan pelanggan (customer).",
        "Mengintegrasikan backend dan frontend secara seamless untuk menciptakan antarmuka pengguna yang responsif dengan alur pertukaran data yang cepat."
      ],
      en: [
        "Designed relational database schemas and table normalizations to safeguard data integrity across laboratory testing modules, payment transactions, and official reports.",
        "Constructed backend business logic, Models, Controllers, and API endpoints to orchestrate CRUD workflows, authentication, and application status transitions.",
        "Implemented Role & Permission structures to govern granular access rights between laboratory personnel, system administrators, and customers.",
        "Integrated backend and frontend seamlessly delivering a responsive user experience with rapid data interchange."
      ]
    },
    skills: []
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "StoQ — Inventory & Warehouse Management System (Backend API)",
    subtitle: {
      id: "Backend Development / Enterprise System",
      en: "Backend Development / Enterprise System"
    },
    category: "Software Engineer",
    description: {
      id: "Layanan backend RESTful API untuk sistem manajemen inventaris dan gudang berbasis web yang dirancang guna mengotomatisasi pelacakan stok, pergerakan barang, serta operasional pergudangan secara real-time dan akurat.",
      en: "A web-based inventory and warehouse management RESTful API backend service designed to automate stock tracking, goods movement, and real-time warehouse operations with high precision."
    },
    highlights: {
      id: [
        "Merancang arsitektur siklus inventaris penuh yang mencakup manajemen multi-gudang, katalog produk, pelacakan batch, mutasi stok, transfer antar-gudang, restock, hingga manajemen pengembalian barang (return).",
        "Mengintegrasikan Redis untuk mekanisme caching data berfrekuensi tinggi dan optimasi performa response time pada endpoint pelacakan stok.",
        "Mengimplementasikan sistem keamanan berlapis dengan autentikasi pengguna dan otorisasi berbasis peran (Role-Based Access Control / RBAC) untuk membatasi hak akses operasional gudang."
      ],
      en: [
        "Architected the complete inventory lifecycle covering multi-warehouse management, product catalogs, batch tracking, stock mutation, inter-warehouse transfers, restocking, and returns.",
        "Integrated Redis caching mechanisms for high-frequency data and response time optimizations across stock tracking endpoints.",
        "Implemented layered security featuring user authentication and Role-Based Access Control (RBAC) to enforce operational warehouse permission boundaries."
      ]
    },
    skills: ["Laravel 12", "MySQL", "Redis", "RESTful API", "RBAC"],
    githubUrl: "https://github.com/wyasana12/stoq_slab",
    featured: true
  },
  {
    id: "proj-2",
    title: "Task Management & File Attachment RESTful API (To-Do App)",
    subtitle: {
      id: "Backend Development (Golang)",
      en: "Backend Development (Golang)"
    },
    category: "Software Engineer",
    description: {
      id: "Layanan RESTful API berkinerja tinggi berbasis Go (Golang) untuk manajemen daftar tugas yang mendukung pengelolaan lampiran berkas (file attachment) serta fitur pemulihan data terhapus.",
      en: "A high-performance Go (Golang) RESTful API service for task management featuring file attachment handling and deleted data recovery mechanisms."
    },
    highlights: {
      id: [
        "Mengembangkan operasi CRUD tugas yang dilengkapi fitur manajemen berkas (unggah, unduh, dan hapus attachment pada setiap item tugas).",
        "Membangun mekanisme Soft Delete (keranjang sampah / trash) yang memungkinkan pengguna memulihkan tugas yang tidak sengaja terhapus sebelum dihapus secara permanen.",
        "Mengamankan kredensial pengguna menggunakan algoritma hashing bcrypt serta menyediakan dokumentasi API interaktif menggunakan Swagger UI untuk mempermudah pengujian dan integrasi frontend."
      ],
      en: [
        "Developed task CRUD operations equipped with comprehensive file attachment handling (upload, download, and delete attachments per task).",
        "Constructed a Soft Delete (trash bin) recovery mechanism enabling users to restore accidentally deleted tasks before permanent deletion.",
        "Secured user credentials with bcrypt password hashing and provided interactive Swagger UI documentation for seamless testing and frontend integration."
      ]
    },
    skills: ["Golang", "MySQL", "Swagger UI", "Bcrypt", "RESTful API"],
    githubUrl: "https://github.com/wyasana12/to-do-with-golang",
    featured: true
  },
  {
    id: "proj-3",
    title: "Multi-Role Publishing Platform API (Blog App)",
    subtitle: {
      id: "Backend Development (Golang)",
      en: "Backend Development (Golang)"
    },
    category: "Software Engineer",
    description: {
      id: "Layanan RESTful API untuk platform publikasi artikel dan manajemen konten (CMS) yang dibangun menggunakan bahasa pemrograman Go dan framework Echo dengan fokus pada kecepatan akses dan keamanan otorisasi.",
      en: "A RESTful API service for article publishing and content management (CMS) built with Go and the Echo framework, emphasizing high-throughput access and secure multi-role authorization."
    },
    highlights: {
      id: [
        "Mengimplementasikan autentikasi stateless menggunakan JSON Web Token (JWT) untuk mengamankan sesi pengguna di seluruh endpoint.",
        "Membangun sistem manajemen peran (Role Management) dan hak akses untuk memisahkan otorisasi antara penulis, editor/admin, dan pembaca.",
        "Merancang operasi CRUD yang efisien pada database relasional PostgreSQL untuk pengelolaan artikel dan publikasi konten."
      ],
      en: [
        "Implemented stateless JSON Web Token (JWT) authentication safeguarding user sessions across all API endpoints.",
        "Constructed Role Management access controls separating authorizations between authors, editors/admins, and readers.",
        "Designed optimized CRUD database operations on PostgreSQL for reliable content and publication management."
      ]
    },
    skills: ["Golang", "Echo Framework", "PostgreSQL", "JWT Authentication", "RBAC"],
    githubUrl: "https://github.com/wyasana12/blog-with-golang",
    featured: true
  },
  {
    id: "proj-4",
    title: "Sistem Informasi Reservasi & Janji Temu — PMB Dyah Sumarmo",
    subtitle: {
      id: "Fullstack / Backend Web Development",
      en: "Fullstack / Backend Web Development"
    },
    category: "Software Engineer",
    description: {
      id: "Aplikasi web manajemen reservasi layanan kesehatan untuk Praktik Mandiri Bidan (PMB) Dyah Sumarmo yang mendigitalisasi proses pendaftaran pasien dan penjadwalan konsultasi.",
      en: "A healthcare appointment management web application for Praktik Mandiri Bidan (PMB) Dyah Sumarmo, digitalizing patient registration and medical consultation scheduling."
    },
    highlights: {
      id: [
        "Membangun sistem penjadwalan dan manajemen janji temu (appointment) untuk mencegah bentrok jadwal layanan medis serta mempermudah antrean pasien.",
        "Merancang skema database relasional dengan MySQL dan logika bisnis menggunakan Laravel 10 untuk mengelola data rekam jadwal pasien, ketersediaan jam praktik bidan, serta riwayat kunjungan."
      ],
      en: [
        "Constructed an appointment management and scheduling system preventing medical consultation overlapping and streamlining patient queues.",
        "Designed relational database schemas with MySQL and business logic using Laravel 10 managing patient visit logs, practice availability, and consultation history."
      ]
    },
    skills: ["Laravel 10", "MySQL", "PHP", "Web Application"],
    githubUrl: "https://github.com/wyasana12/kelolaBidanDian",
    featured: false
  }
];

export const SKILL_PILLARS: SkillCategory[] = [
  {
    title: {
      id: "Backend Developer",
      en: "Backend Developer"
    },
    icon: "server",
    description: {
      id: "Merancang dan membangun aplikasi web serta layanan backend yang efisien, scalable, dan mudah dipelihara (maintainable) menggunakan pendekatan Clean Architecture. Berpengalaman menangani siklus pengembangan penuh, mulai dari perancangan skema database dan RESTful API, manajemen autentikasi dan keamanan, hingga optimasi performa dan pemeliharaan kode di lingkungan produksi.",
      en: "Designing and building efficient, scalable, and maintainable web applications and backend services using Clean Architecture principles. Experienced in the full development lifecycle, from database schema and RESTful API design, authentication and security management, to performance optimization and production maintenance."
    },
    items: ["Golang", "ASP.NET", "Laravel 12", "SQL (PostgreSQL/MySQL)", "NoSQL", "REST API", "Git"]
  },
  {
    title: {
      id: "Data Engineering",
      en: "Data Engineering"
    },
    icon: "database",
    description: {
      id: "Membangun dan mengelola infrastruktur serta alur kerja data yang andal untuk memastikan ketersediaan data berkualitas tinggi. Berpengalaman dalam siklus rekayasa data penuh, mulai dari ekstraksi data multi-sumber (data ingestion), perancangan pipa ETL/ELT, pembersihan dan transformasi data, pemodelan Data Warehouse (Star/Snowflake Schema), hingga optimasi performa query berskala besar.",
      en: "Building and managing reliable data infrastructure and workflows to ensure high-quality data availability. Experienced in the full data engineering lifecycle, from multi-source data ingestion, ETL/ELT pipeline design, data cleaning and transformation, Data Warehouse modeling (Star/Snowflake Schema), to large-scale query optimization."
    },
    items: ["Snowflake", "Advanced SQL", "ETL Pipeline", "Data Warehousing", "Dimension Modelling"]
  },
  {
    title: {
      id: "Business Intelligence (BI) Analysis",
      en: "Business Intelligence (BI) Analysis"
    },
    icon: "bar-chart",
    description: {
      id: "Menerjemahkan data mentah menjadi laporan visual dan dashboard interaktif yang menjawab kebutuhan bisnis. Berpengalaman dalam siklus analisis penuh, mulai dari perumusan metrik dan KPI, transformasi data menggunakan Power Query, pembuatan kalkulasi kompleks dengan DAX (Calculated Measure, Calculated Column, dan Parameter), pemodelan relasi data, hingga penyajian data storytelling untuk mendukung keputusan berbasis data.",
      en: "Translating raw data into visual reports and interactive dashboards addressing core business needs. Experienced across the full analytical lifecycle, from defining metrics and KPIs, data transformation using Power Query, complex DAX calculations (Calculated Measures, Columns, and Parameters), data relationship modeling, to data storytelling supporting data-driven decisions."
    },
    items: ["Power BI", "DAX", "Power Query", "Data Modelling", "KPI Dashboarding", "Reporting"]
  }
];
