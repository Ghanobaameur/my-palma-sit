// ===========================
// APPLY LANGUAGE
// ===========================
function applyLanguage(lang) {
    localStorage.setItem("site_lang", lang);

    fetch(`assets/lang/${lang}.json`)
        .then(res => res.json())
        .then(data => {

            // تحديث جميع العناصر التي تستعمل data-lang
            document.querySelectorAll("[data-lang]").forEach(el => {
                const key = el.getAttribute("data-lang");

                if (data[key] !== undefined) {

                    // INPUT / TEXTAREA = placeholder
                    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                        el.placeholder = data[key];
                    } 
                    // العناصر العادية
                    else {
                        // لو فيه عناصر داخلية لا نبدلها مثل <span> داخل <a>
                        if (el.children.length > 0) {
                            el.innerHTML = data[key];
                        } else {
                            el.textContent = data[key];
                        }
                    }
                }
            });

            // RTL - LTR
            document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
            document.documentElement.lang = lang;

            // زر اللغة (كمبيوتر)
            const desktopBtn = document.getElementById("lang-toggle");
            if (desktopBtn) {
                desktopBtn.textContent = (lang === "ar") ? "🌐 FR" : "🌐 AR";
            }

            // زر اللغة (هاتف)
            const mobileBtn = document.getElementById("mobile-lang");
            if (mobileBtn) {
                mobileBtn.textContent = (lang === "ar") ? "FR" : "AR";
            }
        });
}


// ===========================
// INIT ON LOAD
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("site_lang") || "ar";
    applyLanguage(saved);

    // زر اللغة — نسخة الحاسوب
    const desktopBtn = document.getElementById("lang-toggle");
    if (desktopBtn) {
        desktopBtn.addEventListener("click", () => {
            const current = localStorage.getItem("site_lang") || "ar";
            const next = current === "ar" ? "fr" : "ar";
            applyLanguage(next);
        });
    }

    // زر اللغة — نسخة الهاتف
    const mobileBtn = document.getElementById("mobile-lang");
    if (mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            const current = localStorage.getItem("site_lang") || "ar";
            const next = current === "ar" ? "fr" : "ar";
            applyLanguage(next);
        });
    }
});
