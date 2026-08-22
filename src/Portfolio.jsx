import React, { useState, useEffect, useRef } from "react";
import { Github, Mail, ArrowUpRight } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.fs-root {
  --bg: #14171C;
  --panel: #1B2029;
  --panel-2: #20262F;
  --amber: #F2A93B;
  --amber-dim: #6E4A20;
  --blue: #6C93B8;
  --kraft: #C9A876;
  --green: #6FA97C;
  --text: #EDEFF2;
  --text-dim: #8C93A0;
  --line: #2A2F38;

  background: var(--bg);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  line-height: 1.6;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
.fs-root * { box-sizing: border-box; }
.fs-root a { color: inherit; text-decoration: none; }
.fs-root button { font-family: inherit; cursor: pointer; }
.fs-root :focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }

.fs-mono { font-family: 'IBM Plex Mono', monospace; }
.fs-display { font-family: 'Big Shoulders Display', sans-serif; }

/* ---------- Nav ---------- */
.fs-nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px;
  border-bottom: 1px solid var(--line);
  background: rgba(20, 23, 28, 0.85);
  backdrop-filter: blur(10px);
}
.fs-nav-logo {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 1px dashed var(--line);
  border-radius: 3px;
  color: var(--amber);
}
.fs-nav-links { display: flex; gap: 26px; align-items: center; }
.fs-nav-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  transition: color 0.2s ease;
}
.fs-nav-link:hover { color: var(--amber); }
.fs-nav-icon {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  border: 1px solid var(--line); border-radius: 4px;
  color: var(--text-dim); transition: all 0.2s ease;
}
.fs-nav-icon:hover { color: var(--amber); border-color: var(--amber-dim); }
@media (max-width: 720px) { .fs-nav-links .fs-nav-link { display: none; } }

/* ---------- Shared section chrome ---------- */
.fs-section { padding: 96px 28px; max-width: 1120px; margin: 0 auto; position: relative; }
.fs-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--amber);
  margin-bottom: 14px;
  display: inline-block;
}
.fs-section-title {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.9rem, 4vw, 2.9rem);
  line-height: 1;
  letter-spacing: 0.01em;
  margin: 0 0 20px 0;
}
.fs-section-head { max-width: 640px; margin-bottom: 52px; }
.fs-lead { color: var(--text-dim); font-size: 1.02rem; }

/* ---------- Reveal ---------- */
.fs-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fs-reveal.fs-in { opacity: 1; transform: none; }
.fs-print-reveal {
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  transform: translateY(-6px);
  transition: clip-path 0.75s cubic-bezier(.16,1,.3,1), opacity 0.5s ease, transform 0.75s cubic-bezier(.16,1,.3,1);
}
.fs-print-reveal.fs-in { clip-path: inset(0 0 0% 0); opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .fs-reveal, .fs-print-reveal { transition: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important; }
  .fs-led { animation: none !important; }
}

/* ---------- Hero ---------- */
.fs-hero {
  position: relative;
  padding: 64px 28px 80px;
  max-width: 1120px; margin: 0 auto;
  display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 56px;
  align-items: center;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 44px 44px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 55%, transparent 100%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 55%, transparent 100%);
}
@media (max-width: 900px) { .fs-hero { grid-template-columns: 1fr; } }

.fs-hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--amber);
  border: 1px dashed var(--amber-dim);
  padding: 6px 12px; border-radius: 3px;
  margin-bottom: 24px;
}
.fs-hero-tag .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--amber); }

.fs-hero-name {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(2.8rem, 7.5vw, 5.6rem);
  line-height: 0.92;
  letter-spacing: 0.005em;
  margin: 0 0 14px 0;
}
.fs-hero-title {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  font-weight: 600;
  color: var(--blue);
  margin: 0 0 18px 0;
}
.fs-hero-sub { max-width: 480px; color: var(--text-dim); margin-bottom: 32px; }

.fs-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.fs-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em;
  padding: 13px 20px; border-radius: 4px;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  border: 1px solid transparent;
}
.fs-btn-primary { background: var(--amber); color: #1A1305; font-weight: 600; }
.fs-btn-primary:hover { transform: translateY(-2px); }
.fs-btn-secondary { border-color: var(--line); color: var(--text); }
.fs-btn-secondary:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-2px); }

