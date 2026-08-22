import React, { useState, useEffect, useRef } from "react";
import { Github, Mail, Linkedin, ArrowUpRight, Download } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

html, body, #root {
  margin: 0; padding: 0;
  background: #0A0D16;
}
html { scrollbar-color: rgba(255,255,255,0.18) #0A0D16; scrollbar-width: thin; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #0A0D16; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }

.gx-root {
  --bg: #0A0D16;
  --bg-2: #0F1220;
  --glass: rgba(255,255,255,0.045);
  --glass-border: rgba(255,255,255,0.09);
  --glass-border-hover: rgba(255,255,255,0.18);
  --blue: #5B8CFF;
  --violet: #A855F7;
  --warm: #FF9F5A;
  --text: #F3F5FA;
  --text-dim: #8C93A8;

  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
.gx-root * { box-sizing: border-box; }
.gx-root a { color: inherit; text-decoration: none; }
.gx-root button { font-family: inherit; cursor: pointer; background: none; border: none; }
.gx-root :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

.gx-mono { font-family: 'JetBrains Mono', monospace; }
.gx-display { font-family: 'Sora', sans-serif; }
.gx-gradient-text {
  background-image: linear-gradient(100deg, var(--blue), var(--violet));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* ---------- Ambient aurora background ---------- */
.gx-aurora { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.gx-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.35; }
.gx-blob-1 { width: 480px; height: 480px; background: var(--blue); top: -120px; left: -80px; animation: gx-drift1 24s ease-in-out infinite; }
.gx-blob-2 { width: 520px; height: 520px; background: var(--violet); top: 20%; right: -160px; animation: gx-drift2 28s ease-in-out infinite; }
.gx-blob-3 { width: 400px; height: 400px; background: var(--warm); bottom: -140px; left: 30%; opacity: 0.18; animation: gx-drift1 32s ease-in-out infinite reverse; }
@keyframes gx-drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(1.1); } }
@keyframes gx-drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,40px) scale(0.95); } }
@media (prefers-reduced-motion: reduce) { .gx-blob { animation: none !important; } }

.gx-content { position: relative; z-index: 1; }

/* ---------- Nav ---------- */
.gx-nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 32px;
  background: rgba(10, 13, 22, 0.6);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--glass-border);
}
.gx-nav-logo {
  font-family: 'Sora', sans-serif; font-weight: 800; font-size: 0.95rem;
  letter-spacing: -0.01em;
}
.gx-nav-links { display: flex; gap: 28px; }
.gx-nav-link {
  font-size: 0.85rem; color: var(--text-dim); font-weight: 500;
  transition: color 0.2s ease;
}
.gx-nav-link:hover { color: var(--text); }
.gx-nav-icon {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--glass); border: 1px solid var(--glass-border);
  color: var(--text); transition: all 0.25s ease;
}
.gx-nav-icon:hover { border-color: var(--blue); box-shadow: 0 0 20px rgba(91,140,255,0.35); }
@media (max-width: 720px) { .gx-nav-links .gx-nav-link { display: none; } }

/* ---------- Sections ---------- */
.gx-section { padding: 110px 32px; max-width: 1140px; margin: 0 auto; position: relative; }
.gx-eyebrow {
  font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
  text-transform: uppercase; letter-spacing: 0.14em; color: var(--blue);
  margin-bottom: 14px; display: inline-flex; align-items: center; gap: 8px;
}
.gx-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 8px var(--blue); }
.gx-section-title {
  font-family: 'Sora', sans-serif; font-weight: 800;
  font-size: clamp(1.9rem, 4vw, 2.8rem); line-height: 1.1; margin: 0 0 18px 0;
}
.gx-section-head { max-width: 620px; margin-bottom: 48px; }
.gx-lead { color: var(--text-dim); font-size: 1.03rem; }

/* ---------- Reveal ---------- */
.gx-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
.gx-reveal.gx-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .gx-reveal { transition: none !important; opacity: 1 !important; transform: none !important; } }

