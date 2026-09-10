import React, { useState, useEffect, useRef } from "react";
import { Github, Mail, Linkedin, ArrowUpRight, Download, X, CheckCircle2 } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

html, body, #root { margin: 0; padding: 0; background: #0B0B0D; }
html { scrollbar-color: rgba(255,255,255,0.2) #0B0B0D; scrollbar-width: thin; }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #0B0B0D; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 6px; }

.ap-root {
  color-scheme: dark light;
  --black: #0B0B0D;
  --near-black: #131315;
  --white: #FFFFFF;
  --offwhite: #F5F5F7;
  --ink: #1D1D1F;
  --ink-dim: #6E6E73;
  --red: #E5342A;
  --red-light: #FF6B5E;
  --line-light: rgba(0,0,0,0.09);
  --line-dark: rgba(255,255,255,0.12);
  --on-dark: #F5F5F7;
  --on-dark-dim: rgba(245,245,247,0.62);

  font-family: 'Inter', sans-serif;
  color: var(--ink);
  background: var(--white);
  line-height: 1.55;
  overflow-x: hidden;
}
.ap-root * { box-sizing: border-box; }
.ap-root a { color: inherit; text-decoration: none; }
.ap-root button { font-family: inherit; cursor: pointer; background: none; border: none; }
.ap-root :focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }

/* ---------- Nav (always dark) ---------- */
.ap-nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  background: rgba(11,11,13,0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line-dark);
}
.ap-nav-brand { display: flex; align-items: center; gap: 10px; }
.ap-nav-badge {
  width: 28px; height: 28px; border-radius: 7px; background: var(--red);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.78rem; color: #fff;
}
.ap-nav-name { color: var(--on-dark); font-weight: 700; font-size: 0.92rem; }
.ap-nav-links { display: flex; gap: 26px; }
.ap-nav-link { color: var(--on-dark-dim); font-size: 0.85rem; font-weight: 500; transition: color 0.2s ease; }
.ap-nav-link:hover { color: var(--on-dark); }
.ap-nav-cta {
  background: var(--red); color: #fff; font-size: 0.8rem; font-weight: 700;
  padding: 9px 18px; border-radius: 100px; transition: transform 0.2s ease, background 0.2s ease;
}
.ap-nav-cta:hover { background: var(--red-light); transform: translateY(-1px); }
@media (max-width: 760px) { .ap-nav-links { display: none; } }

/* ---------- Reveal ---------- */
.ap-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
.ap-reveal.ap-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .ap-reveal { transition: none !important; opacity: 1 !important; transform: none !important; } }

/* ---------- Hero (dark) ---------- */
.ap-hero {
  position: relative; background: var(--black); padding: 90px 32px 160px; overflow: hidden;
}
.ap-hero::before {
  content: ''; position: absolute; top: -200px; right: -160px; width: 640px; height: 640px;
  background: radial-gradient(circle, rgba(229,52,42,0.28), transparent 68%);
  pointer-events: none;
}
.ap-hero-inner { max-width: 900px; margin: 0 auto; text-align: center; position: relative; }
.ap-eyebrow-pill {
  display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--red-light); margin-bottom: 26px;
}
.ap-hero-headline {
  font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 800; line-height: 1.08;
  letter-spacing: -0.02em; color: var(--on-dark); margin: 0 0 22px 0;
}
.ap-hero-headline .hl { color: var(--red-light); }
.ap-hero-sub {
  font-size: clamp(1.02rem, 1.6vw, 1.2rem); color: var(--on-dark-dim);
  max-width: 620px; margin: 0 auto 38px; font-weight: 400;
}
.ap-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 26px; }
.ap-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.92rem; font-weight: 700; padding: 14px 26px; border-radius: 100px;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.ap-btn-primary { background: var(--red); color: #fff; }
.ap-btn-primary:hover { background: var(--red-light); transform: translateY(-2px); }
.ap-btn-outline-dark { background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.4); color: #FFFFFF; }
.ap-btn-outline-dark:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.65); transform: translateY(-2px); }
.ap-trust-line {
  font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--on-dark-dim); font-weight: 600;
}

