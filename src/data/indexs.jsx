
const DATA = {

  clinic: {
    name:    'VERUM Clinic',
    phone:   '+998 71 200-40-00',
    address: "Parkent ko'chasi, 115, Toshkent",
    hours:   'Du–Ju: 09:00–18:00',
    socials: {
      facebook:  '#',
      instagram: '#',
      telegram:  '#',
      youtube:   '#',
    },
  },

  // ── 2. NAVIGATSIYA ──────────────────────────────────────────
  nav: [
    { href: '#about',   label: 'Klinika haqida'  },
    { href: '#depts',   label: "Bo'limlar"        },
    { href: '#docs',    label: 'Shifokorlar'      },
    { href: '#reviews', label: 'Mijozlar fikri'   },
    { href: '#ops',     label: 'Operatsiyalar'    },
    { href: '#loc',     label: 'Manzil'           },
  ],

  // ── 3. STATISTIKA (hero + about counter) ───────────────────
  stats: [
    { value: 50,    suffix: '+', label: 'Tajribali shifokorlar', icon: 'FaUserMd'       },
    { value: 15,    suffix: '+', label: "Tibbiy bo'limlar",      icon: 'MdLocalHospital' },
    { value: 10000, suffix: '+', label: 'Mamnun bemorlar',       icon: 'FaStar'          },
    { value: 5,     suffix: '+', label: 'Yillik tajriba',        icon: 'FaAward'         },
  ],

  // ── 4. BO'LIMLAR (Departments) ──────────────────────────────
  departments: [
    {
      key:    'kardiologiya',
      title:  'Kardiologiya',
      icon:   'FaHeartbeat',
      bg:     '#FEF0F0',
      accent: '#E31E24',
      desc:   'Yurak va qon tomir kasalliklarini zamonaviy usullar bilan diagnostika va davolash.',
    },
    {
      key:    'ginekologiya',
      title:  'Ginekologiya',
      icon:   'MdOutlineHealthAndSafety',
      bg:     '#FDF2F8',
      accent: '#DB2777',
      desc:   "Ayollar sog'lig'ini saqlash, tashxis va davolash bo'yicha tajribali mutaxassislar.",
    },
    {
      key:    'nevrologiya',
      title:  'Nevrologiya',
      icon:   'FaBrain',
      bg:     '#E6F4FB',
      accent: '#0084D1',
      desc:   'Asab tizimi kasalliklarini davolash, iglorefleksoterapiya va reabilitatsiya.',
    },
    {
      key:    'urologiya',
      title:  'Urologiya',
      icon:   'FaUserMd',
      bg:     '#EFF6FF',
      accent: '#0084D1',
      desc:   "Urogenital tizim kasalliklarini zamonaviy UZI diagnostika bilan davolash.",
    },
    {
      key:    'diagnostika',
      title:  'Diagnostika',
      icon:   'FaMicroscope',
      bg:     '#F0FDF4',
      accent: '#16A34A',
      desc:   "EXoKG, Xolter monitoring, SMAD, UZI — aniq va tezkor tashxis qo'yish.",
    },
    {
      key:    'laboratoriya',
      title:  'Laboratoriya',
      icon:   'FaFlask',
      bg:     '#F5F3FF',
      accent: '#5C5AA7',
      desc:   'Zamonaviy laboratoriya uskunalari bilan qon, siydik va boshqa tahlillar.',
    },
    {
      key:    'pediatriya',
      title:  'Pediatriya',
      icon:   'MdLocalHospital',
      bg:     '#FFF7ED',
      accent: '#EA580C',
      desc:   "Bolalar va o'smirlarga ixtisoslashgan sifatli tibbiy xizmat.",
    },
    {
      key:    'xirurgiya',
      title:  'Xirurgiya',
      icon:   'FaStethoscope',
      bg:     '#F0FDF4',
      accent: '#16A34A',
      desc:   'Laparoskopik va endoskopik operatsiyalar, zamonaviy jarrohlik texnologiyalari.',
    },
  ],

  // ── 5. SHIFOKORLAR (Doctors) ────────────────────────────────
  doctors: [
    {
      id:         1,
      name:       'Rahimova Shahnozaxon M.',
      spec:       'Nevrolog, PhD, dotsent',
      detail:     '8 yil tajriba | Du–Ju: 09:00–14:00',
      accent:     '#0084D1',
      cardBg:     '#E6F4FB',
      avatarGrad: ['#0084D1', '#003566'],
      initials:   'SH',
      image:      'Shahnozaxon',
    },
    {
      id:         2,
      name:       'Mirakbarova Kamola A.',
      spec:       'Kardiolog, Funksional diagnostika',
      detail:     '5 yil tajriba | Du–Ju: 10:00–16:00',
      accent:     '#E31E24',
      cardBg:     '#FEF0F0',
      avatarGrad: ['#E31E24', '#7B0014'],
      initials:   'KA',
      image:      'Baxtiyor',
    },
    {
      id:         3,
      name:       'Xidirova Mahina S.',
      spec:       'Ginekolog',
      detail:     '8 yil tajriba',
      accent:     '#16A34A',
      cardBg:     '#F0FDF4',
      avatarGrad: ['#16A34A', '#064E26'],
      initials:   'MX',
      image:      'Mahina',
    },
    {
      id:         4,
      name:       'Sarsenbaev Nuridin B.',
      spec:       'Vrach-laborant',
      detail:     '11 yil tajriba | Du–Sha: 10:00–17:00',
      accent:     '#5C5AA7',
      cardBg:     '#F5F3FF',
      avatarGrad: ['#5C5AA7', '#2D2B6E'],
      initials:   'NB',
      image:      'Nuridin',
    },
    {
      id:         5,
      name:       'Karimov Murodjon F.',
      spec:       'Urolog, UZI vrach',
      detail:     '10 yil tajriba',
      accent:     '#0084D1',
      cardBg:     '#EFF6FF',
      avatarGrad: ['#1E88E5', '#0084D1'],
      initials:   'KM',
      image:      'Karimov',
    },
  ],

  // ── 6. MIJOZLAR FIKRI (Reviews) ─────────────────────────────
  reviews: [
    {
      id:    1,
      name:  'Hurramova Hafiza',
      role:  'Bemor',
      stars: 5,
      text:  "Verum klinikasida operatsiya qildim. Natijadan juda mamnunman — shifokorlar e'tiborli va professional!",
    },
    {
      id:    2,
      name:  "Normo'minuva Muslima",
      role:  'Bemor',
      stars: 5,
      text:  "Ginekolog shifokor juda mehribon va malakali. Har safar o'zimni qulay his qilaman. Tavsiya qilaman!",
    },
    {
      id:    3,
      name:  'Eshnazarova Gulchehra',
      role:  'Bemor',
      stars: 5,
      text:  'Diagnostika markazi zamonaviy jihozlangan. Natijalar tez va aniq, shifokor batafsil tushuntirdi.',
    },
    {
      id:    4,
      name:  'Azamqulov Abilqul',
      role:  'Bemor',
      stars: 5,
      text:  "Urologiya bo'limidagi shifokor juda tajribali. Muammom tezda hal bo'ldi. Rahmat Verum Clinic!",
    },
    {
      id:    5,
      name:  'Arslonova Bahor',
      role:  'Bemor',
      stars: 5,
      text:  'Laboratoriya natijalari juda tez keldi. Xodimlar doim tabassum bilan kutib oladi.',
    },
    {
      id:    6,
      name:  'Jumanazarov Bunyod',
      role:  'Bemor',
      stars: 5,
      text:  "Nevrologiya bo'limida davolandi. Doktor Shahnozaxon zo'r mutaxassis, tavsiya qilaman!",
    },
  ],

  // ── 7. OPERATSIYALAR (Operations) ───────────────────────────
  operations: [
    {
      emoji: '🔬',
      title: 'Laparoskopik jarrohlik',
      desc:  "Minimal invaziv usulda og'riqsiz operatsiyalar",
    },
    {
      emoji: '🔭',
      title: 'Endoskopiya',
      desc:  "Ichki a'zolarni tekshirish va davolash",
    },
    {
      emoji: '👁️',
      title: "Ko'z operatsiyasi",
      desc:  "Ko'rish a'zolariga zamonaviy jarrohlik",
    },
    {
      emoji: '📡',
      title: 'UZI diagnostika',
      desc:  "To'liq ultratovush tekshiruvi",
    },
    {
      emoji: '❤️',
      title: 'Kardioxirurgiya',
      desc:  'Yurak kasalliklariga jarrohlik yordami',
    },
    {
      emoji: '🦴',
      title: 'Travmatologiya',
      desc:  "Suyak va bo'g'im operatsiyalari",
    },
  ],

  // ── 8. FILIALLAR (Branches — Loc section uchun) ─────────────
  branches: [
    {
      id:      1,
      name:    'Uchtepa filiali',
      address: "Parkent ko'chasi, 115, Toshkent",
      phone:   '+998 71 200-40-00',
      hours:   'Du–Ju: 09:00–18:00, Shan: 09:00–14:00',
      mapUrl:  'https://yandex.uz/maps/?text=Verum%20Clinic%20Parkent%20115%20Toshkent',
    },
    {
      id:      2,
      name:    'Shayxontohur filiali',
      address: 'Shayxontohur tumani, Toshkent',
      phone:   '+998 71 200-40-00',
      hours:   'Du–Ju: 09:00–18:00',
      mapUrl:  'https://yandex.uz/maps/?text=Verum%20Clinic%20Shayxontohur%20Toshkent',
    },
  ],

  // ── 9. ABOUT (Klinika haqida bo'limi) ───────────────────────
  about: {
    branches: [
      {
        emoji:       '🏥',
        title:       'Uchtepa filiali',
        accentColor: '#0084D1',
        cardBg:      '#E6F4FB',
        desc:        "Bolalar va o'smirlarga yuqori sifatli tibbiy xizmat ko'rsatishga ixtisoslashgan zamonaviy tibbiyot muassasasi.",
      },
      {
        emoji:       '🏨',
        title:       'Shayxontohur filiali',
        accentColor: '#E31E24',
        cardBg:      '#FEF0F0',
        desc:        "2020-yil avgustdan faoliyat yuritadi. Asosiy yo'nalishlar: urologiya va ginekologiya.",
      },
    ],
    mission: {
      emoji: '🎯',
      title: 'Bizning tamoyil',
      desc:  'Har bir bemorga individual yondashuv, aniq tashxis va samarali davolash.',
    },
  },

};

export default DATA;