/* ---------- Glass card base ---------- */
.gx-glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  backdrop-filter: blur(16px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.gx-glass:hover { border-color: var(--glass-border-hover); }

/* ---------- Hero ---------- */
.gx-hero { padding: 88px 32px 40px; max-width: 1140px; margin: 0 auto; position: relative; }
.gx-hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
  padding: 7px 14px; border-radius: 100px;
  background: var(--glass); border: 1px solid var(--glass-border);
  color: var(--text-dim); margin-bottom: 26px;
}
.gx-hero-tag .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--violet); box-shadow: 0 0 8px var(--violet); }
.gx-hero-name {
  font-family: 'Sora', sans-serif; font-weight: 800;
  font-size: clamp(2.6rem, 6.6vw, 4.6rem); line-height: 1.04;
  letter-spacing: -0.02em; margin: 0 0 16px 0;
}
.gx-hero-title {
  font-size: clamp(1.05rem, 2vw, 1.3rem); font-weight: 600; color: var(--text);
  margin: 0 0 18px 0;
}
.gx-hero-sub { max-width: 560px; color: var(--text-dim); margin-bottom: 34px; font-size: 1.05rem; }
.gx-cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
.gx-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.9rem; font-weight: 600; padding: 14px 24px; border-radius: 100px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.gx-btn-primary {
  background: linear-gradient(100deg, var(--blue), var(--violet)); color: #fff;
  box-shadow: 0 8px 30px rgba(91,140,255,0.28);
}
.gx-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(168,85,247,0.4); }
.gx-btn-secondary { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text); }
.gx-btn-secondary:hover { border-color: var(--glass-border-hover); transform: translateY(-2px); }

/* ---------- Stat grid ---------- */
.gx-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; margin-bottom: 20px; }
.gx-stat-card { padding: 22px; }
.gx-stat-value {
  font-family: 'Sora', sans-serif; font-weight: 800; font-size: 2rem;
  margin-bottom: 6px; font-variant-numeric: tabular-nums;
}
.gx-stat-label { font-size: 0.82rem; color: var(--text-dim); }

/* ---------- About ---------- */
.gx-about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 44px; }
@media (max-width: 800px) { .gx-about-grid { grid-template-columns: 1fr; } }
.gx-facts-card { padding: 26px; }
.gx-facts { list-style: none; margin: 0; padding: 0; }
.gx-facts li {
  display: flex; gap: 10px; align-items: baseline;
  font-size: 0.88rem; padding: 12px 0; border-bottom: 1px solid var(--glass-border);
  color: var(--text-dim);
}
.gx-facts li:last-child { border-bottom: none; }
.gx-facts li span.label { color: var(--text); font-weight: 600; min-width: 92px; flex-shrink: 0; }

/* ---------- Skills ---------- */
.gx-skill-group { margin-bottom: 26px; }
.gx-skill-group-title {
  font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
  text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-dim); margin-bottom: 14px;
}
.gx-tag-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.gx-tag {
  font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
  padding: 9px 16px; border-radius: 100px;
  background: var(--glass); border: 1px solid var(--glass-border);
  transition: all 0.25s ease;
}
.gx-tag:hover { border-color: var(--blue); box-shadow: 0 0 16px rgba(91,140,255,0.25); transform: translateY(-2px); }

/* ---------- Projects ---------- */
.gx-filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; }
.gx-filter-chip {
  font-size: 0.82rem; font-weight: 500; padding: 9px 18px; border-radius: 100px;
  background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-dim);
  transition: all 0.25s ease;
}
.gx-filter-chip.active { background: linear-gradient(100deg, var(--blue), var(--violet)); color: #fff; border-color: transparent; font-weight: 600; }
.gx-filter-chip:not(.active):hover { border-color: var(--glass-border-hover); color: var(--text); }

.gx-project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; align-items: stretch; }
.gx-project-grid > .gx-reveal { height: 100%; }
.gx-project-card {
  padding: 24px; display: flex; flex-direction: column;
  height: 100%; min-height: 300px; cursor: pointer; text-align: left; width: 100%;
}
.gx-project-card:hover { transform: translateY(-5px); box-shadow: 0 16px 50px rgba(91,140,255,0.14); }
.gx-project-head {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
}
.gx-project-badge {
  font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--violet); background: rgba(168,85,247,0.12);
  padding: 4px 10px; border-radius: 100px;
}
.gx-project-title { font-family: 'Sora', sans-serif; font-size: 1.1rem; font-weight: 700; margin: 0 0 10px 0; }
.gx-project-desc { color: var(--text-dim); font-size: 0.89rem; margin: 0 0 16px 0; flex-grow: 1; }
.gx-project-tech {
  font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--text-dim);
  margin-bottom: 16px;
}
.gx-project-result {
  font-size: 0.85rem; font-weight: 600; padding-top: 14px;
  border-top: 1px solid var(--glass-border);
  background-image: linear-gradient(100deg, var(--blue), var(--violet));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* ---------- Project detail modal ---------- */
.gx-modal-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(5,7,12,0.72); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
  animation: gx-fade-in 0.2s ease;
}
@keyframes gx-fade-in { from { opacity: 0; } to { opacity: 1; } }
.gx-modal {
  max-width: 580px; width: 100%; max-height: 85vh; overflow-y: auto;
  padding: 34px; position: relative;
  animation: gx-modal-in 0.28s cubic-bezier(.16,1,.3,1);
}
@keyframes gx-modal-in { from { opacity: 0; transform: translateY(18px) scale(0.97); } to { opacity: 1; transform: none; } }
.gx-modal-close {
  position: absolute; top: 18px; right: 18px;
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--glass); border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text); transition: all 0.2s ease;
}
.gx-modal-close:hover { border-color: var(--blue); box-shadow: 0 0 16px rgba(91,140,255,0.35); }
.gx-modal-title { font-family: 'Sora', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 16px 24px 16px 0; }
.gx-modal-desc { color: var(--text-dim); font-size: 0.96rem; margin-bottom: 22px; }
.gx-modal-tech-label {
  font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 10px;
}
.gx-modal-tech-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.gx-modal-result {
  padding: 16px 18px; border-radius: 12px;
  background: rgba(91,140,255,0.08); border: 1px solid rgba(91,140,255,0.22);
  font-weight: 700; font-size: 0.95rem;
}

