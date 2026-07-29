/** Static seed data for the Sekolah Alam Al-Karim dashboard. */

export const SCHOOL = {
  name: "Sekolah Alam Al-Karim",
  tagline: "The Green Islamic Future School",
};

export type Level = {
  id: string;
  name: string;
  alias: string;
  students: number;
  teachers: number;
  description: string;
  tone: string;
};

export const levels: Level[] = [
  {
    id: "toddler",
    name: "Toddler & Daycare",
    alias: "Little Explorer",
    students: 48,
    teachers: 8,
    description: "Pengasuhan hangat berbasis alam untuk usia 1–3 tahun dengan stimulasi motorik dan adab harian.",
    tone: "from-emerald-500/15 to-emerald-500/0",
  },
  {
    id: "alc",
    name: "Al-Karim Learning Center",
    alias: "Learning Center",
    students: 62,
    teachers: 9,
    description: "Kelas pendampingan belajar, terapi perkembangan, dan program talenta khusus.",
    tone: "from-teal-500/15 to-teal-500/0",
  },
  {
    id: "tk",
    name: "TK",
    alias: "Player",
    students: 134,
    teachers: 14,
    description: "Bermain adalah kurikulum. Anak belajar melalui eksplorasi alam, seni, dan pembiasaan ibadah.",
    tone: "from-amber-500/15 to-amber-500/0",
  },
  {
    id: "sd",
    name: "SD",
    alias: "Explorer",
    students: 412,
    teachers: 38,
    description: "Experiential learning, outbound tematik, tahfidz harian, dan proyek lintas mata pelajaran.",
    tone: "from-lime-500/15 to-lime-500/0",
  },
  {
    id: "smp",
    name: "SMP",
    alias: "Finder",
    students: 268,
    teachers: 27,
    description: "Talent mapping, kepemimpinan, riset sederhana, dan kemandirian melalui ekspedisi alam.",
    tone: "from-cyan-500/15 to-cyan-500/0",
  },
  {
    id: "sma",
    name: "SMA",
    alias: "Maker",
    students: 181,
    teachers: 22,
    description: "Entrepreneurship, karya nyata, magang, dan persiapan kampus dengan bimbingan maestro.",
    tone: "from-orange-500/15 to-orange-500/0",
  },
];

export const totals = {
  students: levels.reduce((a, l) => a + l.students, 0),
  teachers: levels.reduce((a, l) => a + l.teachers, 0),
  levels: levels.length,
  programs: 8,
  articles: 146,
  achievements: 87,
  weekEvents: 6,
  gallery: 328,
};

export const programs = [
  { name: "Tahfidz Quran", desc: "Target hafalan bertingkat dengan halaqah harian dan murajaah pekanan.", peserta: 640, aktif: true, icon: "BookOpenText" },
  { name: "Talent Mapping", desc: "Pemetaan bakat siswa sebagai dasar personalisasi pembelajaran.", peserta: 449, aktif: true, icon: "Compass" },
  { name: "Experiential Learning", desc: "Belajar langsung di alam: berkebun, beternak, ekspedisi, dan riset lapangan.", peserta: 1105, aktif: true, icon: "Leaf" },
  { name: "IT & English", desc: "Coding, literasi digital, dan English day untuk kesiapan global.", peserta: 861, aktif: true, icon: "Laptop" },
  { name: "Entrepreneurship", desc: "Market day, business plan, dan praktik dagang bersama mentor.", peserta: 393, aktif: true, icon: "Store" },
  { name: "Parenting Program", desc: "Kelas orang tua bulanan untuk sinergi pendidikan rumah dan sekolah.", peserta: 720, aktif: true, icon: "HeartHandshake" },
  { name: "Belajar Bersama Maestro", desc: "Siswa belajar langsung dari praktisi ahli di bidangnya.", peserta: 214, aktif: true, icon: "Award" },
  { name: "Public Speaking", desc: "Latihan presentasi, khitobah, dan storytelling di panggung sekolah.", peserta: 305, aktif: false, icon: "Mic" },
];