/* ---------- Hero floating mockup ---------- */
.ap-mock-wrap { max-width: 780px; margin: 56px auto -140px; position: relative; z-index: 2; }
.ap-mock {
  background: var(--white); border-radius: 16px; overflow: hidden;
  box-shadow: 0 40px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.04);
}
.ap-mock-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: #EDEDEF; border-bottom: 1px solid var(--line-light); }
.ap-mock-dot { width: 10px; height: 10px; border-radius: 50%; background: #D3D3D6; }
.ap-mock-dot.red { background: #FF5F56; }
.ap-mock-dot.yellow { background: #FFBD2E; }
.ap-mock-dot.green { background: #27C93F; }
.ap-mock-url {
  margin-left: 10px; font-size: 0.72rem; color: var(--ink-dim);
  background: #fff; border: 1px solid var(--line-light); border-radius: 6px; padding: 4px 12px;
}
.ap-mock-body { display: grid; grid-template-columns: 160px 1fr; min-height: 220px; }
@media (max-width: 620px) { .ap-mock-body { grid-template-columns: 1fr; } .ap-mock-sidebar { display: none; } }
.ap-mock-sidebar { background: var(--offwhite); border-right: 1px solid var(--line-light); padding: 18px 14px; }
.ap-mock-side-item { font-size: 0.78rem; color: var(--ink-dim); padding: 9px 10px; border-radius: 7px; font-weight: 500; }
.ap-mock-side-item.active { background: #fff; color: var(--ink); font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.ap-mock-main { padding: 20px; }
.ap-mock-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 4px; border-bottom: 1px solid var(--line-light); font-size: 0.86rem; color: var(--ink);
}
.ap-mock-row:last-child { border-bottom: none; }
.ap-mock-status { font-size: 0.72rem; color: #1AA24A; font-weight: 700; }

/* ---------- Sections ---------- */
.ap-section { padding: 200px 32px 100px; max-width: 1080px; margin: 0 auto; }
.ap-section + .ap-section { padding-top: 100px; }
.ap-section-offwhite { background: var(--offwhite); }
.ap-section-dark { background: var(--black); color: var(--on-dark); }
.ap-full { max-width: none; padding-left: 0; padding-right: 0; }
.ap-eyebrow {
  display: inline-block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--red); margin-bottom: 14px;
}
.ap-section-dark .ap-eyebrow { color: var(--red-light); }
.ap-h2 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 800; letter-spacing: -0.01em; margin: 0 0 18px 0; line-height: 1.12; }
.ap-section-head { max-width: 640px; margin-bottom: 44px; }
.ap-lead { color: var(--ink-dim); font-size: 1.03rem; }
.ap-section-dark .ap-lead { color: var(--on-dark-dim); }

/* ---------- About / stats ---------- */
.ap-about-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; margin-bottom: 56px; }
@media (max-width: 800px) { .ap-about-grid { grid-template-columns: 1fr; } }
.ap-facts { list-style: none; margin: 0; padding: 0; }
.ap-facts li { display: flex; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--line-light); font-size: 0.9rem; color: var(--ink-dim); }
.ap-facts li span.label { color: var(--ink); font-weight: 700; min-width: 96px; flex-shrink: 0; }
.ap-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--line-light); border: 1px solid var(--line-light); border-radius: 14px; overflow: hidden; }
.ap-stat-cell { background: var(--white); padding: 26px 20px; text-align: center; }
.ap-stat-value { font-size: 2.1rem; font-weight: 800; color: var(--red); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.ap-stat-label { font-size: 0.8rem; color: var(--ink-dim); margin-top: 4px; }

/* ---------- Skills ---------- */
.ap-skill-group { margin-bottom: 24px; }
.ap-skill-group-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-dim); margin-bottom: 12px; }
.ap-tag-grid { display: flex; flex-wrap: wrap; gap: 9px; }
.ap-tag { font-size: 0.84rem; font-weight: 500; padding: 8px 15px; border-radius: 100px; background: var(--white); border: 1px solid var(--line-light); transition: all 0.2s ease; }
.ap-tag:hover { border-color: var(--red); color: var(--red); transform: translateY(-1px); }