/* ---------- Timeline ---------- */
.gx-timeline { position: relative; padding-left: 30px; }
.gx-timeline::before {
  content: ''; position: absolute; left: 6px; top: 6px; bottom: 6px; width: 1px;
  background: linear-gradient(var(--blue), var(--violet));
  opacity: 0.4;
}
.gx-timeline-item { position: relative; padding-bottom: 40px; }
.gx-timeline-item:last-child { padding-bottom: 0; }
.gx-timeline-dot {
  position: absolute; left: -30px; top: 4px;
  width: 13px; height: 13px; border-radius: 50%;
  background: linear-gradient(100deg, var(--blue), var(--violet));
  box-shadow: 0 0 14px rgba(91,140,255,0.6);
}
.gx-timeline-card { padding: 20px 24px; }
.gx-timeline-stamp {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: var(--blue);
  background: rgba(91,140,255,0.12); padding: 4px 10px; border-radius: 100px;
  margin-left: 10px;
}
.gx-timeline-stamp .pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: gx-pulse 2s ease-in-out infinite; }
@keyframes gx-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.gx-timeline-date {
  font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--text-dim); margin-bottom: 8px;
}
.gx-timeline-role { font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 700; margin: 0 0 2px 0; }
.gx-timeline-org { color: var(--violet); font-size: 0.9rem; margin-bottom: 8px; font-weight: 600; }
.gx-timeline-desc { color: var(--text-dim); font-size: 0.88rem; max-width: 560px; }

/* ---------- Contact ---------- */
.gx-contact-panel { padding: 40px; text-align: center; }
.gx-contact-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 28px; }
.gx-contact-link {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 22px; border-radius: 100px;
  background: var(--glass); border: 1px solid var(--glass-border);
  font-weight: 600; font-size: 0.9rem; transition: all 0.25s ease;
}
.gx-contact-link:hover { border-color: var(--blue); box-shadow: 0 0 24px rgba(91,140,255,0.3); transform: translateY(-2px); }

/* ---------- Footer ---------- */
.gx-footer {
  border-top: 1px solid var(--glass-border);
  padding: 26px 32px; max-width: 1140px; margin: 0 auto;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  font-size: 0.78rem; color: var(--text-dim);
}
`;

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`gx-reveal ${inView ? "gx-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function useCountUp(target, inView, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

function StatCard({ value, prefix = "", suffix = "", label, delay }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="gx-glass gx-stat-card" style={{ transitionDelay: `${delay}ms` }}>
      <div className="gx-stat-value gx-gradient-text">{prefix}{count.toLocaleString("tr-TR")}{suffix}</div>
      <div className="gx-stat-label">{label}</div>
    </div>
  );
}

const STATS = [
  { value: 5, label: "Lokasyon" },
  { value: 70, suffix: "+", label: "Aktif Kullanıcı" },
  { value: 800000, suffix: " ₺", label: "Yıllık Tasarruf" },
  { value: 80, prefix: "%", label: "Daha Az Etiket Hatası" },
];