export const studentsPerLevel = levels.map((l) => ({ jenjang: l.name.replace(" & Daycare", ""), siswa: l.students }));

export const achievementsPerYear = [
  { tahun: "2020", prestasi: 24 },
  { tahun: "2021", prestasi: 31 },
  { tahun: "2022", prestasi: 45 },
  { tahun: "2023", prestasi: 58 },
  { tahun: "2024", prestasi: 72 },
  { tahun: "2025", prestasi: 87 },
];

export const ppdbMonthly = [
  { bulan: "Sep", pendaftar: 42, diterima: 30 },
  { bulan: "Okt", pendaftar: 68, diterima: 51 },
  { bulan: "Nov", pendaftar: 91, diterima: 70 },
  { bulan: "Des", pendaftar: 117, diterima: 88 },
  { bulan: "Jan", pendaftar: 148, diterima: 112 },
  { bulan: "Feb", pendaftar: 176, diterima: 139 },
];

export const studentGrowth = [
  { tahun: "2020", siswa: 640 },
  { tahun: "2021", siswa: 742 },
  { tahun: "2022", siswa: 851 },
  { tahun: "2023", siswa: 948 },
  { tahun: "2024", siswa: 1042 },
  { tahun: "2025", siswa: 1105 },
];

export type NewsItem = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  status: "Publish" | "Draft" | "Review";
};

export const news: NewsItem[] = [
  { id: 1, judul: "Wisuda Tahfidz Angkatan ke-12 Berlangsung Khidmat", kategori: "Tahfidz", tanggal: "2026-07-21", penulis: "Humas Al-Karim", status: "Publish" },
  { id: 2, judul: "Camping with Father: Membangun Kedekatan Ayah dan Anak", kategori: "Kegiatan", tanggal: "2026-07-18", penulis: "Tim SD Explorer", status: "Publish" },
  { id: 3, judul: "Selling Day SMP Finder Raih Omzet Rp32 Juta", kategori: "Entrepreneurship", tanggal: "2026-07-12", penulis: "Ust. Rahmat", status: "Publish" },
  { id: 4, judul: "Project Exhibition SMA Maker 2026 Dibuka untuk Umum", kategori: "Akademik", tanggal: "2026-07-09", penulis: "Kesiswaan", status: "Review" },
  { id: 5, judul: "Tim Sains SD Juara 1 Olimpiade Nasional", kategori: "Prestasi", tanggal: "2026-07-02", penulis: "Humas Al-Karim", status: "Publish" },
  { id: 6, judul: "Parenting Class: Mendidik Anak di Era Digital", kategori: "Parenting", tanggal: "2026-06-28", penulis: "Kepala Sekolah", status: "Publish" },
  { id: 7, judul: "PPDB Gelombang 2 Resmi Dibuka", kategori: "PPDB", tanggal: "2026-06-20", penulis: "Panitia PPDB", status: "Publish" },
  { id: 8, judul: "Belajar Bersama Maestro: Kelas Keramik Bersama Seniman", kategori: "Program", tanggal: "2026-06-14", penulis: "Tim Program", status: "Draft" },
  { id: 9, judul: "Green Action Day: Menanam 500 Pohon", kategori: "Kegiatan", tanggal: "2026-06-05", penulis: "Tim Lingkungan", status: "Publish" },
  { id: 10, judul: "Student Spotlight: Kisah Aisyah Sang Penulis Cilik", kategori: "Siswa", tanggal: "2026-05-30", penulis: "Redaksi", status: "Publish" },
  { id: 11, judul: "Workshop Guru: Asesmen Berbasis Proyek", kategori: "Guru", tanggal: "2026-05-22", penulis: "Kurikulum", status: "Review" },
  { id: 12, judul: "TK Player Gelar Pentas Alam Ceria", kategori: "Kegiatan", tanggal: "2026-05-16", penulis: "Tim TK", status: "Publish" },
];