/* ---------- Spotlight project ---------- */
.ap-spotlight { background: var(--black); color: var(--on-dark); border-radius: 22px; padding: 46px; margin-bottom: 24px; position: relative; overflow: hidden; }
.ap-spotlight::before {
  content: ''; position: absolute; bottom: -160px; left: -120px; width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(229,52,42,0.22), transparent 70%);
}
.ap-spotlight-tag {
  display: inline-block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--red-light); border: 1px solid rgba(255,107,94,0.4); padding: 5px 12px; border-radius: 100px; margin-bottom: 18px;
}
.ap-spotlight-title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin: 0 0 14px 0; max-width: 520px; }
.ap-spotlight-desc { color: var(--on-dark-dim); max-width: 540px; margin-bottom: 24px; font-size: 0.98rem; }
.ap-spotlight-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 26px; }
.ap-spotlight-tech span { font-size: 0.76rem; font-weight: 500; padding: 6px 13px; border-radius: 100px; background: rgba(255,255,255,0.08); border: 1px solid var(--line-dark); }
.ap-spotlight-result { display: inline-flex; align-items: center; gap: 8px; font-size: 1.02rem; font-weight: 700; color: #fff; }
.ap-spotlight-result::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--red-light); }

/* ---------- Project grid ---------- */
.ap-filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 30px; }
.ap-filter-chip { font-size: 0.82rem; font-weight: 600; padding: 9px 17px; border-radius: 100px; background: var(--white); border: 1px solid var(--line-light); color: var(--ink-dim); transition: all 0.2s ease; }
.ap-filter-chip.active { background: var(--red); color: #fff; border-color: var(--red); }
.ap-filter-chip:not(.active):hover { border-color: var(--red); color: var(--red); }
.ap-project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; align-items: stretch; }
.ap-project-grid > .ap-reveal { height: 100%; }
.ap-project-card {
  background: var(--white); border: 1px solid var(--line-light); border-radius: 16px; padding: 24px;
  display: flex; flex-direction: column; height: 100%; min-height: 260px; cursor: pointer; text-align: left; width: 100%;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}
.ap-project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); border-color: var(--line-light); }
.ap-project-tag { display: inline-block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--red); background: rgba(229,52,42,0.08); padding: 4px 10px; border-radius: 100px; margin-bottom: 14px; }
.ap-project-title { font-size: 1.06rem; font-weight: 700; margin: 0 0 8px 0; }
.ap-project-desc { color: var(--ink-dim); font-size: 0.87rem; margin: 0 0 14px 0; flex-grow: 1; }
.ap-project-tech { font-size: 0.72rem; color: var(--ink-dim); margin-bottom: 14px; }
.ap-project-result { font-size: 0.85rem; font-weight: 700; color: var(--red); padding-top: 12px; border-top: 1px solid var(--line-light); }

/* ---------- Modal ---------- */
.ap-modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(11,11,13,0.6); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: ap-fade 0.2s ease; }
@keyframes ap-fade { from { opacity: 0; } to { opacity: 1; } }
.ap-modal { background: var(--white); border-radius: 20px; max-width: 640px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 40px; position: relative; animation: ap-modal-in 0.28s cubic-bezier(.16,1,.3,1); }
@keyframes ap-modal-in { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
.ap-modal-close { position: absolute; top: 20px; right: 20px; width: 36px; height: 36px; border-radius: 10px; background: var(--offwhite); display: flex; align-items: center; justify-content: center; color: var(--ink); transition: all 0.2s ease; }
.ap-modal-close:hover { background: #EAEAEC; }
.ap-modal-title { font-size: 1.5rem; font-weight: 800; margin: 16px 30px 14px 0; letter-spacing: -0.01em; }
.ap-modal-desc { color: var(--ink-dim); font-size: 0.96rem; margin-bottom: 24px; }
.ap-modal-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-dim); margin-bottom: 12px; }
.ap-modal-features { list-style: none; margin: 0 0 26px 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.ap-modal-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: var(--ink); }
.ap-modal-features svg { color: var(--red); flex-shrink: 0; margin-top: 2px; }
.ap-modal-tech-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.ap-modal-result { padding: 16px 18px; border-radius: 12px; background: rgba(229,52,42,0.06); border: 1px solid rgba(229,52,42,0.2); font-weight: 700; font-size: 0.95rem; color: var(--red); }

