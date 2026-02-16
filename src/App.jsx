import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import backgroundVisual from './assets/background.png'
import logo from './assets/logo.png'
import './App.css'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.API_URL

const TRANSLATIONS = {
  en: {
    landing: {
      hero: {
        titlePrefix: 'Celebrate Eid with',
        titleHighlight: 'Surprise Rewards',
        subtitle:
          'Join our special Eid ul-Fitr reward program. We will randomly select lucky participants to win premium smartphones and exciting cash prizes.',
      },
      prizes: {
        title: 'Grand Rewards',
        iphoneLine: 'winners will receive an',
        samsungLine: 'winners will receive a',
        cashLine: 'winners will receive cash prizes between ৳3,000 – ৳20,000',
      },
      imageAlt: 'Eid rewards celebration',
      countdown: {
        openTitle: 'Draw Countdown',
        closedTitle: 'Draw in Progress',
        subtitle: 'The winners will be selected on Eid ul-Fitr.',
        closedLine1: 'Entries are closed.',
        closedLine2: 'Winners will be announced shortly.',
      },
      cta: 'Place your position',
      sim: {
        title: 'Preview a Random Draw',
        desc: 'Curious how the winners list might look? Use the simulator below to generate a sample set of winners. This is only a visual example.',
        show: 'Simulate Sample Draw',
        hide: 'Hide Sample Winners',
        iphoneTitle: 'iPhone 15 Winners (10)',
        samsungTitle: 'Samsung S23 Winners (5)',
        cashTitle: 'Cash Prize Winners (10)',
      },
      faq: {
        title: 'Frequently Asked Questions',
        q1: 'Who is eligible to participate?',
        a1: 'You can define your own eligibility rules here. For example, participants must be 18+ and residents of Bangladesh with a valid mobile number.',
        q2: 'How are winners selected?',
        a2: 'Winners should be selected using a fair, random process. This UI simply demonstrates how results could be displayed.',
        q3: 'When will winners be announced?',
        a3: 'Typically on the day of Eid ul-Fitr or shortly after. You can update the copy and countdown date to match your actual plan.',
        q4: 'Is this the final design?',
        a4: 'No. This is a starting point. You can extend it with real authentication, dashboards, multi-language support, or admin tools.',
      },
    },
    how: {
      title: 'How It Works',
      s1Title: 'Register your interest',
      s1Body: 'Share your basic details so we can reach you if you are selected as a winner.',
      s2Title: 'Wait for the Eid draw',
      s2Body: 'All valid entries will be included in a fair and transparent random selection.',
      s3Title: 'Check the winners list',
      s3Body: 'We will publish the list of selected winners and notify them via SMS and email.',
    },
    register: {
      hero: {
        title: 'Register for Eid Rewards',
        subtitle:
          'Share your details to place your position in the Eid ul-Fitr lottery. Winners will be contacted directly if selected.',
      },
      info: {
        title: 'Before you continue',
        body:
          'Please ensure your mobile number and name are correct. This information will be used to verify your identity if you are selected as a winner.',
        b1: 'Your details are used only for the Eid reward campaign.',
        b2: 'Each person should register with one mobile number.',
        b3: 'Keep an eye on SMS and email near Eid for winner announcements.',
        back: 'Back to rewards overview',
      },
      form: {
        title: 'Registration details',
        subtitle: 'This is a demo interface only. No real data is collected.',
        name: 'Full name',
        namePh: 'e.g. Md. Rahim Uddin',
        phone: 'Mobile number',
        phonePh: 'e.g. +8801XXXXXXXXX',
        email: 'Email address (optional)',
        emailPh: 'e.g. you@example.com',
        city: 'City',
        cityPh: 'e.g. Dhaka',
        checkboxPrefix: 'I confirm that my information is accurate and I agree to the',
        terms: 'terms & conditions',
        checkboxSuffix: 'of this Eid reward campaign.',
        submit: 'Submit registration',
        note: 'You can refine the copy and connect this form to your real backend or CRM when you are ready.',
      },
    },
    common: {
      ten: '10',
      five: '5',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      registrationClosed: 'Registration Closed',
      demoAlert: 'Thank you for your interest! Your registration has been submitted.',
    },
    footer: {
      copyright: '© {{year}} Eid ul-Fitr Rewards Campaign',
      note:
        'Built as a demo landing and registration experience in React. Customize the copy, design, and behavior to match your brand.',
    },
    lang: {
      aria: 'Language selector',
    },
  },
  bn: {
    landing: {
      hero: {
        titlePrefix: 'ঈদ উদযাপন করুন',
        titleHighlight: 'সারপ্রাইজ রিওয়ার্ডে',
        subtitle:
          'আসন্ন ঈদুল ফিতর উপলক্ষে আমাদের রিওয়ার্ড প্রোগ্রামে অংশ নিন। র‍্যান্ডমভাবে নির্বাচিত সৌভাগ্যবান অংশগ্রহণকারীরা জিততে পারেন প্রিমিয়াম স্মার্টফোন এবং আকর্ষণীয় নগদ পুরস্কার।',
      },
      prizes: {
        title: 'পুরস্কারসমূহ',
        iphoneLine: 'জন পাবেন',
        samsungLine: 'জন পাবেন',
        cashLine: 'জন পাবেন ৳৩,০০০ – ৳২০,০০০ পর্যন্ত নগদ পুরস্কার',
      },
      imageAlt: 'ঈদ রিওয়ার্ড উদযাপন',
      countdown: {
        openTitle: 'ড্র কাউন্টডাউন',
        closedTitle: 'ড্র চলছে',
        subtitle: 'বিজয়ীদের নির্বাচন হবে ঈদুল ফিতরে।',
        closedLine1: 'রেজিস্ট্রেশন বন্ধ।',
        closedLine2: 'শিগগিরই বিজয়ীদের ঘোষণা করা হবে।',
      },
      cta: 'আপনার অবস্থান নিশ্চিত করুন',
      sim: {
        title: 'র‍্যান্ডম ড্র প্রিভিউ',
        desc: 'বিজয়ীদের তালিকা কেমন হতে পারে জানতে চান? নিচের সিমুলেটর দিয়ে একটি স্যাম্পল বিজয়ী তালিকা তৈরি করুন। এটি শুধু একটি উদাহরণ।',
        show: 'স্যাম্পল ড্র দেখুন',
        hide: 'স্যাম্পল লুকান',
        iphoneTitle: 'iPhone 15 বিজয়ী (১০)',
        samsungTitle: 'Samsung S23 বিজয়ী (৫)',
        cashTitle: 'নগদ পুরস্কার বিজয়ী (১০)',
      },
      faq: {
        title: 'প্রশ্নোত্তর',
        q1: 'কারা অংশ নিতে পারবেন?',
        a1: 'আপনি আপনার যোগ্যতার নিয়ম নির্ধারণ করতে পারেন। উদাহরণস্বরূপ, অংশগ্রহণকারীর বয়স ১৮+ হতে পারে এবং বাংলাদেশে বসবাসকারী বৈধ মোবাইল নম্বর থাকতে পারে।',
        q2: 'বিজয়ী কীভাবে নির্বাচন করা হবে?',
        a2: 'বিজয়ীদের ন্যায্য ও র‍্যান্ডম প্রক্রিয়ায় নির্বাচন করা উচিত। এই UI শুধু ফলাফল প্রদর্শনের একটি ডেমো।',
        q3: 'কখন বিজয়ীদের ঘোষণা করা হবে?',
        a3: 'সাধারণত ঈদুল ফিতরের দিন বা তার কিছু পর। আপনার পরিকল্পনা অনুযায়ী কপিরাইটিং ও কাউন্টডাউন তারিখ আপডেট করতে পারবেন।',
        q4: 'এটাই কি চূড়ান্ত ডিজাইন?',
        a4: 'না। এটি একটি শুরু। আপনি চাইলে বাস্তব অথেনটিকেশন, ড্যাশবোর্ড, মাল্টি-ল্যাঙ্গুয়েজ সাপোর্ট বা অ্যাডমিন টুল যোগ করতে পারেন।',
      },
    },
    how: {
      title: 'কীভাবে কাজ করবে',
      s1Title: 'রেজিস্ট্রেশন করুন',
      s1Body: 'আপনার মৌলিক তথ্য দিন যেন বিজয়ী হলে আমরা যোগাযোগ করতে পারি।',
      s2Title: 'ঈদের ড্র’র জন্য অপেক্ষা করুন',
      s2Body: 'সকল বৈধ এন্ট্রি ন্যায্য ও স্বচ্ছভাবে র‍্যান্ডম সিলেকশনে অন্তর্ভুক্ত হবে।',
      s3Title: 'বিজয়ী তালিকা দেখুন',
      s3Body: 'আমরা নির্বাচিত বিজয়ীদের তালিকা প্রকাশ করব এবং SMS ও ইমেইলে জানাব।',
    },
    register: {
      hero: {
        title: 'ঈদ রিওয়ার্ডে রেজিস্ট্রেশন',
        subtitle:
          'ঈদুল ফিতরের লটারিতে আপনার অবস্থান নিশ্চিত করতে তথ্য দিন। নির্বাচিত হলে বিজয়ীদের সাথে সরাসরি যোগাযোগ করা হবে।',
      },
      info: {
        title: 'রেজিস্ট্রেশনের আগে',
        body:
          'আপনার মোবাইল নম্বর ও নাম সঠিক আছে কিনা নিশ্চিত করুন। বিজয়ী হলে পরিচয় যাচাইয়ে এই তথ্য ব্যবহার করা হবে।',
        b1: 'আপনার তথ্য শুধুমাত্র এই রিওয়ার্ড ক্যাম্পেইনের জন্য ব্যবহৃত হবে।',
        b2: 'একজনের জন্য একটি মোবাইল নম্বর ব্যবহার করুন।',
        b3: 'ঈদের সময় বিজয়ী ঘোষণার জন্য SMS/ইমেইল নজরে রাখুন।',
        back: 'রিওয়ার্ড পেজে ফিরুন',
      },
      form: {
        title: 'আপনার তথ্য দিন',
        subtitle: 'এটি শুধুমাত্র ডেমো। কোনো বাস্তব তথ্য সংরক্ষণ করা হয় না।',
        name: 'পূর্ণ নাম',
        namePh: 'যেমন: মোঃ রহিম উদ্দিন',
        phone: 'মোবাইল নম্বর',
        phonePh: 'যেমন: +8801XXXXXXXXX',
        email: 'ইমেইল (ঐচ্ছিক)',
        emailPh: 'যেমন: you@example.com',
        city: 'শহর',
        cityPh: 'যেমন: ঢাকা',
        checkboxPrefix: 'আমি নিশ্চিত করছি যে আমার তথ্য সঠিক এবং আমি',
        terms: 'শর্তাবলীতে',
        checkboxSuffix: 'সম্মত।',
        submit: 'রেজিস্ট্রেশন সাবমিট করুন',
        note: 'পরবর্তীতে আপনি এই ফর্মটি আপনার বাস্তব ব্যাকএন্ড/CRM-এর সাথে যুক্ত করতে পারবেন।',
      },
    },
    common: {
      ten: '১০',
      five: '৫',
      days: 'দিন',
      hours: 'ঘণ্টা',
      minutes: 'মিনিট',
      seconds: 'সেকেন্ড',
      registrationClosed: 'রেজিস্ট্রেশন বন্ধ',
      demoAlert: 'ধন্যবাদ! আপনার রেজিস্ট্রেশন গ্রহণ করা হয়েছে।',
    },
    footer: {
      copyright: '© {{year}} ঈদুল ফিতর রিওয়ার্ডস ক্যাম্পেইন',
      note:
        'React দিয়ে তৈরি ডেমো ল্যান্ডিং ও রেজিস্ট্রেশন অভিজ্ঞতা। আপনার ব্র্যান্ড অনুযায়ী কপি, ডিজাইন ও আচরণ কাস্টমাইজ করুন।',
    },
    lang: {
      aria: 'ভাষা নির্বাচন',
    },
  },
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj)
}

