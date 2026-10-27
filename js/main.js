// Maqolalar ro'yxati. Yangi maqola qo'shish uchun shu massivga obyekt qo'shing.
const posts = [
  {
    id: 1,
    title: "HTML'ni noldan o'rganish: birinchi sahifa",
    category: "Veb",
    date: "2026-10-20",
    excerpt: "Teglar, atributlar va sahifa tuzilishi haqida qisqa va tushunarli qo'llanma.",
    body: [
      "HTML — bu veb-sahifaning skeleti. U brauzerga sahifada qanday elementlar borligini aytadi: sarlavhalar, paragraflar, rasmlar va havolalar.",
      "Har bir HTML hujjat <!DOCTYPE html> bilan boshlanadi, keyin <html>, <head> va <body> teglari keladi. Ko'rinadigan barcha kontent <body> ichida bo'ladi.",
      "Birinchi sahifangizni yaratish uchun oddiy matn muharririda index.html faylini oching, asosiy tuzilmani yozing va brauzerda oching. Shu bilan siz veb-dasturchilik yo'lidagi birinchi qadamni qo'ydingiz."
    ]
  },
  {
    id: 2,
    title: "CSS Flexbox va Grid: qachon qaysi biri?",
    category: "Veb",
    date: "2026-10-13",
    excerpt: "Ikki kuchli joylashtirish usulining farqi va amaliy misollar.",
    body: [
      "Flexbox bir o'lchamli joylashtirish uchun mo'ljallangan: elementlarni qator yoki ustun bo'ylab tekislaydi. Menyular, tugmalar guruhi va kichik bloklar uchun juda qulay.",
      "Grid esa ikki o'lchamli: qator va ustunlarni bir vaqtda boshqaradi. Butun sahifa maketi yoki kartochkalar to'plami uchun ideal.",
      "Oddiy qoida: agar elementlar bitta yo'nalishda joylashsa — Flexbox, agar jadvalga o'xshash tuzilma kerak bo'lsa — Grid ishlating. Ko'pincha ikkalasi birga qo'llaniladi."
    ]
  },
  {
    id: 3,
    title: "Git bilan ishlashning 5 ta asosiy buyrug'i",
    category: "Vositalar",
    date: "2026-10-06",
    excerpt: "init, add, commit, push va pull — har kuni kerak bo'ladigan buyruqlar.",
    body: [
      "Git — kod o'zgarishlarini kuzatib boradigan tizim. U xatolarni qaytarish va jamoada ishlashni osonlashtiradi.",
      "git init yangi repozitoriy yaratadi. git add o'zgarishlarni tayyorlaydi, git commit esa ularni tarixga saqlaydi.",
      "git push o'zgarishlarni serverga yuboradi, git pull esa serverdagi yangiliklarni yuklab oladi. Shu beshta buyruq bilan kundalik ishlarning aksariyatini bajarish mumkin."
    ]
  },
  {
    id: 4,
    title: "JavaScript'da DOM bilan ishlash",
    category: "Veb",
    date: "2026-09-29",
    excerpt: "Elementlarni topish, o'zgartirish va hodisalarga javob berishni o'rganamiz.",
    body: [
      "DOM — bu brauzer HTML'dan yaratadigan obyektlar daraxti. JavaScript orqali uni o'qish va o'zgartirish mumkin.",
      "document.querySelector() yordamida elementni topasiz, textContent yoki classList orqali uni o'zgartirasiz.",
      "addEventListener() bilan esa tugma bosilishi, forma yuborilishi kabi hodisalarga javob berasiz. Sahifani jonli qiladigan narsa aynan shu."
    ]
  },
  {
    id: 5,
    title: "VS Code uchun foydali kengaytmalar",
    category: "Vositalar",
    date: "2026-09-22",
    excerpt: "Ishni tezlashtiradigan va kodni chiroyli qiladigan kengaytmalar ro'yxati.",
    body: [
      "VS Code — eng mashhur kod muharrirlaridan biri. Uning kuchi kengaytmalarda.",
      "Prettier kodni avtomatik formatlaydi, ESLint xatolarni oldindan ko'rsatadi, Live Server esa sahifani saqlaganingizda avtomatik yangilaydi.",
      "Ko'p kengaytma o'rnatish muharrirni sekinlashtirishi mumkin, shuning uchun faqat haqiqatan kerak bo'lganlarini tanlang."
    ]
  },
  {
    id: 6,
    title: "Mustaqil o'rganishda motivatsiyani saqlash",
    category: "O'sish",
    date: "2026-09-15",
    excerpt: "Kichik maqsadlar, muntazamlik va natijani ko'rish — davom etishning siri.",
    body: [
      "O'z-o'zini o'qitishda eng qiyin narsa — boshlash emas, davom ettirish.",
      "Katta maqsadni kichik, bir haftada bajariladigan qadamlarga bo'ling. Har kuni oz bo'lsa ham shug'ullaning — 30 daqiqa ham yetarli.",
      "O'rganganlaringizni kichik loyihalarda qo'llang. O'z qo'lingiz bilan yaratgan narsani ko'rish eng yaxshi motivatsiya."
    ]
  }
];

