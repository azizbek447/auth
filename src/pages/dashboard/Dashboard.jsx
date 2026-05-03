import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  FaArrowRight,
  FaArrowUp,
  FaBars,
  FaBrain,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaFlask,
  FaHeartbeat,
  FaInstagram,
  FaMapMarkerAlt,
  FaMoon,
  FaMicroscope,
  FaPhoneAlt,
  FaShieldAlt,
  FaStethoscope,
  FaSun,
  FaTelegramPlane,
  FaTimes,
  FaUserMd,
  FaYoutube,
} from 'react-icons/fa';
import { MdLocalHospital, MdOutlineHealthAndSafety } from 'react-icons/md';

import dashboardData from '../../data/dashboardData.jsx';

const iconMap = {
  cardio: FaHeartbeat,
  gyn: MdOutlineHealthAndSafety,
  neuro: FaBrain,
  uro: FaUserMd,
  uzi: FaMicroscope,
  lab: FaFlask,
  lor: MdLocalHospital,
  surgery: FaStethoscope,
  procto: FaShieldAlt,
};

const serviceStyles = {
  cardio: 'bg-red-50 text-red-600',
  gyn: 'bg-pink-50 text-pink-600',
  neuro: 'bg-blue-50 text-blue-600',
  uro: 'bg-sky-50 text-sky-600',
  uzi: 'bg-emerald-50 text-emerald-600',
  lab: 'bg-violet-50 text-violet-600',
  lor: 'bg-amber-50 text-amber-600',
  surgery: 'bg-green-50 text-green-600',
  procto: 'bg-orange-50 text-orange-600',
};

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
  youtube: FaYoutube,
};

const socialClasses = {
  instagram:
    'border-transparent bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25',
  telegram: 'border-[#24A1DE] bg-[#24A1DE] text-white hover:shadow-lg hover:shadow-sky-500/25',
  facebook: 'border-[#1877F2] bg-[#1877F2] text-white hover:shadow-lg hover:shadow-blue-600/25',
  youtube: 'border-[#FF0000] bg-[#FF0000] text-white hover:shadow-lg hover:shadow-red-600/25',
};

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function SectionTitle({ eyebrow, title, text, align = 'center', tone = 'light' }) {
  const isCenter = align === 'center';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-slate-950';
  const textColor = tone === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={isCenter ? 'mx-auto mb-10 max-w-2xl text-center' : 'mb-8 max-w-2xl'}>
      <span className='mb-3 inline-flex rounded-md bg-sky-50 px-3 py-1 text-xs font-bold tracking-wide text-sky-700 uppercase'>
        {eyebrow}
      </span>
      <h2 className={`text-4xl leading-tight font-black md:text-5xl ${titleColor}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-7 ${textColor}`}>{text}</p>}
    </div>
  );
}