/* ---------- Status panel ---------- */
.fs-panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
}
.fs-panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px dashed var(--line);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--text-dim);
}
.fs-led { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: fs-pulse 2.2s ease-in-out infinite; }
@keyframes fs-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.fs-panel-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 13px 18px;
  border-bottom: 1px solid var(--line);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
}
.fs-panel-row:last-child { border-bottom: none; }
.fs-panel-row .k { color: var(--text-dim); }
.fs-panel-row .v { color: var(--text); text-align: right; }
.fs-panel-status { display: inline-flex; align-items: center; gap: 6px; color: var(--green); }
.fs-panel-status .fs-led { width: 6px; height: 6px; }

/* ---------- About ---------- */
.fs-about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; }
@media (max-width: 800px) { .fs-about-grid { grid-template-columns: 1fr; } }
.fs-facts { list-style: none; margin: 0; padding: 0; }
.fs-facts li {
  display: flex; gap: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  color: var(--text-dim);
}
.fs-facts li span.label { color: var(--kraft); min-width: 108px; flex-shrink: 0; }

/* ---------- Skills ---------- */
.fs-skill-group { margin-bottom: 30px; }
.fs-skill-group-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.14em;
  color: var(--text-dim); margin-bottom: 14px;
}
.fs-tag-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.fs-tag {
  position: relative;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  padding: 9px 14px 9px 22px;
  background: var(--panel);
  border: 1px dashed var(--line);
  border-radius: 3px;
  color: var(--text);
}
.fs-tag::before {
  content: '';
  position: absolute; left: 9px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--bg); border: 1px solid var(--line);
}

/* ---------- Projects ---------- */
.fs-filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; }
.fs-filter-chip {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em;
  padding: 9px 16px; border-radius: 20px;
  border: 1px solid var(--line); background: transparent; color: var(--text-dim);
  transition: all 0.2s ease;
}
.fs-filter-chip.active { background: var(--amber); color: #1A1305; border-color: var(--amber); font-weight: 600; }
.fs-filter-chip:not(.active):hover { border-color: var(--amber-dim); color: var(--amber); }

.fs-project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
.fs-project-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 22px 22px 0 22px;
  display: flex; flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.fs-project-card:hover { transform: translateY(-5px); border-color: var(--amber-dim); }
.fs-project-title { font-size: 1.08rem; font-weight: 700; margin: 0 0 8px 0; }
.fs-project-desc { color: var(--text-dim); font-size: 0.88rem; margin: 0 0 16px 0; flex-grow: 1; }
.fs-project-tech {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem; color: var(--blue);
  margin-bottom: 16px;
}
.fs-project-foot { border-top: 2px dashed var(--line); padding: 12px 0 14px; margin-top: auto; }
.fs-barcode {
  height: 24px;
  background: repeating-linear-gradient(
    to right,
    var(--text) 0 2px, transparent 2px 4px,
    var(--text) 4px 6px, transparent 6px 7px,
    var(--text) 7px 10px, transparent 10px 13px,
    var(--text) 13px 14px, transparent 14px 18px
  );
  opacity: 0.8;
}
.fs-barcode-label {
  display: flex; justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-dim); margin-top: 8px;
}

/* ---------- Timeline ---------- */
.fs-timeline { position: relative; padding-left: 28px; }
.fs-timeline::before {
  content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 0;
  border-left: 2px dashed var(--line);
}
.fs-timeline-item { position: relative; padding-bottom: 40px; }
.fs-timeline-item:last-child { padding-bottom: 0; }
.fs-timeline-dot {
  position: absolute; left: -28px; top: 4px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--bg); border: 2px solid var(--amber);
}
.fs-timeline-stamp {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--green); border: 1px solid var(--green);
  padding: 3px 9px; border-radius: 3px;
  transform: rotate(-4deg);
  margin-left: 12px;
}
.fs-timeline-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-dim); margin-bottom: 6px;
}
.fs-timeline-role { font-size: 1.05rem; font-weight: 700; margin: 0 0 2px 0; }
.fs-timeline-org { color: var(--blue); font-size: 0.9rem; margin-bottom: 8px; }
.fs-timeline-desc { color: var(--text-dim); font-size: 0.88rem; max-width: 560px; }

