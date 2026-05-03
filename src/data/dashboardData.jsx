import logo from '../assets/verum/Verum.png';
import heroPrimary from '../assets/verum/img.png';
import heroSecondary from '../assets/verum/img_1.png';
import doctorKamola from '../assets/verum/doctor/img_1.png';
import doctorKarimov from '../assets/verum/doctor/Каримов.png';
import doctorMahina from '../assets/verum/doctor/Mahina.png';
import doctorNuridin from '../assets/verum/doctor/Нуридин.png';
import doctorShahlo from '../assets/verum/doctor/Shahlo.png';
import doctorShahnozaxon from '../assets/verum/doctor/Shahnozaxon.png';
import serviceGyn from '../assets/verum/images/ginikalogiya.png';
import serviceLab from '../assets/verum/images/joyiga.png';
import serviceCardio from '../assets/verum/images/kardiyalogiya.png';
import serviceLor from '../assets/verum/images/lor.png';
import serviceNeuro from '../assets/verum/images/nevrapatlok.png';
import serviceProcto from '../assets/verum/images/praktogol.png';
import serviceUro from '../assets/verum/images/urolg.png';
import serviceUzi from '../assets/verum/images/uzey.png';
import serviceSurgery from '../assets/verum/images/xrug.png';

const assets = {
  logo,
  hero: {
    primary: heroPrimary,
    secondary: heroSecondary,
  },
  services: {
    cardio: serviceCardio,
    gyn: serviceGyn,
    neuro: serviceNeuro,
    uro: serviceUro,
    uzi: serviceUzi,
    lab: serviceLab,
    lor: serviceLor,
    surgery: serviceSurgery,
    procto: serviceProcto,
  },
  doctors: {
    shahnozaxon: doctorShahnozaxon,
    kamola: doctorKamola,
    mahina: doctorMahina,
    nuridin: doctorNuridin,
    karimov: doctorKarimov,
    shahlo: doctorShahlo,
  },
};

const shared = {
  clinic: {
    phone: '+998 55 502-20-20',
    emergencyPhone: '+998 55 502-20-20',
    email: 'info@verumclinic.uz',
    address: "General Uzoqov ko'chasi 43, Toshkent",
    hours: '09:00 - 18:00',
    mapUrl: 'https://yandex.uz/maps/?text=Verum%20Clinic%20General%20Uzoqov%2043%20Toshkent',
    socials: {
      facebook: '#',
      instagram: '#',
      telegram: '#',
      youtube: '#',
    },
  },
  branches: [
    {
      key: 'clinic',
      image: 'primary',
      mapQuery: "Verum Clinic General Uzoqov ko'chasi 43 Toshkent",
      mapUrl: 'https://yandex.uz/maps/?text=Verum%20Clinic%20General%20Uzoqov%2043%20Toshkent',
      mapEmbed:
        'https://yandex.uz/map-widget/v1/?text=Verum%20Clinic%20General%20Uzoqov%2043%20Toshkent&z=15',
    },
    {
      key: 'kids',
      image: 'secondary',
      mapQuery: "Verum Kids Beshqayrag'och ko'chasi 54 Toshkent",
      mapUrl: 'https://yandex.uz/maps/?text=Verum%20Kids%20Beshqayrag%27och%2054%20Toshkent',
      mapEmbed:
        'https://yandex.uz/map-widget/v1/?text=Verum%20Kids%20Beshqayrag%27och%20ko%27chasi%2054%20Toshkent&z=15',
    },
  ],
  stats: [
    { value: '50+', key: 'doctors' },
    { value: '15+', key: 'departments' },
    { value: '10 000+', key: 'patients' },
    { value: '5+', key: 'experience' },
  ],
  serviceKeys: ['cardio', 'gyn', 'neuro', 'uro', 'uzi', 'lab', 'lor', 'surgery', 'procto'],
  doctorKeys: ['shahlo', 'shahnozaxon', 'mahina', 'kamola', 'nuridin', 'karimov'],
};