const SKILL_GROUPS = [
  { title: "Backend", items: ["Node.js", "Express", "ASP.NET Core", "REST API", "JWT"] },
  { title: "Frontend", items: ["React", "Vite", "JavaScript", "HTML5 / CSS3"] },
  { title: "Veritabanı & ERP", items: ["PostgreSQL", "MSSQL", "SAP Business One veri modeli"] },
  { title: "Altyapı & DevOps", items: ["Windows Server", "PM2", "HTTPS yapılandırma", "Git / GitHub"] },
  { title: "Diğer", items: ["ESP8266 / IoT", "ZPL Etiket Programlama", "Python"] },
];

const CATEGORIES = ["Tümü", "Yönetim Sistemi", "ERP Entegrasyonu", "IoT"];

const PROJECTS = [
  {
    title: "BT Envanter Yönetim Sistemi (ITAM)",
    categories: ["Yönetim Sistemi"],
    desc: "Yüzlerce cihazın zimmet, bakım, arıza ve hurda süreçlerini tek platformda topladım.",
    details: "Yüzlerce cihazın zimmet, bakım, arıza ve hurda süreçlerini tek platformda topladım; PDF zimmet formu üretimi, yönlendirmeli destek talep sistemi (uygun ekibe otomatik atama), Kanban tabanlı iş takip panosu ve her çalışanın kendi zimmetini görebildiği bir personel portalı içeriyor. Daha önce Excel üzerinden manuel yürütülen tüm süreç artık uçtan uca dijital.",
    tech: ["Node.js / Express", "React", "PostgreSQL", "PM2"],
    result: "Zimmet süreci: 30 dk → 2 dk",
  },
  {
    title: "Yönetim Paneli (Dashboard)",
    categories: ["ERP Entegrasyonu", "Yönetim Sistemi"],
    desc: "ERP verisini gerçek zamanlı okuyarak stok, üretim ve satış süreçlerini tek ekranda izlenebilir hale getirdim.",
    details: "ERP verisini gerçek zamanlı okuyarak stok, üretim, satış ve satın alma süreçlerini tek ekranda izlenebilir hale getirdim. Departman bazlı yetkilendirme ve grafik/tablo raporlama içeriyor; yöneticiler ERP arayüzüne hiç girmeden anlık rapor alabiliyor.",
    tech: ["Node.js", "React", "SAP MSSQL (read-only)"],
    result: "Rapor hazırlama yükü BT'den kalktı",
  },
  {
    title: "Etiket Yönetim Uygulaması",
    categories: ["ERP Entegrasyonu"],
    desc: "ERP verisinden otomatik dolan şablonlarla çoklu yazıcı filosunu tek arayüzden yönetilebilir hale getirdim.",
    details: "ERP verisinden otomatik dolan şablonlarla çoklu yazıcı filosunu tek arayüzden yönetilebilir hale getirdim. Rol bazlı yetkilendirme, parti/sipariş verisinin otomatik doldurulması ve farklı etiket formatları için çoklu şablon desteği içeriyor. Manuel veri girişi ortadan kalktı.",
    tech: ["ASP.NET Core (.NET)", "React", "MSSQL"],
    result: "Etiket hata oranı: %80 azaldı",
  },
  {
    title: "Stok Sayım Uygulaması",
    categories: ["ERP Entegrasyonu", "Yönetim Sistemi"],
    desc: "Barkod okutmalı sayım sistemi; anlık ürün doğrulama ve rol bazlı yetkilendirme içeriyor.",
    details: "Barkod okutmalı dönemsel sayım sistemi; ERP üzerinden anlık ürün doğrulama, 3 seviyeli rol bazlı yetkilendirme, çok sayfalı Excel/e-posta raporlama ve bot üzerinden bildirim akışı içeriyor. Ekiple birlikte yürütülen dönem sayımları artık çok daha kısa sürede tamamlanıyor.",
    tech: ["Node.js", "React / Vite", "PostgreSQL", "SAP MSSQL"],
    result: "Sayım süresi: 12 saat → 6 saat",
  },
  {
    title: "IoT Sıcaklık & Nem İzleme Sistemi",
    categories: ["IoT"],
    desc: "Çoklu lokasyonda 7/24 ortam izleme altyapısı kurdum.",
    details: "Çoklu lokasyonda 7/24 ortam izleme altyapısı kurdum. Eşik aşımında anlık bot bildirimi, haftalık/aylık otomatik e-posta raporları ve lokasyon bazlı yetkilendirme içeriyor; sıcaklık/nem kaynaklı riskler oluşmadan tespit ediliyor.",
    tech: ["ESP8266", "Node.js", "PostgreSQL", "Telegram Bot API"],
    result: "Riskler oluşmadan tespit ediliyor",
  },
];