function interpolate(template, vars) {
  if (!vars) return template
  return Object.entries(vars).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value))
  }, template)
}

function detectInitialLang() {
  try {
    const saved = localStorage.getItem('reward.lang')
    if (saved === 'en' || saved === 'bn') return saved
  } catch {
    // ignore
  }
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('bn')) return 'bn'
  return 'en'
}

const I18nContext = createContext(null)
const AdsContext = createContext(false)

function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

function useAdsReady() {
  return useContext(AdsContext)
}

function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)

  useEffect(() => {
    try {
      localStorage.setItem('reward.lang', lang)
    } catch {
      // ignore
    }
    try {
      document.documentElement.lang = lang === 'bn' ? 'bn' : 'en'
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(() => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en

    function t(key, vars) {
      const raw = getByPath(dict, key) ?? getByPath(TRANSLATIONS.en, key) ?? key
      if (typeof raw !== 'string') return String(raw)
      return interpolate(raw, vars)
    }

    function formatNumber(n) {
      try {
        return Number(n).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')
      } catch {
        return String(n)
      }
    }

    function formatTaka(amount) {
      return `৳${formatNumber(amount)}`
    }

    return { lang, setLang, t, formatNumber, formatTaka }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

function AdsProvider({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setReady(true)
      try {
        window.__rewardAdsReady = true
      } catch {
        // ignore
      }
    }, 10000)
    return () => clearTimeout(id)
  }, [])

  return <AdsContext.Provider value={ready}>{children}</AdsContext.Provider>
}

function LanguageFab() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="eid-lang-fab" role="group" aria-label={t('lang.aria')}>
      <button
        type="button"
        className={`eid-lang-btn ${lang === 'bn' ? 'active' : ''}`}
        onClick={() => setLang('bn')}
      >
        BN
      </button>
      <button
        type="button"
        className={`eid-lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  )
}

function ExternalAdBanner() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://pl28725580.effectivegatecpm.com/a2ad2cb224d33a599f1352939b49a71c/invoke.js"]',
    )
    if (existing) {
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://pl28725580.effectivegatecpm.com/a2ad2cb224d33a599f1352939b49a71c/invoke.js'
    script.setAttribute('data-cfasync', 'false')

    document.body.appendChild(script)
  }, [])

  return (
    <div className="eid-ad eid-ad-external">
      <div id="container-a2ad2cb224d33a599f1352939b49a71c" />
    </div>
  )
}

function SmallAdBanner() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const configScript = document.createElement('script')
    configScript.type = 'text/javascript'
    configScript.innerHTML = `
      atOptions = {
        key: 'a79ca5cae524a0344342663cbdc27377',
        format: 'iframe',
        height: 300,
        width: 160,
        params: {}
      };
    `

    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src =
      'https://www.highperformanceformat.com/a79ca5cae524a0344342663cbdc27377/invoke.js'
    invokeScript.async = true

    containerRef.current.appendChild(configScript)
    containerRef.current.appendChild(invokeScript)
  }, [containerRef])

  return (
    <div className="eid-ad eid-ad-small">
      <div ref={containerRef} />
    </div>
  )
}

function SocialBanner() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const existing = document.querySelector(
      'script[src="https://pl28725758.effectivegatecpm.com/47/9b/16/479b16e2ce28e46021b1c686265d5c5c.js"]',
    )
    if (existing) return

    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://pl28725758.effectivegatecpm.com/47/9b/16/479b16e2ce28e46021b1c686265d5c5c.js'

    containerRef.current.appendChild(script)
  }, [containerRef])

  return (
    <div className="eid-ad eid-ad-social">
      <div ref={containerRef} />
    </div>
  )
}

function PopunderLoader() {
  const adsReady = useAdsReady()

  useEffect(() => {
    if (!adsReady) return

    const existing = document.querySelector(
      'script[src="https://pl28725586.effectivegatecpm.com/69/68/72/696872d3d6a5290e810fee2cdb353f4f.js"]',
    )
    if (existing) return

    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://pl28725586.effectivegatecpm.com/69/68/72/696872d3d6a5290e810fee2cdb353f4f.js'

    document.body.appendChild(script)
  }, [adsReady])

  return null
}

function LandingPage() {
  const navigate = useNavigate()
  const { lang, t, formatNumber, formatTaka } = useI18n()
  const [now, setNow] = useState(new Date())
  const [showSimulatedDraw, setShowSimulatedDraw] = useState(false)

  // Target date for Eid ul-Fitr reward draw (adjust as needed)
  const drawDate = useMemo(
    () => new Date('2026-04-10T00:00:00+06:00'),
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeLeftMs = drawDate.getTime() - now.getTime()
  const isClosed = timeLeftMs <= 0

  const timeLeft = useMemo(() => {
    if (timeLeftMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const totalSeconds = Math.floor(timeLeftMs / 1000)
    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = totalSeconds % 60
    return { days, hours, minutes, seconds }
  }, [timeLeftMs])

  const simulatedWinners = useMemo(
    () => ({
      iphones: [
        'Ayesha Rahman',
        'Md. Farhan Ali',
        'Sara Hossain',
        'Imran Kabir',
        'Nabila Chowdhury',
        'Rafiul Hasan',
        'Sumaiya Akter',
        'Tanjim Ahmed',
        'Fariha Islam',
        'Nurul Amin',
      ],
      samsungs: [
        'Khaled Mahmud',
        'Jannat Ferdous',
        'Sajib Karim',
        'Lamia Nawar',
        'Shahriar Khan',
      ],
      cashPrizes: [
        { name: 'Rashed Uddin', amount: 3000 },
        { name: 'Mim Akter', amount: 5000 },
        { name: 'Tanvir Hasan', amount: 7000 },
        { name: 'Sadia Jahan', amount: 8000 },
        { name: 'Mahin Rahman', amount: 10000 },
        { name: 'Nusrat Nahar', amount: 12000 },
        { name: 'Sajid Ahmed', amount: 14000 },
        { name: 'Mehedi Hasan', amount: 15000 },
        { name: 'Anika Sultana', amount: 18000 },
        { name: 'Yasin Chowdhury', amount: 20000 },
      ],
    }),
    [],
  )

  return (
    <div className="eid-app">
      <header className="eid-hero">
        <div className="eid-brand">
          <Link className="eid-brand-link" to="/" aria-label="Reward BD home">
            <img className="eid-logo" src={logo} alt="Reward BD logo" />
          </Link>
        </div>
        <h1 className="eid-hero-title">
          {t('landing.hero.titlePrefix')}{' '}
          <span className="eid-highlight">{t('landing.hero.titleHighlight')}</span>
        </h1>
        <p className="eid-hero-subtitle">
          {t('landing.hero.subtitle')}
        </p>

        <div className="eid-hero-grid">
          <div className="eid-card primary">
            <h2>{t('landing.prizes.title')}</h2>
            <ul>
              <li>
                <strong>{t('common.ten')}</strong> {t('landing.prizes.iphoneLine')}{' '}
                <strong>iPhone 15</strong>
              </li>
              <li>
                <strong>{t('common.five')}</strong> {t('landing.prizes.samsungLine')}{' '}
                <strong>Samsung S23</strong>
              </li>
              <li>
                <strong>{t('common.ten')}</strong> {t('landing.prizes.cashLine')}
              </li>
            </ul>
          </div>

          <div className="eid-hero-visual-card">
            <div className="eid-hero-visual">
              <img src={backgroundVisual} alt={t('landing.imageAlt')} />
            </div>
            <div className="eid-card countdown-card">
              <h2>
                {isClosed ? t('landing.countdown.closedTitle') : t('landing.countdown.openTitle')}
              </h2>
              <p className="eid-card-subtitle">
                {t('landing.countdown.subtitle')}
              </p>
              {isClosed ? (
                <div className="eid-countdown-closed">
                  <span>{t('landing.countdown.closedLine1')}</span>
                  <span>{t('landing.countdown.closedLine2')}</span>
                </div>
              ) : (
                <div className="eid-countdown">
                  <div className="eid-countdown-item">
                    <span className="value">{formatNumber(timeLeft.days)}</span>
                    <span className="label">{t('common.days')}</span>
                  </div>
                  <div className="eid-countdown-item">
                    <span className="value">{formatNumber(timeLeft.hours)}</span>
                    <span className="label">{t('common.hours')}</span>
                  </div>
                  <div className="eid-countdown-item">
                    <span className="value">{formatNumber(timeLeft.minutes)}</span>
                    <span className="label">{t('common.minutes')}</span>
                  </div>
                  <div className="eid-countdown-item">
                    <span className="value">{formatNumber(timeLeft.seconds)}</span>
                    <span className="label">{t('common.seconds')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="eid-main">
        <ExternalAdBanner />

        <section className="eid-section eid-how-it-works">
          <h2>{t('how.title')}</h2>
          <div className="eid-steps">
            <div className="eid-step">
              <div className="step-number">1</div>
              <h3>{t('how.s1Title')}</h3>
              <p>{t('how.s1Body')}</p>
            </div>
            <div className="eid-step">
              <div className="step-number">2</div>
              <h3>{t('how.s2Title')}</h3>
              <p>{t('how.s2Body')}</p>
            </div>
            <div className="eid-step">
              <div className="step-number">3</div>
              <h3>{t('how.s3Title')}</h3>
              <p>{t('how.s3Body')}</p>
            </div>
          </div>
        </section>

        <SocialBanner />

        <section className="eid-section eid-form-section">
          <div className="eid-cta-only">
            <button
              type="button"
              className="eid-neon-button"
              disabled={isClosed}
              onClick={() => navigate('/register')}
            >
              {isClosed ? t('common.registrationClosed') : t('landing.cta')}
            </button>
            <PopunderLoader />
          </div>
        </section>

        <ExternalAdBanner />

        <section className="eid-section eid-simulate-section">
          <div className="eid-simulate-header">
            <h2>{t('landing.sim.title')}</h2>
            <p>{t('landing.sim.desc')}</p>
            <button
              type="button"
              className="eid-secondary-button"
              onClick={() => setShowSimulatedDraw((prev) => !prev)}
            >
              {showSimulatedDraw ? t('landing.sim.hide') : t('landing.sim.show')}
            </button>
          </div>

          {showSimulatedDraw && (
            <div className="eid-simulate-grid">
              <div className="eid-card">
                <h3>{t('landing.sim.iphoneTitle')}</h3>
                <ul className="eid-winner-list">
                  {simulatedWinners.iphones.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
              <div className="eid-card">
                <h3>{t('landing.sim.samsungTitle')}</h3>
                <ul className="eid-winner-list">
                  {simulatedWinners.samsungs.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
              <div className="eid-card">
                <h3>{t('landing.sim.cashTitle')}</h3>
                <ul className="eid-winner-list">
                  {simulatedWinners.cashPrizes.map((item) => (
                    <li key={item.name}>
                      {item.name} <span className="amount">{formatTaka(item.amount)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <ExternalAdBanner />

        <section className="eid-section eid-faq">
          <h2>{t('landing.faq.title')}</h2>
          <div className="eid-faq-grid">
            <div className="eid-faq-item">
              <h3>{t('landing.faq.q1')}</h3>
              <p>{t('landing.faq.a1')}</p>
            </div>
            <div className="eid-faq-item">
              <h3>{t('landing.faq.q2')}</h3>
              <p>{t('landing.faq.a2')}</p>
            </div>
            <div className="eid-faq-item">
              <h3>{t('landing.faq.q3')}</h3>
              <p>{t('landing.faq.a3')}</p>
            </div>
            <div className="eid-faq-item">
              <h3>{t('landing.faq.q4')}</h3>
              <p>{t('landing.faq.a4')}</p>
            </div>
          </div>
        </section>

        <ExternalAdBanner />
      </main>

      <footer className="eid-footer">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p className="eid-footer-note">
          {t('footer.note')}
        </p>
      </footer>
    </div>
  )
}

function RegisterPage() {
  const navigate = useNavigate()
  const { t, lang } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    if (!form) {
      return
    }
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name') ?? '',
      phone: formData.get('phone') ?? '',
      email: formData.get('email') ?? '',
      city: formData.get('city') ?? '',
      language: lang,
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`${API_BASE_URL}/api/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      form.reset()
      alert(t('common.demoAlert'))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to submit registration', error)
      alert('Sorry, something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="eid-app register-page">
      <header className="eid-hero eid-register-hero">
        <div className="eid-brand-row">
          <Link className="eid-brand-link" to="/" aria-label="Reward BD home">
            <img className="eid-logo" src={logo} alt="Reward BD logo" />
          </Link>
        </div>
        <h1 className="eid-hero-title">{t('register.hero.title')}</h1>
        <p className="eid-hero-subtitle">
          {t('register.hero.subtitle')}
        </p>
      </header>

      <main className="eid-main eid-register-main">
        <ExternalAdBanner />

        <section className="eid-section eid-register-layout">
          <div className="eid-register-info">
            <h2>{t('register.info.title')}</h2>
            <p>{t('register.info.body')}</p>
            <ul>
              <li>{t('register.info.b1')}</li>
              <li>{t('register.info.b2')}</li>
              <li>{t('register.info.b3')}</li>
            </ul>
            <button
              type="button"
              className="eid-secondary-button eid-back-button"
              onClick={() => navigate('/')}
            >
              {t('register.info.back')}
            </button>
          </div>

          <div className="eid-form-card eid-register-card">
            <h2>{t('register.form.title')}</h2>
            <p className="eid-card-subtitle">
              {t('register.form.subtitle')}
            </p>
            <form
              className="eid-form"
              onSubmit={handleSubmit}
            >
              <div className="eid-form-row">
                <label>
                  {t('register.form.name')}
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('register.form.namePh')}
                  />
                </label>
                <label>
                  {t('register.form.phone')}
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={t('register.form.phonePh')}
                  />
                </label>
              </div>
              <div className="eid-form-row">
                <label>
                  {t('register.form.email')}
                  <input
                    type="email"
                    name="email"
                    placeholder={t('register.form.emailPh')}
                  />
                </label>
              </div>
              <div className="eid-form-row">
                <label>
                  {t('register.form.city')}
                  <input type="text" name="city" placeholder={t('register.form.cityPh')} />
                </label>
              </div>
              <label className="eid-checkbox">
                <input type="checkbox" required />
                <span>
                  {t('register.form.checkboxPrefix')}{' '}
                  <strong>{t('register.form.terms')}</strong>{' '}
                  {t('register.form.checkboxSuffix')}
                </span>
              </label>
              <button type="submit" className="eid-primary-button">
                {isSubmitting ? 'Sending…' : t('register.form.submit')}
              </button>
              <p className="eid-disclaimer">
                {t('register.form.note')}
              </p>
            </form>
          </div>
        </section>

        <ExternalAdBanner />
        <SmallAdBanner />
        <SocialBanner />
      </main>

      <footer className="eid-footer">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p className="eid-footer-note">
          {t('footer.note')}
        </p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <I18nProvider>
      <AdsProvider>
        <LanguageFab />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AdsProvider>
    </I18nProvider>
  )
}

export default App