const locales = {
  uz: {
    langLabel: "O'zbekcha",
    common: {
      appointment: 'Qabulga yozilish',
      call: "Qo'ng'iroq qilish",
      chooseDepartment: "Bo'limni tanlang",
      send: 'Yuborish',
      name: 'Ism va familiya',
      phone: 'Telefon raqam',
      department: "Yo'nalish",
      available: 'Qabul mavjud',
      route: "Xaritada ko'rish",
      location: 'Lokatsiya',
      showMap: "Kartada ko'rsatish",
      day: 'Kun',
      night: 'Tun',
    },
    nav: [
      { href: '#about', label: 'Klinika' },
      { href: '#services', label: 'Xizmatlar' },
      { href: '#doctors', label: 'Shifokorlar' },
      { href: '#results', label: 'Afzalliklar' },
      { href: '#locations', label: 'Filiallar' },
      { href: '#contact', label: 'Aloqa' },
    ],
    hero: {
      eyebrow: 'Toshkentdagi zamonaviy tibbiyot markazi',
      title: 'VERUM Clinic: aniq tashxis, ehtiyotkor davolash, ishonchli natija',
      text: 'Kardiologiya, ginekologiya, nevrologiya, urologiya, UZI, laboratoriya va jarrohlik xizmatlari bir joyda.',
      primaryAlt: 'VERUM Clinic binosi',
      secondaryAlt: 'VERUM Clinic fasadi',
      note: "Rasmlar xira qilinmagan, klinika ko'rinishi aniq saqlangan.",
    },
    statLabels: {
      doctors: 'malakali shifokor',
      departments: "tibbiy yo'nalish",
      patients: 'mamnun bemor',
      experience: 'yillik tajriba',
    },
    sections: {
      aboutEyebrow: 'Klinika haqida',
      aboutTitle: 'Bemor uchun qulay, shifokor uchun aniq tizim',
      aboutText:
        "Ko'rik, laborator tahlil, instrumental diagnostika va davolash jarayoni tartibli yo'lga qo'yilgan.",
      servicesEyebrow: 'Xizmatlar',
      servicesTitle: "Kerakli tibbiy yo'nalishlar",
      servicesText:
        "Har bir bo'limda tekshiruv va davolash bosqichlari bemor uchun tushunarli olib boriladi.",
      doctorsEyebrow: 'Mutaxassislar',
      doctorsTitle: 'Shifokorlarimiz',
      doctorsText:
        'Tajribali mutaxassislarimiz har bir bemorga individual yondashuv va aniq davolash rejasini taqdim etadi.',
      resultsEyebrow: 'Afzalliklar',
      resultsTitle: "Qabuldan keyin keyingi qadam aniq bo'ladi",
      resultsText:
        'Bemor tekshiruv natijalari va shifokor tavsiyalari bilan tushunarli davolash rejasini oladi.',
      locationsEyebrow: 'Filiallar',
      locationsTitle: 'Ikki filial, bitta aniq lokatsiya',
      locationsText: "Kerakli filialni tanlang. Pastdagi Yandex karta shu manzilni ko'rsatadi.",
      contactEyebrow: 'Aloqa',
      contactTitle: 'Qabulga yozilish',
      contactText:
        "Ma'lumotlaringizni qoldiring. Administrator siz bilan bog'lanib, qulay vaqtni kelishadi.",
    },
    services: {
      cardio: {
        title: 'Kardiologiya',
        desc: 'Yurak va qon tomir kasalliklari bo‘yicha tashxis, EKG, EXoKG va Xolter nazorati.',
      },
      gyn: {
        title: 'Ginekologiya',
        desc: 'Ayollar salomatligi uchun konsultatsiya, UZI, laborator tahlil va davolash rejasi.',
      },
      neuro: {
        title: 'Nevrologiya',
        desc: 'Bosh og‘rig‘i, bel og‘rig‘i, asab tizimi muammolari va reabilitatsiya dasturlari.',
      },
      uro: {
        title: 'Urologiya',
        desc: 'Urogenital tizim kasalliklari, UZI diagnostika va individual davolash yondashuvi.',
      },
      uzi: {
        title: 'UZI diagnostika',
        desc: "Ichki a'zolar, qalqonsimon bez, yurak va homiladorlik bo‘yicha aniq tekshiruvlar.",
      },
      lab: {
        title: 'Laboratoriya',
        desc: 'Qon, siydik va boshqa tahlillar zamonaviy laborator uskunalarda tez tayyorlanadi.',
      },
      lor: {
        title: 'LOR',
        desc: 'Quloq, burun va tomoq kasalliklari bo‘yicha ko‘rik, tashxis va davolash.',
      },
      surgery: {
        title: 'Jarrohlik',
        desc: 'Laparoskopik, endoskopik va boshqa zamonaviy jarrohlik amaliyotlari.',
      },
      procto: {
        title: 'Proktologiya',
        desc: 'Nozik muammolar uchun maxfiy, aniq va qulay sharoitdagi tibbiy yordam.',
      },
    },
    doctors: {
      shahlo: {
        name: 'Talipova Shahlo Rahimdjanovna',
        role: 'UZI shifokori',
        info: '8 yil tajriba',
        details: ['Toshkent davlat tibbiyot akademiyasi'],
      },
      shahnozaxon: {
        name: 'Rahimova Shahnozaxon Muhiddin qizi',
        role: 'PhD, dotsent. Nevrolog. Preventiv-integrativ vrach. Iglorefleksoterapevt.',
        info: '8 yil tajriba',
        details: [
          'Tug‘ilgan sana: 01.01.1993',
          'Tug‘ilgan joyi: Toshkent',
          'Ta’lim: Toshkent Tibbiyot Akademiyasi bakalavriati, 3 yil magistratura, 3 yil doktorantura',
          'Qabul: Dushanba - Juma, 09:00 - 14:00',
        ],
      },
      mahina: {
        name: 'Xidirova Mahina Sohibovna',
        role: 'Ginekolog',
        info: '8 yil tajriba',
        details: ['Toshkent davlat pediatriya instituti'],
      },
      kamola: {
        name: 'Mirakbarova Kamola Abdusattorovna',
        role: 'Kardiolog, funksional diagnostika shifokori',
        info: '5 yil tajriba',
        details: [
          'Yo‘nalish: ExoKG, Xolter monitoring, SMAD, Tredmil',
          'Tug‘ilgan sana: 10.07.1991',
          'Tug‘ilgan joyi: Toshkent shahri',
          'Ta’lim: TTA bakalavriati, RCNPMCK klinik ordinatura, VMOI qayta tayyorlash',
          'Qabul: Dushanba - Juma, 10:00 - 16:00',
        ],
      },
      nuridin: {
        name: 'Sarsenbaev Nuridin Berdimuradovich',
        role: 'Vrach-laborant',
        info: '11 yil tajriba',
        details: ['Qabul: Dushanba - Shanba, 10:00 - 17:00'],
      },
      karimov: {
        name: 'Karimov Murodjon Foziljonovich',
        role: 'Urolog, UZI vrach',
        info: '10 yil tajriba',
        details: [
          'Tug‘ilgan sana: 03.09.1990',
          'Tug‘ilgan joyi: Xorazm viloyati',
          'Ta’lim: TTA Urganch filialida 7 yil bakalavr, Toshkent vrachlar malakasini oshirish institutida 2 yil klinik ordinatura',
          'Qabul: Dushanba, Chorshanba, Juma - 09:00 - 14:00',
          'Qabul: Seshanba, Payshanba, Shanba - 09:00 - 17:00',
        ],
      },
    },
    benefits: [
      'Birlamchi ko‘rik va shikoyatlarni tahlil qilish',
      'Kerakli laborator yoki instrumental tekshiruvlarni belgilash',
      'Natijalarni shifokor bilan birga ko‘rib chiqish',
      'Davolash, kuzatuv va profilaktika rejasini olish',
    ],
    branches: {
      kids: {
        name: 'Verum klinika (Uchtepa filiali)',
        address: "Beshqayrag'och ko'chasi 54-uy",
        description:
          'Verum klinikasi bolalar va o‘smirlarga yuqori sifatli tibbiy xizmat ko‘rsatishga ixtisoslashgan zamonaviy tibbiyot muassasasidir. Tajribali mutaxassislar har bir bolaga individual yondashuv asosida yordam ko‘rsatadi.',
      },
      clinic: {
        name: 'Verum klinika (Shayxontohur tumani)',
        address: "General Uzoqov ko'chasi 43",
        description:
          '2020-yil avgust oyida faoliyatini boshlagan klinika urologiya va ginekologiya yo‘nalishlarida zamonaviy yondashuv, aniq tashxis va samarali davolash tamoyillari asosida xizmat ko‘rsatadi.',
      },
    },
    footer: {
      description:
        'VERUM Clinic - diagnostika, davolash va profilaktikani bir joyda jamlagan zamonaviy tibbiyot markazi.',
      columns: [
        {
          title: 'Klinika',
          links: [
            { label: 'Biz haqimizda', href: '#about' },
            { label: 'Shifokorlar', href: '#doctors' },
            { label: 'Xizmatlar', href: '#services' },
            { label: 'Afzalliklar', href: '#results' },
            { label: 'Filiallar', href: '#locations' },
          ],
        },
        {
          title: 'Xizmatlar',
          links: [
            { label: 'Kardiologiya', href: '#services' },
            { label: 'Ginekologiya', href: '#services' },
            { label: 'Nevrologiya', href: '#services' },
            { label: 'Urologiya', href: '#services' },
            { label: 'Laboratoriya', href: '#services' },
          ],
        },
        {
          title: 'Bemorlar uchun',
          links: [
            { label: 'Qabulga yozilish', href: '#contact' },
            { label: 'Tahlil natijalari', href: '#results' },
            { label: 'Narxlar', href: '#contact' },
            { label: 'Savol-javob', href: '#contact' },
          ],
        },
      ],
      contactsTitle: 'Aloqa',
      copyright: 'Barcha huquqlar himoyalangan.',
    },
  },
  ru: {
    langLabel: 'Русский',
    common: {
      appointment: 'Записаться на прием',
      call: 'Позвонить',
      chooseDepartment: 'Выберите отделение',
      send: 'Отправить',
      name: 'Имя и фамилия',
      phone: 'Номер телефона',
      department: 'Направление',
      available: 'Прием доступен',
      route: 'Открыть карту',
      location: 'Локация',
      showMap: 'Показать на карте',
      day: 'День',
      night: 'Ночь',
    },
    nav: [
      { href: '#about', label: 'Клиника' },
      { href: '#services', label: 'Услуги' },
      { href: '#doctors', label: 'Врачи' },
      { href: '#results', label: 'Преимущества' },
      { href: '#locations', label: 'Филиалы' },
      { href: '#contact', label: 'Контакты' },
    ],
    hero: {
      eyebrow: 'Современный медицинский центр в Ташкенте',
      title: 'VERUM Clinic: точная диагностика, бережное лечение, надежный результат',
      text: 'Кардиология, гинекология, неврология, урология, УЗИ, лаборатория и хирургия в одном месте.',
      primaryAlt: 'Здание VERUM Clinic',
      secondaryAlt: 'Фасад VERUM Clinic',
      note: 'Изображения не затемнены, внешний вид клиники сохранен четким.',
    },
    statLabels: {
      doctors: 'квалифицированных врачей',
      departments: 'медицинских направлений',
      patients: 'довольных пациентов',
      experience: 'лет опыта',
    },
    sections: {
      aboutEyebrow: 'О клинике',
      aboutTitle: 'Удобно для пациента, точно для врача',
      aboutText:
        'Осмотр, лабораторные анализы, инструментальная диагностика и лечение выстроены в понятный процесс.',
      servicesEyebrow: 'Услуги',
      servicesTitle: 'Основные медицинские направления',
      servicesText: 'В каждом отделении диагностика и лечение проходят понятно и последовательно.',
      doctorsEyebrow: 'Специалисты',
      doctorsTitle: 'Наши врачи',
      doctorsText:
        'Опытные специалисты подбирают индивидуальный подход и понятный план лечения для каждого пациента.',
      resultsEyebrow: 'Преимущества',
      resultsTitle: 'После приема понятен следующий шаг',
      resultsText: 'Пациент получает результаты обследования, рекомендации врача и план лечения.',
      locationsEyebrow: 'Филиалы',
      locationsTitle: 'Два филиала, точная локация',
      locationsText: 'Выберите нужный филиал. Карта Yandex ниже покажет этот адрес.',
      contactEyebrow: 'Контакты',
      contactTitle: 'Записаться на прием',
      contactText: 'Оставьте данные. Администратор свяжется с вами и подберет удобное время.',
    },
    services: {
      cardio: {
        title: 'Кардиология',
        desc: 'Диагностика сердца и сосудов, ЭКГ, ЭхоКГ и холтеровское мониторирование.',
      },
      gyn: {
        title: 'Гинекология',
        desc: 'Консультация, УЗИ, лабораторные анализы и индивидуальный план лечения.',
      },
      neuro: {
        title: 'Неврология',
        desc: 'Головные боли, боли в спине, заболевания нервной системы и реабилитация.',
      },
      uro: {
        title: 'Урология',
        desc: 'Заболевания мочеполовой системы, УЗИ диагностика и персональный подход.',
      },
      uzi: {
        title: 'УЗИ диагностика',
        desc: 'Точные исследования внутренних органов, щитовидной железы, сердца и беременности.',
      },
      lab: {
        title: 'Лаборатория',
        desc: 'Анализы крови, мочи и другие исследования на современном оборудовании.',
      },
      lor: { title: 'ЛОР', desc: 'Осмотр, диагностика и лечение заболеваний уха, горла и носа.' },
      surgery: {
        title: 'Хирургия',
        desc: 'Лапароскопические, эндоскопические и другие современные операции.',
      },
      procto: {
        title: 'Проктология',
        desc: 'Деликатная медицинская помощь в комфортных и конфиденциальных условиях.',
      },
    },
    doctors: {
      shahlo: {
        name: 'Талипова Шахло Рахимджановна',
        role: 'Врач УЗИ',
        info: '8 лет опыта',
        details: ['Ташкентская медицинская академия'],
      },
      shahnozaxon: {
        name: 'Рахимова Шахнозахон Мухиддин кизи',
        role: 'PhD, доцент. Невролог. Превентивно-интегративный врач. Иглорефлексотерапевт.',
        info: '8 лет опыта',
        details: [
          'Дата рождения: 01.01.1993',
          'Место рождения: Ташкент',
          'Образование: бакалавриат Ташкентской медицинской академии, 3 года магистратуры, 3 года докторантуры',
          'Прием: понедельник - пятница, 09:00 - 14:00',
        ],
      },
      mahina: {
        name: 'Хидирова Махина Сохибовна',
        role: 'Гинеколог',
        info: '8 лет опыта',
        details: ['Ташкентский педиатрический медицинский институт'],
      },
      kamola: {
        name: 'Миракбарова Камола Абдусатторовна',
        role: 'Кардиолог, врач функциональной диагностики',
        info: '5 лет опыта',
        details: [
          'Направление: ЭхоКГ, Холтер мониторинг, СМАД, тредмил',
          'Дата рождения: 10.07.1991',
          'Место рождения: город Ташкент',
          'Образование: ТМА бакалавриат, РЦНПМЦК клиническая ординатура, ВМОИ переквалификация',
          'Прием: понедельник - пятница, 10:00 - 16:00',
        ],
      },
      nuridin: {
        name: 'Сарсенбаев Нуридин Бердимурадович',
        role: 'Врач-лаборант',
        info: '11 лет опыта',
        details: ['Прием: понедельник - суббота, 10:00 - 17:00'],
      },
      karimov: {
        name: 'Каримов Муроджон Фозилжонович',
        role: 'Уролог, врач УЗИ',
        info: '10 лет опыта',
        details: [
          'Дата рождения: 03.09.1990',
          'Место рождения: Хорезмская область',
          'Образование: бакалавриат 7 лет в Ургенчском филиале ТТА, клиническая ординатура 2 года в Ташкентском институте усовершенствования врачей',
          'Прием: понедельник, среда, пятница - 09:00 - 14:00',
          'Прием: вторник, четверг, суббота - 09:00 - 17:00',
        ],
      },
    },
    benefits: [
      'Первичный осмотр и анализ жалоб',
      'Назначение необходимых анализов и обследований',
      'Разбор результатов вместе с врачом',
      'План лечения, наблюдения и профилактики',
    ],
    branches: {
      kids: {
        name: 'Verum Clinic (филиал Учтепа)',
        address: 'улица Бешкайрагач, дом 54',
        description:
          'Современный медицинский филиал, специализирующийся на качественной помощи детям и подросткам. Опытные специалисты работают с индивидуальным подходом к каждому ребенку.',
      },
      clinic: {
        name: 'Verum Clinic (Шайхантахурский район)',
        address: 'улица Генерала Узакова, 43',
        description:
          'Клиника работает с августа 2020 года и оказывает услуги по урологии и гинекологии с современным подходом, точной диагностикой и эффективным лечением.',
      },
    },
    footer: {
      description:
        'VERUM Clinic - современный медицинский центр для диагностики, лечения и профилактики.',
      columns: [
        {
          title: 'Клиника',
          links: [
            { label: 'О нас', href: '#about' },
            { label: 'Врачи', href: '#doctors' },
            { label: 'Услуги', href: '#services' },
            { label: 'Преимущества', href: '#results' },
            { label: 'Филиалы', href: '#locations' },
          ],
        },
        {
          title: 'Услуги',
          links: [
            { label: 'Кардиология', href: '#services' },
            { label: 'Гинекология', href: '#services' },
            { label: 'Неврология', href: '#services' },
            { label: 'Урология', href: '#services' },
            { label: 'Лаборатория', href: '#services' },
          ],
        },
        {
          title: 'Пациентам',
          links: [
            { label: 'Запись на прием', href: '#contact' },
            { label: 'Результаты анализов', href: '#results' },
            { label: 'Цены', href: '#contact' },
            { label: 'Вопросы', href: '#contact' },
          ],
        },
      ],
      contactsTitle: 'Контакты',
      copyright: 'Все права защищены.',
    },
  },
  en: {
    langLabel: 'English',
    common: {
      appointment: 'Book an appointment',
      call: 'Call',
      chooseDepartment: 'Choose department',
      send: 'Send',
      name: 'Full name',
      phone: 'Phone number',
      department: 'Department',
      available: 'Appointments available',
      route: 'Open map',
      location: 'Location',
      showMap: 'Show on map',
      day: 'Day',
      night: 'Night',
    },
    nav: [
      { href: '#about', label: 'Clinic' },
      { href: '#services', label: 'Services' },
      { href: '#doctors', label: 'Doctors' },
      { href: '#results', label: 'Benefits' },
      { href: '#locations', label: 'Branches' },
      { href: '#contact', label: 'Contacts' },
    ],
    hero: {
      eyebrow: 'Modern medical center in Tashkent',
      title: 'VERUM Clinic: precise diagnostics, careful treatment, trusted results',
      text: 'Cardiology, gynecology, neurology, urology, ultrasound, laboratory and surgery in one place.',
      primaryAlt: 'VERUM Clinic building',
      secondaryAlt: 'VERUM Clinic facade',
      note: 'Images are not dimmed, so the clinic stays sharp and visible.',
    },
    statLabels: {
      doctors: 'qualified doctors',
      departments: 'medical departments',
      patients: 'happy patients',
      experience: 'years of experience',
    },
    sections: {
      aboutEyebrow: 'About clinic',
      aboutTitle: 'Comfortable for patients, precise for doctors',
      aboutText:
        'Consultation, lab tests, diagnostics and treatment are organized into a clear patient journey.',
      servicesEyebrow: 'Services',
      servicesTitle: 'Key medical departments',
      servicesText: 'Each department keeps diagnosis and treatment steps clear and easy to follow.',
      doctorsEyebrow: 'Specialists',
      doctorsTitle: 'Our doctors',
      doctorsText:
        'Experienced specialists provide individual care and a clear treatment plan for every patient.',
      resultsEyebrow: 'Benefits',
      resultsTitle: 'You leave the appointment with a clear next step',
      resultsText:
        'Patients receive test results, doctor recommendations and a practical treatment plan.',
      locationsEyebrow: 'Branches',
      locationsTitle: 'Two branches with clear location',
      locationsText: 'Choose a branch. The Yandex map below will show the selected address.',
      contactEyebrow: 'Contacts',
      contactTitle: 'Book an appointment',
      contactText:
        'Leave your details. An administrator will contact you and arrange a convenient time.',
    },
    services: {
      cardio: {
        title: 'Cardiology',
        desc: 'Heart and vascular diagnostics, ECG, echocardiography and Holter monitoring.',
      },
      gyn: {
        title: 'Gynecology',
        desc: 'Consultation, ultrasound, lab tests and an individual treatment plan for women.',
      },
      neuro: {
        title: 'Neurology',
        desc: 'Headaches, back pain, nervous system disorders and rehabilitation programs.',
      },
      uro: {
        title: 'Urology',
        desc: 'Urogenital diseases, ultrasound diagnostics and an individual treatment approach.',
      },
      uzi: {
        title: 'Ultrasound',
        desc: 'Accurate scans of internal organs, thyroid gland, heart and pregnancy.',
      },
      lab: {
        title: 'Laboratory',
        desc: 'Blood, urine and other tests performed with modern laboratory equipment.',
      },
      lor: {
        title: 'ENT',
        desc: 'Consultation, diagnosis and treatment of ear, nose and throat conditions.',
      },
      surgery: {
        title: 'Surgery',
        desc: 'Laparoscopic, endoscopic and other modern surgical procedures.',
      },
      procto: {
        title: 'Proctology',
        desc: 'Confidential and comfortable medical care for delicate conditions.',
      },
    },
    doctors: {
      shahlo: {
        name: 'Shahlo Talipova',
        role: 'Ultrasound doctor',
        info: '8 years of experience',
        details: ['Tashkent Medical Academy'],
      },
      shahnozaxon: {
        name: 'Shahnozaxon Rahimova',
        role: 'Neurologist, PhD, associate professor, preventive-integrative doctor, reflexologist',
        info: '8 years of experience',
        details: [
          'Date of birth: 01.01.1993',
          'Place of birth: Tashkent',
          'Education: Tashkent Medical Academy bachelor degree, 3 years of master studies, 3 years of doctoral studies',
          'Schedule: Monday - Friday, 09:00 - 14:00',
        ],
      },
      mahina: {
        name: 'Mahina Xidirova',
        role: 'Gynecologist',
        info: '8 years of experience',
        details: ['Tashkent Pediatric Medical Institute'],
      },
      kamola: {
        name: 'Kamola Mirakbarova',
        role: 'Cardiologist, functional diagnostics doctor',
        info: '5 years of experience',
        details: [
          'Focus: echocardiography, Holter monitoring, ABPM, treadmill test',
          'Date of birth: 10.07.1991',
          'Place of birth: Tashkent city',
          'Education: TMA bachelor degree, RCNPMCK clinical residency, VMOI retraining',
          'Schedule: Monday - Friday, 10:00 - 16:00',
        ],
      },
      nuridin: {
        name: 'Nuridin Sarsenbaev',
        role: 'Laboratory doctor',
        info: '11 years of experience',
        details: ['Schedule: Monday - Saturday, 10:00 - 17:00'],
      },
      karimov: {
        name: 'Murodjon Karimov',
        role: 'Urologist, ultrasound doctor',
        info: '10 years of experience',
        details: [
          'Date of birth: 03.09.1990',
          'Place of birth: Khorezm region',
          'Education: 7-year bachelor degree at TTA Urgench branch, 2-year clinical residency at Tashkent Institute for Advanced Medical Training',
          'Schedule: Monday, Wednesday, Friday - 09:00 - 14:00',
          'Schedule: Tuesday, Thursday, Saturday - 09:00 - 17:00',
        ],
      },
    },
    benefits: [
      'Initial consultation and symptom review',
      'Required lab or instrumental diagnostics',
      'Reviewing results together with the doctor',
      'Treatment, follow-up and prevention plan',
    ],
    branches: {
      kids: {
        name: 'Verum Clinic (Uchtepa branch)',
        address: "Beshqayrag'och street, 54",
        description:
          'A modern medical branch specializing in high-quality care for children and teenagers, with experienced specialists and an individual approach to every child.',
      },
      clinic: {
        name: 'Verum Clinic (Shaykhontohur district)',
        address: 'General Uzoqov street, 43',
        description:
          'Opened in August 2020, the clinic provides urology and gynecology care with modern methods, accurate diagnostics and effective treatment.',
      },
    },
    footer: {
      description:
        'VERUM Clinic is a modern medical center combining diagnostics, treatment and prevention.',
      columns: [
        {
          title: 'Clinic',
          links: [
            { label: 'About us', href: '#about' },
            { label: 'Doctors', href: '#doctors' },
            { label: 'Services', href: '#services' },
            { label: 'Benefits', href: '#results' },
            { label: 'Branches', href: '#locations' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'Cardiology', href: '#services' },
            { label: 'Gynecology', href: '#services' },
            { label: 'Neurology', href: '#services' },
            { label: 'Urology', href: '#services' },
            { label: 'Laboratory', href: '#services' },
          ],
        },
        {
          title: 'For patients',
          links: [
            { label: 'Appointment', href: '#contact' },
            { label: 'Test results', href: '#results' },
            { label: 'Prices', href: '#contact' },
            { label: 'FAQ', href: '#contact' },
          ],
        },
      ],
      contactsTitle: 'Contacts',
      copyright: 'All rights reserved.',
    },
  },
};

const dashboardData = {
  defaultLocale: 'uz',
  assets,
  shared,
  locales,
};

export default dashboardData;