const EXPERIENCE = [
  {
    date: "Aralık 2024 — Halen",
    role: "BT & SAP Sorumlusu",
    org: "Erze Ambalaj A.Ş.",
    desc: "5 lokasyonda binlerce cihazın BT altyapısını tek başına yönetiyor, aynı zamanda kurumun kullandığı başlıca yazılımları uçtan uca geliştiriyor.",
    current: true,
  },
  {
    date: "Haziran — Eylül 2024",
    role: "Full-Stack Developer (Stajyer)",
    org: "Pinsoft IT Solutions and Consulting",
    desc: "Bankacılık uygulamaları için teknik destek süreçlerinde görev aldı; sipariş oluşturma web uygulamasının geliştirilmesine katkı sağladı.",
  },
  {
    date: "2020 — 2024",
    role: "Bilgisayar Mühendisliği",
    org: "İskenderun Teknik Üniversitesi",
    desc: "Lisans eğitimini tamamladı.",
  },
];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="gx-modal-backdrop" onClick={onClose}>
      <div className="gx-glass gx-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gx-modal-close" onClick={onClose} aria-label="Kapat">✕</button>
        <span className="gx-project-badge">{project.categories[0]}</span>
        <h3 className="gx-modal-title">{project.title}</h3>
        <p className="gx-modal-desc">{project.details}</p>
        <div className="gx-modal-tech-label">Kullanılan Teknolojiler</div>
        <div className="gx-modal-tech-grid">
          {project.tech.map((t) => <span className="gx-tag" key={t}>{t}</span>)}
        </div>
        <div className="gx-modal-result gx-gradient-text">{project.result}</div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Tümü");
  const [selected, setSelected] = useState(null);
  const filtered = filter === "Tümü" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <div className="gx-root">
      <style>{CSS}</style>
      <div className="gx-aurora">
        <div className="gx-blob gx-blob-1" />
        <div className="gx-blob gx-blob-2" />
        <div className="gx-blob gx-blob-3" />
      </div>

      <div className="gx-content">
        <nav className="gx-nav">
          <span className="gx-nav-logo">Fatih Suna</span>
          <div className="gx-nav-links">
            <a className="gx-nav-link" href="#about">Hakkımda</a>
            <a className="gx-nav-link" href="#skills">Beceriler</a>
            <a className="gx-nav-link" href="#projects">Sistemler</a>
            <a className="gx-nav-link" href="#experience">Deneyim</a>
            <a className="gx-nav-link" href="#contact">İletişim</a>
          </div>
          <a className="gx-nav-icon" href="https://github.com/Fatih17-s" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
        </nav>

        <header className="gx-hero">
          <Reveal>
            <div className="gx-hero-tag"><span className="dot" />BT &amp; SAP Sorumlusu / Full-Stack Geliştirici</div>
            <h1 className="gx-hero-name">Mehmet Fatih <span className="gx-gradient-text">Suna</span></h1>
            <p className="gx-hero-sub">
              Bir üretim şirketinin BT ve SAP altyapısını tek başıma yönetiyor, aynı zamanda
              şirketin kullandığı yazılımların çoğunu uçtan uca kendim geliştiriyorum.
            </p>
            <div className="gx-cta-row">
              <a className="gx-btn gx-btn-primary" href="#projects">Sistemleri Gör <ArrowUpRight size={16} /></a>
              <a className="gx-btn gx-btn-secondary" href="/cv/Mehmet_Fatih_Suna_CV.pdf" download>CV İndir <Download size={16} /></a>
              <a className="gx-btn gx-btn-secondary" href="#contact">İletişime Geç</a>
            </div>
          </Reveal>
          <div className="gx-stat-grid">
            {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 80} />)}
          </div>
        </header>

        <section className="gx-section" id="about">
          <Reveal><span className="gx-eyebrow">Hakkımda</span></Reveal>
          <div className="gx-about-grid">
            <Reveal delay={80}>
              <p className="gx-lead">
                2024'te Bilgisayar Mühendisliği eğitimimi tamamladım. O tarihten bu yana bir üretim
                şirketinde BT ve SAP sistem sorumlusu olarak çalışıyorum; envanter yönetiminden
                stok sayımına, üretim etiketlemeden ortam izlemeye kadar birbirine bağlı bir
                yazılım ekosistemini tek başıma kurdum — beşi de aynı anda üretimde çalışan sistemler.
              </p>
              <p className="gx-lead" style={{ marginTop: 14 }}>
                Kurumsal bir BT departmanının işletim yükünü, bir yazılım ekibinin çıktısıyla
                aynı kişide birleştiriyorum.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="gx-glass gx-facts-card">
                <ul className="gx-facts">
                  <li><span className="label">Konum</span> Şanlıurfa, Türkiye</li>
                  <li><span className="label">Rol</span> BT &amp; SAP Sorumlusu</li>
                  <li><span className="label">Eğitim</span> Bilgisayar Müh. — 2020–2024</li>
                  <li><span className="label">GitHub</span> github.com/Fatih17-s</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="gx-section" id="skills">
          <Reveal>
            <div className="gx-section-head">
              <span className="gx-eyebrow">Beceriler</span>
              <h2 className="gx-section-title">Kullandığım Araçlar</h2>
            </div>
          </Reveal>
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="gx-skill-group">
                <div className="gx-skill-group-title">{group.title}</div>
                <div className="gx-tag-grid">
                  {group.items.map((item) => <span className="gx-tag" key={item}>{item}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="gx-section" id="projects">
          <Reveal>
            <div className="gx-section-head">
              <span className="gx-eyebrow">Sistemler</span>
              <h2 className="gx-section-title">Geliştirdiğim Sistemler</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="gx-filter-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`gx-filter-chip ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="gx-project-grid">
            {filtered.map((p, i) => (
              <Reveal delay={i * 80} key={p.title}>
                <div
                  className="gx-glass gx-project-card"
                  onClick={() => setSelected(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(p); }}
                >
                  <div className="gx-project-head">
                    <span className="gx-project-badge">{p.categories[0]}</span>
                  </div>
                  <h3 className="gx-project-title">{p.title}</h3>
                  <p className="gx-project-desc">{p.desc}</p>
                  <div className="gx-project-tech">{p.tech.join(" · ")}</div>
                  <div className="gx-project-result">{p.result}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

        <section className="gx-section" id="experience">
          <Reveal>
            <div className="gx-section-head">
              <span className="gx-eyebrow">Deneyim</span>
              <h2 className="gx-section-title">Kariyer Geçmişi</h2>
            </div>
          </Reveal>
          <div className="gx-timeline">
            {EXPERIENCE.map((exp, i) => (
              <Reveal delay={i * 90} key={exp.role}>
                <div className="gx-timeline-item">
                  <span className="gx-timeline-dot" />
                  <div className="gx-glass gx-timeline-card">
                    <div className="gx-timeline-date">
                      {exp.date}
                      {exp.current && <span className="gx-timeline-stamp"><span className="pulse" />Devam Ediyor</span>}
                    </div>
                    <h3 className="gx-timeline-role">{exp.role}</h3>
                    <p className="gx-timeline-org">{exp.org}</p>
                    <p className="gx-timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="gx-section" id="contact">
          <Reveal>
            <div className="gx-glass gx-contact-panel">
              <span className="gx-eyebrow" style={{ justifyContent: "center" }}>İletişim</span>
              <h2 className="gx-section-title">Birlikte Bir Şeyler İnşa Edelim</h2>
              <p className="gx-lead">Yeni bir proje, iş birliği ya da sadece merhaba demek için ulaşabilirsin.</p>
              <div className="gx-contact-links">
                <a className="gx-contact-link" href="mailto:fatihsuna5663@gmail.com">
                  <Mail size={16} /> fatihsuna5663@gmail.com
                </a>
                <a className="gx-contact-link" href="https://linkedin.com/in/fatih-s-a89495209" target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a className="gx-contact-link" href="https://github.com/Fatih17-s" target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="gx-footer">
          <span>© 2026 Mehmet Fatih Suna — Şanlıurfa</span>
          <span>Bilgisayar Mühendisliği · İskenderun Teknik Üniversitesi</span>
        </footer>
      </div>
    </div>
  );
}