/* ---------- Timeline ---------- */
.ap-timeline { position: relative; padding-left: 28px; }
.ap-timeline::before { content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: var(--line-light); }
.ap-timeline-item { position: relative; padding-bottom: 36px; }
.ap-timeline-item:last-child { padding-bottom: 0; }
.ap-timeline-dot { position: absolute; left: -28px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--red); box-shadow: 0 0 0 4px rgba(229,52,42,0.15); }
.ap-timeline-date { font-size: 0.76rem; font-weight: 600; color: var(--ink-dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
.ap-timeline-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 0.68rem; font-weight: 700; color: var(--red); border: 1px solid rgba(229,52,42,0.3); padding: 3px 9px; border-radius: 100px; margin-left: 8px; text-transform: uppercase; }
.ap-timeline-role { font-size: 1.04rem; font-weight: 700; margin: 0 0 2px 0; }
.ap-timeline-org { color: var(--red); font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; }
.ap-timeline-desc { color: var(--ink-dim); font-size: 0.87rem; max-width: 560px; }

/* ---------- Contact (dark bookend) ---------- */
.ap-contact-inner { max-width: 640px; margin: 0 auto; text-align: center; }
.ap-contact-links { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
.ap-contact-link { display: inline-flex; align-items: center; gap: 9px; padding: 13px 20px; border-radius: 100px; border: 1.5px solid var(--line-dark); color: var(--on-dark); font-weight: 600; font-size: 0.88rem; transition: all 0.2s ease; }
.ap-contact-link:hover { border-color: var(--red-light); color: var(--red-light); transform: translateY(-2px); }

/* ---------- Footer ---------- */
.ap-footer { background: var(--black); border-top: 1px solid var(--line-dark); padding: 26px 32px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 0.76rem; color: var(--on-dark-dim); }
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

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`ap-reveal ${inView ? "ap-in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function useCountUp(target, inView, duration = 1300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start; let raf;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step); else setValue(target);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

function StatCell({ value, prefix = "", suffix = "", label }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="ap-stat-cell">
      <div className="ap-stat-value">{prefix}{count.toLocaleString("tr-TR")}{suffix}</div>
      <div className="ap-stat-label">{label}</div>
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

const SPOTLIGHT = {
  title: "BT Envanter Yönetim Sistemi (ITAM)",
  desc: "Yüzlerce cihazın zimmet, bakım, arıza ve hurda süreçlerini tek platformda topladım; PDF zimmet formu üretimi, yönlendirmeli destek talep sistemi, Kanban tabanlı iş takip panosu ve personel portalı içeriyor. En kapsamlı ve en çok kullanılan sistemim.",
  tech: ["Node.js / Express", "React", "PostgreSQL", "PM2"],
  result: "Zimmet süreci: 30 dk → 2 dk",
};

const CATEGORIES = ["Tümü", "Yönetim Sistemi", "ERP Entegrasyonu", "IoT"];

const PROJECTS = [
  {
    title: "Yönetim Paneli (Dashboard)",
    categories: ["ERP Entegrasyonu", "Yönetim Sistemi"],
    desc: "ERP verisini gerçek zamanlı okuyarak stok, üretim ve satış süreçlerini tek ekranda izlenebilir hale getirdim.",
    details: "ERP verisini gerçek zamanlı okuyarak stok, üretim, satış ve satın alma süreçlerini tek ekranda izlenebilir hale getirdim.",
    features: [
      "ERP verisinin gerçek zamanlı okunması (stok, üretim, satış, satın alma)",
      "Departman bazlı yetkilendirme",
      "Grafik/tablo tabanlı karar destek raporları",
      "Yöneticilerin ERP arayüzüne girmeden rapor alabilmesi",
      "Çoklu şube verisinin tek ekranda konsolide edilmesi",
    ],
    tech: ["Node.js", "React", "SAP MSSQL (read-only)"],
    result: "Rapor hazırlama yükü BT'den kalktı",
  },
  {
    title: "Etiket Yönetim Uygulaması",
    categories: ["ERP Entegrasyonu"],
    desc: "ERP verisinden otomatik dolan şablonlarla çoklu yazıcı filosunu tek arayüzden yönetilebilir hale getirdim.",
    details: "ERP verisinden otomatik dolan şablonlarla çoklu yazıcı filosunu tek arayüzden yönetilebilir hale getirdim.",
    features: [
      "ERP verisinden otomatik dolan etiket şablonları",
      "Çoklu yazıcı filosunun tek arayüzden yönetimi",
      "Rol bazlı yetkilendirme",
      "Parti/sipariş verisinin otomatik eşleştirilmesi",
      "Manuel veri girişinin ortadan kaldırılması",
    ],
    tech: ["ASP.NET Core (.NET)", "React", "MSSQL"],
    result: "Etiket hata oranı: %80 azaldı",
  },
  {
    title: "Stok Sayım Uygulaması",
    categories: ["ERP Entegrasyonu", "Yönetim Sistemi"],
    desc: "Barkod okutmalı sayım sistemi; anlık ürün doğrulama ve rol bazlı yetkilendirme içeriyor.",
    details: "Barkod okutmalı dönemsel sayım sistemi; ERP üzerinden anlık ürün doğrulama içeriyor.",
    features: [
      "Barkod okutmalı dönemsel sayım akışı",
      "ERP üzerinden anlık ürün doğrulama",
      "3 seviyeli rol bazlı yetkilendirme",
      "Çok sayfalı Excel / e-posta raporlama",
      "Bot üzerinden bildirim ve uzaktan sıfırlama",
      "Çoklu şube sayım desteği",
    ],
    tech: ["Node.js", "React / Vite", "PostgreSQL", "SAP MSSQL"],
    result: "Sayım süresi: 12 saat → 6 saat",
  },
  {
    title: "IoT Sıcaklık & Nem İzleme Sistemi",
    categories: ["IoT"],
    desc: "Çoklu lokasyonda 7/24 ortam izleme altyapısı kurdum.",
    details: "Çoklu lokasyonda 7/24 ortam izleme altyapısı kurdum; eşik aşımında anlık uyarı içeriyor.",
    features: [
      "Çoklu lokasyonda 7/24 ortam izleme",
      "Eşik aşımında anlık bot bildirimi",
      "Haftalık/aylık otomatik e-posta raporları",
      "Lokasyon bazlı yetkilendirme",
      "Riskin oluşmadan tespit edilmesi",
    ],
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
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="ap-modal-backdrop" onClick={onClose}>
      <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ap-modal-close" onClick={onClose} aria-label="Kapat"><X size={18} /></button>
        <span className="ap-project-tag">{project.categories[0]}</span>
        <h3 className="ap-modal-title">{project.title}</h3>
        <p className="ap-modal-desc">{project.details}</p>
        <div className="ap-modal-label">Kapsam</div>
        <ul className="ap-modal-features">
          {project.features.map((f) => (
            <li key={f}><CheckCircle2 size={17} /><span>{f}</span></li>
          ))}
        </ul>
        <div className="ap-modal-label">Kullanılan Teknolojiler</div>
        <div className="ap-modal-tech-grid">
          {project.tech.map((t) => <span className="ap-tag" key={t}>{t}</span>)}
        </div>
        <div className="ap-modal-result">{project.result}</div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Tümü");
  const [selected, setSelected] = useState(null);
  const filtered = filter === "Tümü" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));

  return (
    <div className="ap-root">
      <style>{CSS}</style>

      <nav className="ap-nav">
        <div className="ap-nav-brand">
          <span className="ap-nav-badge">FS</span>
          <span className="ap-nav-name">Mehmet Fatih Suna</span>
        </div>
        <div className="ap-nav-links">
          <a className="ap-nav-link" href="#about">Hakkımda</a>
          <a className="ap-nav-link" href="#skills">Beceriler</a>
          <a className="ap-nav-link" href="#projects">Sistemler</a>
          <a className="ap-nav-link" href="#experience">Deneyim</a>
        </div>
        <a className="ap-nav-cta" href="#contact">İletişime Geç</a>
      </nav>

      <header className="ap-hero">
        <div className="ap-hero-inner">
          <Reveal>
            <span className="ap-eyebrow-pill">BT &amp; SAP Sorumlusu · Full-Stack Geliştirici</span>
            <h1 className="ap-hero-headline">Mehmet Fatih <span className="hl">Suna</span></h1>
            <p className="ap-hero-sub">
              5 lokasyonlu, 1.300 cihazlık bir üretim şirketinin BT ve SAP altyapısını tek başıma
              yönetiyorum; aynı zamanda şirketin kullandığı başlıca yazılımları da uçtan uca kendim
              geliştiriyorum. Envanter yönetimi, stok sayımı, üretim etiketleme ve IoT izleme
              sistemlerini dış tedarikçiye ihtiyaç duymadan tasarlayıp üretime aldım.
            </p>
            <div className="ap-cta-row">
              <a className="ap-btn ap-btn-primary" href="#projects">Sistemleri Gör <ArrowUpRight size={16} /></a>
              <a className="ap-btn ap-btn-outline-dark" href="/cv/Mehmet_Fatih_Suna_CV.pdf" download>CV İndir <Download size={16} /></a>
            </div>
            <div className="ap-trust-line">5 Lokasyon · 1.300+ Cihaz · Tek Kişilik BT Ekibi</div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="ap-mock-wrap">
            <div className="ap-mock">
              <div className="ap-mock-bar">
                <span className="ap-mock-dot red" /><span className="ap-mock-dot yellow" /><span className="ap-mock-dot green" />
                <span className="ap-mock-url">sistemler.fatihsuna.dev</span>
              </div>
              <div className="ap-mock-body">
                <div className="ap-mock-sidebar">
                  <div className="ap-mock-side-item active">Dashboard</div>
                  <div className="ap-mock-side-item">Cihazlar</div>
                  <div className="ap-mock-side-item">Zimmet</div>
                  <div className="ap-mock-side-item">Raporlar</div>
                </div>
                <div className="ap-mock-main">
                  <div className="ap-mock-row"><span>BT Envanter (ITAM)</span><span className="ap-mock-status">● Aktif</span></div>
                  <div className="ap-mock-row"><span>Etiket Yönetimi</span><span className="ap-mock-status">● Aktif</span></div>
                  <div className="ap-mock-row"><span>Stok Sayım</span><span className="ap-mock-status">● Aktif</span></div>
                  <div className="ap-mock-row"><span>IoT İzleme</span><span className="ap-mock-status">● Aktif</span></div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      <section className="ap-section" id="about" style={{ paddingTop: 180 }}>
        <Reveal><span className="ap-eyebrow">Hakkımda</span></Reveal>
        <div className="ap-about-grid">
          <Reveal delay={80}>
            <p className="ap-lead">
              2024'te Bilgisayar Mühendisliği eğitimimi tamamladım. O tarihten bu yana bir üretim
              şirketinde BT ve SAP sistem sorumlusu olarak çalışıyorum; envanter yönetiminden
              stok sayımına, üretim etiketlemeden ortam izlemeye kadar birbirine bağlı bir
              yazılım ekosistemini tek başıma kurdum.
            </p>
            <p className="ap-lead" style={{ marginTop: 14 }}>
              Kurumsal bir BT departmanının işletim yükünü, bir yazılım ekibinin çıktısıyla
              aynı kişide birleştiriyorum.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="ap-facts">
              <li><span className="label">Konum</span> Şanlıurfa, Türkiye</li>
              <li><span className="label">Rol</span> BT &amp; SAP Sorumlusu</li>
              <li><span className="label">Eğitim</span> Bilgisayar Müh. — 2020–2024</li>
              <li><span className="label">GitHub</span> github.com/Fatih17-s</li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="ap-stat-grid">
            {STATS.map((s) => <StatCell key={s.label} {...s} />)}
          </div>
        </Reveal>
      </section>

      <section className="ap-section ap-section-offwhite" id="skills">
        <Reveal>
          <div className="ap-section-head">
            <span className="ap-eyebrow">Beceriler</span>
            <h2 className="ap-h2">Kullandığım Araçlar</h2>
          </div>
        </Reveal>
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 60}>
            <div className="ap-skill-group">
              <div className="ap-skill-group-title">{group.title}</div>
              <div className="ap-tag-grid">
                {group.items.map((item) => <span className="ap-tag" key={item}>{item}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="ap-section" id="projects">
        <Reveal>
          <div className="ap-section-head">
            <span className="ap-eyebrow">Sistemler</span>
            <h2 className="ap-h2">Geliştirdiğim Sistemler</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="ap-spotlight">
            <span className="ap-spotlight-tag">Öne Çıkan Sistem</span>
            <h3 className="ap-spotlight-title">{SPOTLIGHT.title}</h3>
            <p className="ap-spotlight-desc">{SPOTLIGHT.desc}</p>
            <div className="ap-spotlight-tech">
              {SPOTLIGHT.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="ap-spotlight-result">{SPOTLIGHT.result}</div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="ap-filter-row">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`ap-filter-chip ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="ap-project-grid">
          {filtered.map((p, i) => (
            <Reveal delay={i * 70} key={p.title}>
              <div
                className="ap-project-card"
                onClick={() => setSelected(p)}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(p); }}
              >
                <span className="ap-project-tag">{p.categories[0]}</span>
                <h3 className="ap-project-title">{p.title}</h3>
                <p className="ap-project-desc">{p.desc}</p>
                <div className="ap-project-tech">{p.tech.join(" · ")}</div>
                <div className="ap-project-result">{p.result}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <section className="ap-section ap-section-offwhite" id="experience">
        <Reveal>
          <div className="ap-section-head">
            <span className="ap-eyebrow">Deneyim</span>
            <h2 className="ap-h2">Kariyer Geçmişi</h2>
          </div>
        </Reveal>
        <div className="ap-timeline">
          {EXPERIENCE.map((exp, i) => (
            <Reveal delay={i * 90} key={exp.role}>
              <div className="ap-timeline-item">
                <span className="ap-timeline-dot" />
                <div className="ap-timeline-date">
                  {exp.date}
                  {exp.current && <span className="ap-timeline-badge">Devam Ediyor</span>}
                </div>
                <h3 className="ap-timeline-role">{exp.role}</h3>
                <p className="ap-timeline-org">{exp.org}</p>
                <p className="ap-timeline-desc">{exp.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ap-section ap-section-dark ap-full" id="contact">
        <Reveal>
          <div className="ap-contact-inner">
            <span className="ap-eyebrow">İletişim</span>
            <h2 className="ap-h2">Birlikte Bir Şeyler İnşa Edelim</h2>
            <p className="ap-lead">Yeni bir proje, iş birliği ya da sadece merhaba demek için ulaşabilirsin.</p>
            <div className="ap-contact-links">
              <a className="ap-contact-link" href="mailto:fatihsuna5663@gmail.com"><Mail size={16} /> fatihsuna5663@gmail.com</a>
              <a className="ap-contact-link" href="https://linkedin.com/in/fatih-s-a89495209" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a className="ap-contact-link" href="https://github.com/Fatih17-s" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="ap-footer">
        <span>© 2026 Mehmet Fatih Suna — Şanlıurfa</span>
        <span>Bilgisayar Mühendisliği · İskenderun Teknik Üniversitesi</span>
      </footer>
    </div>
  );
}
