// ===========================
// SMART LANGUAGE TOGGLE (FINAL) - WITH PLACEHOLDER SUPPORT
// ===========================
function applyLanguage(lang) {
    // تخزين اللغة
    localStorage.setItem("site_lang", lang);

    // تحميل ملف JSON
    fetch(`assets/lang/${lang}.json`)
        .then(res => res.json())
        .then(data => {

            // تطبيق النصوص لكل العناصر
            document.querySelectorAll("[data-lang]").forEach(el => {
                const key = el.getAttribute("data-lang");
                if (data[key] !== undefined) {
                    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                        el.placeholder = data[key]; // ترجمة الـplaceholder
                    } else {
                        el.textContent = data[key]; // ترجمة النصوص العادية
                    }
                }
            });

            // ضبط اتجاه الصفحة
            document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
            document.documentElement.lang = lang;

            // تحديث زر اللغة
            const btn = document.getElementById("lang-toggle");
            if (btn) {
                btn.textContent = (lang === "ar") ? "🌐 FR" : "🌐 AR";
            }
        })
        .catch(err => console.error("Language file error:", err));
}

// ===========================
// INITIALIZE ON PAGE LOAD
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("site_lang") || "ar";

    // تطبيق اللغة عند تحميل الصفحة
    applyLanguage(saved);

    // تفعيل زر اللغة
    const btn = document.getElementById("lang-toggle");
    if (btn) {
        btn.addEventListener("click", () => {
            const current = localStorage.getItem("site_lang") || "ar";
            const next = (current === "ar") ? "fr" : "ar";
            applyLanguage(next);
        });
    }
});