export const achievements = [
  { tahun: "2026", judul: "Juara 1 Olimpiade Sains Nasional Tingkat SD", kategori: "Sains", nama: "Aisyah Nur Rahma", tanggal: "12 Juli 2026" },
  { tahun: "2026", judul: "Juara Umum Musabaqah Hifzhil Quran Provinsi", kategori: "Tahfidz", nama: "Tim Tahfidz SMP", tanggal: "28 Juni 2026" },
  { tahun: "2026", judul: "Best Young Entrepreneur Expo Nasional", kategori: "Bisnis", nama: "Tim Maker SMA", tanggal: "4 Mei 2026" },
  { tahun: "2025", judul: "Juara 2 Kejuaraan Panahan Antar Sekolah Alam", kategori: "Olahraga", nama: "Fatih Abdurrahman", tanggal: "19 November 2025" },
  { tahun: "2025", judul: "Medali Emas Lomba Karya Tulis Ilmiah Remaja", kategori: "Akademik", nama: "Zahra & Hanif", tanggal: "3 September 2025" },
  { tahun: "2025", judul: "Juara 1 Student Leadership Camp Regional", kategori: "Leadership", nama: "OSIS Al-Karim", tanggal: "17 Juli 2025" },
  { tahun: "2024", judul: "Juara 3 Robotic Challenge Nasional", kategori: "Sains", nama: "Tim IT Finder", tanggal: "22 Oktober 2024" },
  { tahun: "2024", judul: "Juara 1 Futsal Piala Walikota", kategori: "Olahraga", nama: "Tim Futsal SMA", tanggal: "8 Maret 2024" },
];

export const achievementCategories = ["Akademik", "Olahraga", "Tahfidz", "Sains", "Bisnis", "Leadership"] as const;

export const events = [
  { tanggal: "2026-08-03", judul: "Parenting Class Semester Ganjil", jenis: "Parenting", waktu: "08.00 – 11.00" },
  { tanggal: "2026-08-08", judul: "Camping with Father", jenis: "Kegiatan", waktu: "15.00 – 10.00" },
  { tanggal: "2026-08-15", judul: "Camping with Mom", jenis: "Kegiatan", waktu: "15.00 – 10.00" },
  { tanggal: "2026-08-19", judul: "Selling Day Entrepreneur", jenis: "Entrepreneurship", waktu: "07.30 – 12.00" },
  { tanggal: "2026-08-22", judul: "Project Exhibition", jenis: "Akademik", waktu: "08.00 – 14.00" },
  { tanggal: "2026-08-26", judul: "Student Spotlight", jenis: "Siswa", waktu: "09.00 – 11.00" },
  { tanggal: "2026-08-28", judul: "Workshop Guru: Asesmen Alam", jenis: "Guru", waktu: "13.00 – 16.00" },
  { tanggal: "2026-08-30", judul: "Seminar Pendidikan Alam", jenis: "Seminar", waktu: "08.00 – 12.00" },
  { tanggal: "2026-08-31", judul: "Graduation Day", jenis: "Kegiatan", waktu: "07.00 – 12.00" },
];

export const galleryFilters = ["Semua", "SD", "TK", "SMP", "SMA", "Prestasi", "Kegiatan"] as const;

export const gallery = Array.from({ length: 18 }).map((_, i) => {
  const cats = ["SD", "TK", "SMP", "SMA", "Prestasi", "Kegiatan"];
  const titles = [
    "Outbound Tematik",
    "Panen Kebun Sekolah",
    "Halaqah Tahfidz Pagi",
    "Market Day",
    "Ekspedisi Gunung",
    "Pentas Alam Ceria",
    "Kelas Maestro Keramik",
    "Panahan Sore",
    "Green Action Day",
  ];
  return {
    id: i + 1,
    judul: titles[i % titles.length],
    kategori: cats[i % cats.length],
    ratio: [3 / 4, 1, 4 / 3, 3 / 4, 1][i % 5],
    seed: 120 + i * 7,
  };
});