/* ---------- Contact ---------- */
.fs-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 700px) { .fs-contact-grid { grid-template-columns: 1fr; } }
.fs-contact-card {
  background: var(--panel); border: 1px solid var(--line); border-radius: 6px;
  padding: 26px; display: flex; flex-direction: column; gap: 14px;
  transition: border-color 0.2s ease;
}
.fs-contact-card:hover { border-color: var(--amber-dim); }
.fs-contact-label {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem;
  text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-dim);
}
.fs-contact-value {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 1.05rem; font-weight: 600;
}
.fs-contact-value:hover { color: var(--amber); }

/* ---------- Footer ---------- */
.fs-footer {
  border-top: 1px solid var(--line);
  padding: 24px 28px;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.05em;
  color: var(--text-dim);
  max-width: 1120px; margin: 0 auto;
}
`;

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, print = false, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`${print ? "fs-print-reveal" : "fs-reveal"} ${inView ? "fs-in" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

const SKILL_GROUPS = [
  { title: "Backend & Sunucu", items: ["Node.js", "Express", "ASP.NET Core", "PM2", "REST API"] },
  { title: "Arayüz", items: ["React", "Vite", "JavaScript", "HTML / CSS"] },
  { title: "Veritabanı & ERP", items: ["PostgreSQL", "MSSQL", "SAP Business One"] },
  { title: "Altyapı & Entegrasyon", items: ["Git / GitHub", "Windows Server", "Telegram Bot API", "ESP8266", "Office 365 SMTP"] },
];

const CATEGORIES = ["Tümü", "ERP & SAP", "Web Uygulama", "IoT"];

const PROJECTS = [
  {
    code: "PLT-01",
    title: "ITAM — BT Envanter Sistemi",
    categories: ["ERP & SAP", "Web Uygulama"],
    desc: "Personel portalı, çok modüllü destek talebi sistemi, Kanban iş takip panosu ve zimmet/varlık yönetimini tek çatı altında topluyor. 5 şubede canlı kullanımda.",
    tech: ["Node.js", "Express", "React", "PostgreSQL", "PM2"],
  },
  {
    code: "PLT-02",
    title: "Zebra Etiket Baskı Sistemi",
    categories: ["ERP & SAP"],
    desc: "SAP B1'den parti ve sipariş verisini otomatik çeken, palet ve bobin içi etiketlerini rol bazlı yetkilendirmeyle basan uygulama.",
    tech: ["ASP.NET Core", "React", "SAP MSSQL", "JWT"],
  },
  {
    code: "PLT-03",
    title: "Stok Sayım (FlexStokSayim)",
    categories: ["ERP & SAP", "Web Uygulama"],
    desc: "Barkod okumalı dönemsel sayım akışı, SAP B1 + PostgreSQL hibrit veritabanı, Telegram bot ile uzaktan sıfırlama ve çok sayfalı Excel raporlama.",
    tech: ["Node.js", "React", "PostgreSQL", "SAP MSSQL", "Telegram API"],
  },
  {
    code: "PLT-04",
    title: "ESP8266 IoT Sensör Ağı",
    categories: ["IoT"],
    desc: "İki şubede 20 sensörle sıcaklık ve nem takibi; haftalık/aylık otomatik e-posta raporları ve Telegram üzerinden anlık durum sorgulama.",
    tech: ["ESP8266", "Node.js", "Telegram API", "SMTP"],
  },
];

const EXPERIENCE = [
  {
    date: "Aralık 2024 — Günümüz",
    role: "IT & SAP Sistem Yöneticisi / Full-Stack Developer",
    org: "Erze Ambalaj A.Ş. · Şanlıurfa",
    desc: "5 şube genelinde (FLEX, İZMİR, URFA, EPLE, TREPLAR) IT altyapısını yönetiyor; SAP Business One entegrasyonlu envanter, stok sayım, etiket baskı ve IoT izleme sistemlerini uçtan uca geliştirdi.",
    current: true,
  },
  {
    date: "Haziran — Eylül 2024",
    role: "Stajyer Yazılım Geliştirici",
    org: "Pinsoft IT Solutions",
    desc: "Bankacılık uygulaması desteği verdi ve özel web uygulamaları geliştirme sürecinde yer aldı.",
  },
  {
    date: "2020 — 2024",
    role: "Bilgisayar Mühendisliği",
    org: "İskenderun Teknik Üniversitesi",
    desc: "Lisans eğitimini tamamladı.",
  },
];

function Barcode({ code }) {
  return (
    <div className="fs-project-foot">
      <div className="fs-barcode" />
      <div className="fs-barcode-label">
        <span>{code}</span>
        <span>ŞANLIURFA / İZMİR</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Tümü");
  const filtered = filter === "Tümü" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <div className="fs-root">
      <style>{CSS}</style>

      <nav className="fs-nav">
        <span className="fs-nav-logo">FS // 001</span>
        <div className="fs-nav-links">
          <a className="fs-nav-link" href="#about">Hakkımda</a>
          <a className="fs-nav-link" href="#skills">Teknolojiler</a>
          <a className="fs-nav-link" href="#projects">Projeler</a>
          <a className="fs-nav-link" href="#experience">Deneyim</a>
          <a className="fs-nav-link" href="#contact">İletişim</a>
        </div>
        <a className="fs-nav-icon" href="https://github.com/Fatih17-s" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={16} />
        </a>
      </nav>

      <header className="fs-hero">
        <div>
          <div className="fs-hero-tag"><span className="dot" />Varlık Etiketi No: FS-2024-001</div>
          <h1 className="fs-hero-name">Fatih<br />Suna</h1>
          <p className="fs-hero-title">IT &amp; SAP Sistem Yöneticisi — Full-Stack Developer</p>
          <p className="fs-hero-sub">
            Şanlıurfa merkezli, Erze Ambalaj bünyesinde 5 şubeyi aynı anda ayakta tutan
            altyapı ve SAP entegrasyonlu iç sistemleri kuruyorum.
          </p>
          <div className="fs-cta-row">
            <a className="fs-btn fs-btn-primary" href="#projects">Projeleri Gör <ArrowUpRight size={15} /></a>
            <a className="fs-btn fs-btn-secondary" href="#contact">İletişime Geç</a>
          </div>
        </div>

        <div className="fs-panel">
          <div className="fs-panel-head">
            <span>Sistem Durumu</span>
            <span className="fs-led" />
          </div>
          <div className="fs-panel-row">
            <span className="k">SUNUCU</span>
            <span className="v fs-panel-status"><span className="fs-led" />192.168.140.14</span>
          </div>
          <div className="fs-panel-row">
            <span className="k">PM2 SÜREÇ</span>
            <span className="v">6 / 6 ÇALIŞIYOR</span>
          </div>
          <div className="fs-panel-row">
            <span className="k">ŞUBE BAĞLANTISI</span>
            <span className="v">5 / 5 BAĞLI</span>
          </div>
          <div className="fs-panel-row">
            <span className="k">SAP B1</span>
            <span className="v fs-panel-status"><span className="fs-led" />ERZE_2025</span>
          </div>
        </div>
      </header>

      <section className="fs-section" id="about">
        <Reveal>
          <span className="fs-eyebrow">[ Dosya: Hakkımda ]</span>
        </Reveal>
        <div className="fs-about-grid">
          <Reveal delay={80}>
            <p className="fs-lead">
              2024'te İskenderun Teknik Üniversitesi'nde Bilgisayar Mühendisliği eğitimimi tamamladım.
              Aralık 2024'ten bu yana Erze Ambalaj'da IT ve SAP sistem yöneticisi olarak çalışıyorum;
              aynı zamanda şirket içi tüm web ve mobil uygulamaları tek başıma geliştiriyorum.
            </p>
            <p className="fs-lead" style={{ marginTop: 14 }}>
              Ağ altyapısından SAP Business One entegrasyonlarına, barkodlu stok sayımından
              etiket baskı sistemlerine kadar birbirine bağlı bir yazılım ekosistemi kurdum —
              beşi de aynı anda üretimde çalışan sistemler.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="fs-facts">
              <li><span className="label">Konum</span> Şanlıurfa, Türkiye</li>
              <li><span className="label">Şirket</span> Erze Ambalaj A.Ş.</li>
              <li><span className="label">Şubeler</span> FLEX · İZMİR · URFA · EPLE · TREPLAR</li>
              <li><span className="label">Eğitim</span> Bilgisayar Müh. — İSTE, 2020–2024</li>
              <li><span className="label">GitHub</span> github.com/Fatih17-s</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="fs-section" id="skills">
        <Reveal>
          <div className="fs-section-head">
            <span className="fs-eyebrow">[ Envanter: Teknolojiler ]</span>
            <h2 className="fs-section-title">Kullandığım Araçlar</h2>
          </div>
        </Reveal>
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 70}>
            <div className="fs-skill-group">
              <div className="fs-skill-group-title">{group.title}</div>
              <div className="fs-tag-grid">
                {group.items.map((item) => (
                  <span className="fs-tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="fs-section" id="projects">
        <Reveal>
          <div className="fs-section-head">
            <span className="fs-eyebrow">[ Sevkiyat: Projeler ]</span>
            <h2 className="fs-section-title">Seçilmiş Projeler</h2>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="fs-filter-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`fs-filter-chip ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="fs-project-grid">
          {filtered.map((p, i) => (
            <Reveal print delay={i * 90} key={p.title}>
              <div className="fs-project-card">
                <h3 className="fs-project-title">{p.title}</h3>
                <p className="fs-project-desc">{p.desc}</p>
                <div className="fs-project-tech">{p.tech.join(" · ")}</div>
                <Barcode code={p.code} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="fs-section" id="experience">
        <Reveal>
          <div className="fs-section-head">
            <span className="fs-eyebrow">[ Takip: Deneyim ]</span>
            <h2 className="fs-section-title">Kariyer Geçmişi</h2>
          </div>
        </Reveal>
        <div className="fs-timeline">
          {EXPERIENCE.map((exp, i) => (
            <Reveal delay={i * 100} key={exp.role}>
              <div className="fs-timeline-item">
                <span className="fs-timeline-dot" />
                <div className="fs-timeline-date">
                  {exp.date}
                  {exp.current && <span className="fs-timeline-stamp">Devam Ediyor</span>}
                </div>
                <h3 className="fs-timeline-role">{exp.role}</h3>
                <p className="fs-timeline-org">{exp.org}</p>
                <p className="fs-timeline-desc">{exp.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="fs-section" id="contact">
        <Reveal>
          <div className="fs-section-head">
            <span className="fs-eyebrow">[ Gönderi Formu ]</span>
            <h2 className="fs-section-title">Birlikte Bir Şeyler İnşa Edelim</h2>
            <p className="fs-lead" style={{ marginTop: 12 }}>
              Yeni bir proje, iş birliği ya da sadece merhaba demek için ulaşabilirsin.
            </p>
          </div>
        </Reveal>
        <div className="fs-contact-grid">
          <Reveal delay={80}>
            <a className="fs-contact-card" href="mailto:seninmailin@ornek.com">
              <span className="fs-contact-label">E-posta</span>
              <span className="fs-contact-value">seninmailin@ornek.com <Mail size={17} /></span>
            </a>
          </Reveal>
          <Reveal delay={140}>
            <a className="fs-contact-card" href="https://github.com/Fatih17-s" target="_blank" rel="noreferrer">
              <span className="fs-contact-label">GitHub</span>
              <span className="fs-contact-value">Fatih17-s <Github size={17} /></span>
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="fs-footer">
        <span>© 2026 Fatih Suna — Şanlıurfa</span>
        <span>Bilgisayar Mühendisliği · İskenderun Teknik Üniversitesi</span>
      </footer>
    </div>
  );
}