function Header({ locale, setLocale, t, assets, theme, setTheme, isDark }) {
  const [open, setOpen] = useState(false);
  const languages = Object.keys(dashboardData.locales);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur ${isDark ? 'border-white/10 bg-slate-950/88' : 'border-slate-200 bg-white/95'}`}
    >
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <a href='#' className='flex items-center gap-3' aria-label='VERUM Clinic'>
          <img src={assets.logo} alt='VERUM Clinic' className='h-10 w-auto object-contain' />
        </a>

        <nav className='hidden items-center gap-7 lg:flex'>
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-sky-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className='hidden items-center gap-3 lg:flex'>
          <div
            className={`flex rounded-full border p-1 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200'}`}
          >
            {languages.map((item) => (
              <button
                key={item}
                type='button'
                onClick={() => setLocale(item)}
                className={`h-8 rounded-full px-3 text-xs font-black uppercase transition ${
                  locale === item
                    ? 'bg-sky-600 text-white'
                    : isDark
                      ? 'text-slate-300 hover:bg-white/10'
                      : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type='button'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-black transition ${
              isDark
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                : 'border-slate-200 bg-white text-slate-800 hover:border-sky-300'
            }`}
          >
            {isDark ? <FaSun className='text-amber-300' /> : <FaMoon className='text-sky-700' />}
            {isDark ? t.common.day : t.common.night}
          </button>
          <a
            href={`tel:${dashboardData.shared.clinic.phone}`}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition hover:border-sky-300 hover:text-sky-600 ${
              isDark ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'
            }`}
          >
            <FaPhoneAlt className='text-sky-600' />
            {dashboardData.shared.clinic.phone}
          </a>
          <button
            type='button'
            onClick={scrollToContact}
            className='inline-flex h-10 items-center gap-2 rounded-full bg-red-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-red-700'
          >
            <FaCalendarCheck />
            {t.common.appointment}
          </button>
        </div>

        <button
          type='button'
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${isDark ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'}`}
          aria-label='Menu'
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div
          className={`border-t px-4 py-4 lg:hidden ${isDark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-white'}`}
        >
          <div className='mx-auto flex max-w-7xl flex-col gap-1'>
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-bold ${isDark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {item.label}
              </a>
            ))}
            <div className='mt-3 flex rounded-md border border-slate-200 p-1'>
              {languages.map((item) => (
                <button
                  key={item}
                  type='button'
                  onClick={() => setLocale(item)}
                  className={`h-9 flex-1 rounded text-xs font-black uppercase ${
                    locale === item ? 'bg-slate-950 text-white' : 'text-slate-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type='button'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-md border text-sm font-black ${
                isDark ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'
              }`}
            >
              {isDark ? <FaSun /> : <FaMoon />}
              {isDark ? t.common.day : t.common.night}
            </button>
            <button
              type='button'
              onClick={() => {
                setOpen(false);
                scrollToContact();
              }}
              className='mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-sm font-bold text-white'
            >
              <FaCalendarCheck />
              {t.common.appointment}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ t, assets, stats, isDark }) {
  return (
    <section className={`overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className='mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8'>
        <div className='relative z-10'>
          <span
            className={`mb-5 inline-flex rounded-full px-4 py-2 text-xs font-black tracking-wide uppercase ${isDark ? 'bg-sky-400/10 text-sky-200 ring-1 ring-sky-300/20' : 'bg-sky-50 text-sky-700'}`}
          >
            {t.hero.eyebrow}
          </span>
          <h1
            className={`max-w-3xl text-4xl leading-tight font-black sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-slate-950'}`}
          >
            {t.hero.title}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.hero.text}
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={scrollToContact}
              className='inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700'
            >
              <FaCalendarCheck />
              {t.common.appointment}
            </button>
            <a
              href={`tel:${dashboardData.shared.clinic.phone}`}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-black transition hover:border-sky-400 hover:text-sky-600 ${
                isDark ? 'border-white/15 text-white' : 'border-slate-300 text-slate-800'
              }`}
            >
              <FaPhoneAlt />
              {dashboardData.shared.clinic.phone}
            </a>
          </div>

          <dl className='mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4'>
            {stats.map((item) => (
              <div
                key={item.key}
                className={`rounded-2xl border p-4 backdrop-blur ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}
              >
                <dt className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {item.value}
                </dt>
                <dd
                  className={`mt-1 text-xs leading-5 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                >
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='relative'>
          <div
            className={`overflow-hidden rounded-[2.25rem] border shadow-2xl ${isDark ? 'border-white/10 bg-white/5 shadow-black/40' : 'border-white bg-white shadow-slate-200/90'}`}
          >
            <img
              src={assets.hero.primary}
              alt={t.hero.primaryAlt}
              className='h-[360px] w-full object-cover object-center sm:h-[500px] lg:h-[610px]'
              fetchPriority='high'
              decoding='async'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ t, stats, isDark }) {
  return (
    <section id='about' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
          <SectionTitle
            align='left'
            tone={isDark ? 'dark' : 'light'}
            eyebrow={t.sections.aboutEyebrow}
            title={t.sections.aboutTitle}
            text={t.sections.aboutText}
          />
          <div className='grid gap-4 sm:grid-cols-2'>
            {[
              {
                icon: FaMicroscope,
                title: t.sections.servicesTitle,
                text: t.sections.servicesText,
              },
              { icon: FaUserMd, title: t.sections.doctorsTitle, text: t.sections.doctorsText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border p-5 shadow-sm ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}
                >
                  <Icon className='mb-4 text-2xl text-sky-600' />
                  <h3 className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((item) => (
            <div
              key={item.key}
              className={`rounded-2xl border p-6 text-center shadow-sm ${isDark ? 'border-white/10 bg-white/5' : 'border-transparent bg-white'}`}
            >
              <div className='text-3xl font-black text-sky-700'>{item.value}</div>
              <div
                className={`mt-2 text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ t, services, isDark }) {
  return (
    <section id='services' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionTitle
          tone={isDark ? 'dark' : 'light'}
          eyebrow={t.sections.servicesEyebrow}
          title={t.sections.servicesTitle}
          text={t.sections.servicesText}
        />

        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {services.map((service) => {
            const Icon = iconMap[service.key];
            const style = serviceStyles[service.key];
            return (
              <article
                key={service.key}
                className={`group overflow-hidden rounded-3xl border shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  isDark
                    ? 'border-white/10 bg-white/5 hover:shadow-black/30'
                    : 'border-slate-200 bg-white hover:shadow-slate-200'
                }`}
              >
                <div className={`${style} flex h-44 items-center justify-center p-4`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className='h-full w-full object-contain object-center transition group-hover:scale-[1.03]'
                    loading='lazy'
                    decoding='async'
                  />
                </div>
                <div className='p-5'>
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md ${style}`}
                  >
                    <Icon className='text-xl' />
                  </div>
                  <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 min-h-[72px] text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {service.desc}
                  </p>
                  <button
                    type='button'
                    onClick={scrollToContact}
                    className='mt-5 inline-flex items-center gap-2 text-sm font-black text-sky-700 transition hover:text-red-600'
                  >
                    {t.common.appointment}
                    <FaArrowRight className='text-xs' />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Doctors({ t, doctors, isDark }) {
  return (
    <section id='doctors' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionTitle
          tone={isDark ? 'dark' : 'light'}
          eyebrow={t.sections.doctorsEyebrow}
          title={t.sections.doctorsTitle}
          text={t.sections.doctorsText}
        />

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 800, disableOnInteraction: false, pauseOnMouseEnter: false }}
          speed={650}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className='doctor-swiper !pb-12'
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.key} className='h-auto'>
              <article
                className={`relative h-[500px] overflow-hidden rounded-[2rem] border shadow-xl ${
                  isDark
                    ? 'border-white/10 bg-slate-900 shadow-black/30'
                    : 'border-white bg-white shadow-slate-200/90'
                }`}
              >
                <div className='absolute inset-0 bg-gradient-to-b from-sky-50 via-slate-100 to-sky-100'>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className='h-full w-full scale-110 object-cover object-top'
                    loading='lazy'
                    decoding='async'
                  />
                </div>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/86 to-transparent p-5 pt-24'>
                  <div className='mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-200 ring-1 ring-emerald-300/20'>
                    <FaCheckCircle />
                    {t.common.available}
                  </div>
                  <h3 className='text-lg leading-tight font-black text-white'>{doctor.name}</h3>
                  <p className='mt-1 text-sm font-semibold text-sky-200'>{doctor.role}</p>
                  <p className='mt-2 text-sm text-slate-300'>{doctor.info}</p>
                  <button
                    type='button'
                    onClick={scrollToContact}
                    className='mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700'
                  >
                    <FaCalendarCheck />
                    {t.common.appointment}
                  </button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Results({ t, isDark }) {
  return (
    <section id='results' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8'>
        <div>
          <SectionTitle
            align='left'
            tone={isDark ? 'dark' : 'light'}
            eyebrow={t.sections.resultsEyebrow}
            title={t.sections.resultsTitle}
            text={t.sections.resultsText}
          />
          <button
            type='button'
            onClick={scrollToContact}
            className='inline-flex h-12 items-center justify-center gap-2 rounded-md bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700'
          >
            <FaCalendarCheck />
            {t.common.appointment}
          </button>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {t.benefits.map((item, index) => (
            <div
              key={item}
              className={`rounded-2xl border p-5 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}
            >
              <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-black text-white'>
                {index + 1}
              </div>
              <p
                className={`text-base leading-7 font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations({ t, branches, selectedBranch, onBranchSelect, isDark }) {
  const activeBranch = branches.find((branch) => branch.key === selectedBranch) ?? branches[0];

  return (
    <section id='locations' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionTitle
          tone={isDark ? 'dark' : 'light'}
          eyebrow={t.sections.locationsEyebrow}
          title={t.sections.locationsTitle}
          text={t.sections.locationsText}
        />

        <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='grid gap-4'>
            {branches.map((branch) => {
              const active = branch.key === activeBranch.key;

              return (
                <button
                  key={branch.key}
                  type='button'
                  onClick={() => onBranchSelect(branch.key, false)}
                  className={`grid gap-4 rounded-[1.8rem] border p-3 text-left transition sm:grid-cols-[220px_1fr] ${
                    active
                      ? 'border-sky-400 bg-sky-50 shadow-xl shadow-sky-100'
                      : isDark
                        ? 'border-white/10 bg-white/5 hover:bg-white/10'
                        : 'border-slate-200 bg-white hover:border-sky-200'
                  }`}
                >
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className='h-52 w-full rounded-[1.25rem] object-cover object-center sm:h-full'
                  />
                  <span className='flex flex-col justify-center p-2'>
                    <span
                      className={`text-2xl font-black ${active || !isDark ? 'text-slate-950' : 'text-white'}`}
                    >
                      {branch.name}
                    </span>
                    <span
                      className={`mt-2 text-sm leading-6 font-semibold ${active || !isDark ? 'text-slate-600' : 'text-slate-300'}`}
                    >
                      {branch.description}
                    </span>
                    <span
                      className={`mt-4 flex items-start gap-2 text-sm font-black ${active ? 'text-sky-700' : isDark ? 'text-sky-300' : 'text-sky-700'}`}
                    >
                      <FaMapMarkerAlt className='mt-1 shrink-0' />
                      {branch.address}
                    </span>
                    <span className='mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white'>
                      {t.common.showMap}
                      <FaArrowRight />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? 'border-white/10 bg-white/5 shadow-black/30' : 'border-white bg-white shadow-slate-200/90'}`}
          >
            <div className='flex flex-wrap items-center justify-between gap-4 p-5'>
              <div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {activeBranch.name}
                </h3>
                <p
                  className={`mt-1 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  {activeBranch.address}
                </p>
              </div>
              <a
                href={activeBranch.mapUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-sky-700'
              >
                <FaMapMarkerAlt />
                {t.common.route}
              </a>
            </div>
            <iframe
              key={activeBranch.key}
              src={activeBranch.mapEmbed}
              title={activeBranch.name}
              width='100%'
              height='430'
              frameBorder='0'
              allowFullScreen
              loading='lazy'
              className='block border-t border-slate-200'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, isDark }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '' });
  const [sent, setSent] = useState(false);
  const clinic = dashboardData.shared.clinic;

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '', service: '' });
    }, 3500);
  }

  return (
    <section id='contact' className={`py-16 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
      <div className='mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8'>
        <div className='rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-black/20 sm:p-8'>
          <SectionTitle
            align='left'
            tone='dark'
            eyebrow={t.sections.contactEyebrow}
            title={t.sections.contactTitle}
            text={t.sections.contactText}
          />
          <div className='space-y-4 text-sm'>
            <a
              href={`tel:${clinic.phone}`}
              className='flex items-start gap-3 rounded-md bg-white/10 p-4 transition hover:bg-white/15'
            >
              <FaPhoneAlt className='mt-1 text-sky-300' />
              <span>
                <strong className='block text-white'>{clinic.phone}</strong>
                <span className='text-slate-300'>{t.common.call}</span>
              </span>
            </a>
            <a
              href={clinic.mapUrl}
              target='_blank'
              rel='noreferrer'
              className='flex items-start gap-3 rounded-md bg-white/10 p-4 transition hover:bg-white/15'
            >
              <FaMapMarkerAlt className='mt-1 text-sky-300' />
              <span>
                <strong className='block text-white'>{clinic.address}</strong>
                <span className='text-slate-300'>{t.common.route}</span>
              </span>
            </a>
            <div className='flex items-start gap-3 rounded-md bg-white/10 p-4'>
              <FaClock className='mt-1 text-sky-300' />
              <span>
                <strong className='block text-white'>{clinic.hours}</strong>
                <span className='text-slate-300'>Dushanba - Shanba</span>
              </span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-[2rem] border p-6 shadow-xl sm:p-8 ${isDark ? 'border-white/10 bg-white/5 shadow-black/30' : 'border-slate-200 bg-white shadow-slate-200/70'}`}
        >
          {sent ? (
            <div className='flex min-h-[390px] flex-col items-center justify-center text-center'>
              <FaCheckCircle className='mb-5 text-6xl text-emerald-600' />
              <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {t.common.send}
              </h3>
              <p
                className={`mt-3 max-w-md text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {t.sections.contactText}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='grid gap-4'>
              <label className='grid gap-2'>
                <span
                  className={`text-sm font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                >
                  {t.common.name}
                </span>
                <input
                  required
                  type='text'
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className={`h-12 rounded-full border px-4 text-sm transition outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100 ${isDark ? 'border-white/10 bg-slate-950 text-white placeholder:text-slate-500' : 'border-slate-300 bg-white'}`}
                  placeholder={t.common.name}
                />
              </label>
              <label className='grid gap-2'>
                <span
                  className={`text-sm font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                >
                  {t.common.phone}
                </span>
                <input
                  required
                  type='tel'
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className={`h-12 rounded-full border px-4 text-sm transition outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100 ${isDark ? 'border-white/10 bg-slate-950 text-white placeholder:text-slate-500' : 'border-slate-300 bg-white'}`}
                  placeholder='+998 __ ___ __ __'
                />
              </label>
              <label className='grid gap-2'>
                <span
                  className={`text-sm font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                >
                  {t.common.department}
                </span>
                <select
                  required
                  value={form.service}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, service: event.target.value }))
                  }
                  className={`h-12 rounded-full border px-4 text-sm transition outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100 ${isDark ? 'border-white/10 bg-slate-950 text-white' : 'border-slate-300 bg-white'}`}
                >
                  <option value=''>{t.common.chooseDepartment}</option>
                  {dashboardData.shared.serviceKeys.map((key) => (
                    <option key={key} value={t.services[key].title}>
                      {t.services[key].title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type='submit'
                className='mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700'
              >
                <FaCalendarCheck />
                {t.common.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ t, assets, isDark }) {
  const clinic = dashboardData.shared.clinic;

  return (
    <footer className={`py-12 ${isDark ? 'bg-black text-white' : 'bg-slate-950 text-white'}`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[1.2fr_2fr_1fr]'>
          <div>
            <div className='inline-flex rounded-2xl bg-white p-3'>
              <img src={assets.logo} alt='VERUM Clinic' className='h-12 w-auto object-contain' />
            </div>
            <p className='mt-5 text-sm leading-7 text-slate-300'>{t.footer.description}</p>
            <div className='mt-5 flex gap-2'>
              {Object.entries(clinic.socials).map(([name, href]) => {
                const Icon = socialIcons[name];
                return (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition ${socialClasses[name]}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className='grid gap-8 sm:grid-cols-3'>
            {t.footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className='text-sm font-black tracking-wide text-white uppercase'>
                  {column.title}
                </h3>
                <div className='mt-4 grid gap-3'>
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className='text-left text-sm font-semibold text-slate-400 transition hover:text-sky-300'
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className='text-sm font-black tracking-wide text-white uppercase'>
              {t.footer.contactsTitle}
            </h3>
            <div className='mt-4 grid gap-4 text-sm text-slate-300'>
              <a href={`tel:${clinic.phone}`} className='flex gap-3 transition hover:text-sky-300'>
                <FaPhoneAlt className='mt-1 shrink-0' />
                <span>{clinic.phone}</span>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className='flex gap-3 transition hover:text-sky-300'
              >
                <FaEnvelope className='mt-1 shrink-0' />
                <span>{clinic.email}</span>
              </a>
              <a
                href={clinic.mapUrl}
                target='_blank'
                rel='noreferrer'
                className='flex gap-3 transition hover:text-sky-300'
              >
                <FaMapMarkerAlt className='mt-1 shrink-0' />
                <span>{clinic.address}</span>
              </a>
              <div className='flex gap-3'>
                <FaClock className='mt-1 shrink-0' />
                <span>{clinic.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 border-t border-white/10 pt-6 text-sm text-slate-500'>
          © 2026 VERUM Clinic. {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

export default function Dashboard() {
  const [locale, setLocale] = useState(dashboardData.defaultLocale);
  const [theme, setTheme] = useState('light');
  const [selectedBranch, setSelectedBranch] = useState(dashboardData.shared.branches[0].key);
  const t = dashboardData.locales[locale];
  const assets = dashboardData.assets;
  const isDark = theme === 'dark';

  const stats = useMemo(
    () =>
      dashboardData.shared.stats.map((item) => ({
        ...item,
        label: t.statLabels[item.key],
      })),
    [t]
  );

  const services = useMemo(
    () =>
      dashboardData.shared.serviceKeys.map((key) => ({
        key,
        ...t.services[key],
        image: assets.services[key],
      })),
    [assets.services, t]
  );

  const doctors = useMemo(
    () =>
      dashboardData.shared.doctorKeys.map((key) => ({
        key,
        ...t.doctors[key],
        image: assets.doctors[key],
      })),
    [assets.doctors, t]
  );

  const branches = useMemo(
    () =>
      dashboardData.shared.branches.map((branch) => ({
        ...branch,
        ...t.branches[branch.key],
        image: assets.hero[branch.image],
      })),
    [assets.hero, t]
  );

  function handleBranchSelect(key, scroll = true) {
    setSelectedBranch(key);
    if (scroll) {
      window.setTimeout(() => scrollToSection('#locations'), 50);
    }
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
    >
      <style>{`
        .doctor-swiper .swiper-button-next,
        .doctor-swiper .swiper-button-prev {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #0369a1;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
        }
        .doctor-swiper .swiper-button-next::after,
        .doctor-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 900;
        }
        .doctor-swiper .swiper-pagination-bullet {
          background: #0284c7;
          opacity: 0.35;
        }
        .doctor-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 22px;
          border-radius: 999px;
        }
      `}</style>
      <Header
        locale={locale}
        setLocale={setLocale}
        t={t}
        assets={assets}
        theme={theme}
        setTheme={setTheme}
        isDark={isDark}
      />
      <main>
        <Hero t={t} assets={assets} stats={stats} isDark={isDark} />
        <About t={t} stats={stats} isDark={isDark} />
        <Services t={t} services={services} isDark={isDark} />
        <Doctors t={t} doctors={doctors} isDark={isDark} />
        <Results t={t} isDark={isDark} />
        <Locations
          t={t}
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchSelect={handleBranchSelect}
          isDark={isDark}
        />
        <Contact t={t} isDark={isDark} />
      </main>
      <Footer t={t} assets={assets} isDark={isDark} />
      <button
        type='button'
        onClick={scrollToTop}
        className={`fixed right-5 bottom-24 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-xl transition hover:-translate-y-1 ${
          isDark
            ? 'border-white/10 bg-white/10 text-white shadow-black/30 hover:bg-white/15'
            : 'border-slate-200 bg-white text-slate-800 shadow-slate-300/70 hover:text-sky-700'
        }`}
        aria-label='Yuqoriga chiqish'
      >
        <FaArrowUp />
      </button>
      <button
        type='button'
        onClick={scrollToContact}
        className='fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-md bg-red-600 text-white shadow-xl shadow-red-950/30 transition hover:bg-red-700'
        aria-label={t.common.appointment}
      >
        <FaCalendarCheck className='text-xl' />
      </button>
    </div>
  );
}