export const trafficData = [
  { bulan: "Feb", pengunjung: 8200, artikel: 18 },
  { bulan: "Mar", pengunjung: 9600, artikel: 21 },
  { bulan: "Apr", pengunjung: 11400, artikel: 24 },
  { bulan: "Mei", pengunjung: 12900, artikel: 26 },
  { bulan: "Jun", pengunjung: 15800, artikel: 29 },
  { bulan: "Jul", pengunjung: 18450, artikel: 28 },
];

export const ppdbByLevel = [
  { jenjang: "Toddler", pendaftar: 18, kuota: 24 },
  { jenjang: "TK", pendaftar: 46, kuota: 60 },
  { jenjang: "SD", pendaftar: 72, kuota: 84 },
  { jenjang: "SMP", pendaftar: 51, kuota: 56 },
  { jenjang: "SMA", pendaftar: 39, kuota: 48 },
];

export const ppdbOrigin = [
  { asal: "TK/RA Sekitar", jumlah: 62 },
  { asal: "SD Negeri", jumlah: 48 },
  { asal: "SD Islam Terpadu", jumlah: 44 },
  { asal: "Internal Al-Karim", jumlah: 58 },
  { asal: "Luar Kota", jumlah: 14 },
];

export const notifications = [
  { tipe: "Berita", judul: "Wisuda Tahfidz Angkatan ke-12 dipublikasikan", waktu: "12 menit lalu" },
  { tipe: "Agenda", judul: "Parenting Class dimulai pukul 08.00", waktu: "Hari ini" },
  { tipe: "PPDB", judul: "7 pendaftar baru jenjang SD Explorer", waktu: "1 jam lalu" },
  { tipe: "Prestasi", judul: "Juara 1 Olimpiade Sains Nasional dicatat", waktu: "3 jam lalu" },
  { tipe: "Reminder", judul: "Laporan bulanan kesiswaan jatuh tempo Jumat", waktu: "Besok" },
];

export const teachers = [
  { nama: "Ust. Rahmat Hidayat", jenjang: "SMA", mapel: "Entrepreneurship", status: "Tetap" },
  { nama: "Usth. Salma Nadhira", jenjang: "SD", mapel: "Tahfidz", status: "Tetap" },
  { nama: "Ust. Faisal Umar", jenjang: "SMP", mapel: "Sains Alam", status: "Tetap" },
  { nama: "Usth. Laila Fitri", jenjang: "TK", mapel: "Guru Kelas", status: "Tetap" },
  { nama: "Ust. Yusuf Ramadhan", jenjang: "SMA", mapel: "IT & Coding", status: "Kontrak" },
  { nama: "Usth. Nabila Zahra", jenjang: "SD", mapel: "English", status: "Tetap" },
  { nama: "Ust. Hanif Kurnia", jenjang: "SMP", mapel: "Public Speaking", status: "Kontrak" },
  { nama: "Usth. Rania Putri", jenjang: "Toddler", mapel: "Pengasuhan", status: "Tetap" },
];

export const students = [
  { nis: "AK-24-0181", nama: "Aisyah Nur Rahma", jenjang: "SD", kelas: "5 Explorer", status: "Aktif" },
  { nis: "AK-23-0092", nama: "Fatih Abdurrahman", jenjang: "SMP", kelas: "8 Finder", status: "Aktif" },
  { nis: "AK-22-0044", nama: "Zahra Salsabila", jenjang: "SMA", kelas: "11 Maker", status: "Aktif" },
  { nis: "AK-25-0233", nama: "Hanif Alfarizi", jenjang: "SD", kelas: "3 Explorer", status: "Aktif" },
  { nis: "AK-25-0301", nama: "Kayla Humaira", jenjang: "TK", kelas: "B Player", status: "Aktif" },
  { nis: "AK-24-0158", nama: "Rafi Maulana", jenjang: "SMP", kelas: "7 Finder", status: "Cuti" },
  { nis: "AK-23-0077", nama: "Naura Aqila", jenjang: "SMA", kelas: "12 Maker", status: "Aktif" },
  { nis: "AK-26-0412", nama: "Arka Dwi Pratama", jenjang: "Toddler", kelas: "Daycare A", status: "Aktif" },
];