const months = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"
];

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}-${months[m - 1]}, ${y}`;
}

function readingTime(post) {
  const words = post.body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Maqolalar ro'yxati, qidiruv va filtr
const postsEl = document.getElementById("posts");
const emptyEl = document.getElementById("empty");
const searchEl = document.getElementById("search");
const filtersEl = document.getElementById("filters");

let activeCategory = "Barchasi";

function renderFilters() {
  const categories = ["Barchasi", ...new Set(posts.map((p) => p.category))];
  filtersEl.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderFilters();
      renderPosts();
    });
    filtersEl.appendChild(btn);
  });
}

function renderPosts() {
  const query = searchEl.value.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    const matchCategory = activeCategory === "Barchasi" || p.category === activeCategory;
    const matchQuery =
      p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  postsEl.innerHTML = "";
  filtered.forEach((post) => {
    const el = document.createElement("article");
    el.className = "post";
    el.tabIndex = 0;

    const tag = document.createElement("span");
    tag.className = "post__tag";
    tag.textContent = post.category;

    const title = document.createElement("h3");
    title.textContent = post.title;

    const excerpt = document.createElement("p");
    excerpt.textContent = post.excerpt;

    const meta = document.createElement("span");
    meta.className = "post__meta";
    meta.textContent = `${formatDate(post.date)} · ${readingTime(post)} daqiqa`;

    el.append(tag, title, excerpt, meta);
    el.addEventListener("click", () => openModal(post));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(post);
    });
    postsEl.appendChild(el);
  });

  emptyEl.hidden = filtered.length > 0;
}

searchEl.addEventListener("input", renderPosts);

// Maqola oynasi
const modal = document.getElementById("modal");
let lastFocused = null;

function openModal(post) {
  lastFocused = document.activeElement;
  document.getElementById("modal-tag").textContent = post.category;
  document.getElementById("modal-title").textContent = post.title;
  document.getElementById("modal-meta").textContent =
    `${formatDate(post.date)} · ${readingTime(post)} daqiqa o'qish`;

  const body = document.getElementById("modal-body");
  body.innerHTML = "";
  post.body.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    body.appendChild(p);
  });

  modal.hidden = false;
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocused) lastFocused.focus();
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

// Mobil menyu
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Aktiv bo'limni menyuda belgilash
const sections = document.querySelectorAll("main section[id]");
const navLinks = nav.querySelectorAll("a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => observer.observe(s));

// Aloqa formasi
const form = document.getElementById("contact-form");
const successEl = document.getElementById("form-success");

const validators = {
  name: (v) => (v.length < 2 ? "Ismingizni kiriting (kamida 2 ta harf)." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "To'g'ri email kiriting."),
  message: (v) => (v.length < 10 ? "Xabar kamida 10 ta belgidan iborat bo'lsin." : "")
};

function validateField(input) {
  const error = validators[input.name](input.value.trim());
  input.classList.toggle("invalid", Boolean(error));
  input.nextElementSibling.textContent = error;
  return !error;
}

Object.keys(validators).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) validateField(input);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  successEl.hidden = true;

  const valid = Object.keys(validators)
    .map((name) => validateField(form.elements[name]))
    .every(Boolean);

  if (!valid) return;

  // Server tayyor bo'lganda shu yerda fetch() orqali ma'lumotni yuboring.
  form.reset();
  successEl.hidden = false;
});

// Ishga tushirish
document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderPosts();
