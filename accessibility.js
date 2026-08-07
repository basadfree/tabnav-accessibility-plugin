/**
 * TabNav Custom Accessibility Plugin
 * Fully customizable and open-source.
 */
(function () {
    // translations (English, Hebrew, Spanish, French)
    const translations = {
        en: {
            title: "Accessibility Menu",
            disclaimerTitle: "Terms of Use",
            disclaimerText: "By using this plugin, you acknowledge that the developers hold no liability for the absolute compliance level of this website. We build with love and strive to cover maximum requirements.",
            acceptBtn: "I Agree & Open Menu",
            contrast: "High Contrast",
            monochrome: "Monochrome",
            bigCursor: "Large Cursor",
            stopAnimations: "Stop Animations",
            textLarge: "Enlarge Text",
            textSpacing: "Text Spacing",
            lineHeight: "Line Height",
            reset: "Reset Settings",
            close: "Close"
        },
        he: {
            title: "תפריט נגישות",
            disclaimerTitle: "תנאי שימוש והצהרה",
            disclaimerText: "בעת השימוש בתוסף זה, הינך מאשר כי למפתחים אין כל אחריות על רמת הנגישות הסופית של האתר. אנו משתדלים למלא באהבה את כל הנדרש והמומלץ.",
            acceptBtn: "אני מסכים ופתח תפריט",
            contrast: "ניגודיות גבוהה",
            monochrome: "שחור-לבן",
            bigCursor: "סמן גדול",
            stopAnimations: "עצירת אנימציות",
            textLarge: "הגדלת טקסט",
            textSpacing: "מרווח טקסט",
            lineHeight: "מרווח שורות",
            reset: "שחזר ברירת מחדל",
            close: "סגור"
        },
        es: {
            title: "Menú de Accesibilidad",
            disclaimerTitle: "Términos de Uso",
            disclaimerText: "Al usar este complemento, usted acepta que los desarrolladores no asumen ninguna responsabilidad por el nivel de cumplimiento del sitio. Creamos con amor y nos esforzamos por cumplir con los requisitos.",
            acceptBtn: "Acepto y Abrir Menú",
            contrast: "Alto Contraste",
            monochrome: "Monocromo",
            bigCursor: "Cursor Grande",
            stopAnimations: "Detener Animaciones",
            textLarge: "Agrandar Texto",
            textSpacing: "Espaciado de Texto",
            lineHeight: "Altura de Línea",
            reset: "Restablecer",
            close: "Cerrar"
        },
        fr: {
            title: "Menu d'Accessibilité",
            disclaimerTitle: "Conditions d'Utilisation",
            disclaimerText: "En utilisant ce plugin, vous reconnaissez que les développeurs déclinent toute responsabilité quant au niveau de conformité du site. Nous développons avec amour et nous efforçons de répondre aux exigences.",
            acceptBtn: "J'accepte et Ouvrir",
            contrast: "Contraste Élevé",
            monochrome: "Monochrome",
            bigCursor: "Grand Curseur",
            stopAnimations: "Arrêter les Animations",
            textLarge: "Agrandir le Texte",
            textSpacing: "Espacement du Texte",
            lineHeight: "Hauteur de Ligne",
            reset: "Réinitialiser",
            close: "Fermer"
        }
    };

    const FEATURE_CLASSES = {
        contrast: 'acc-high-contrast',
        monochrome: 'acc-monochrome',
        cursor: 'acc-big-cursor',
        animations: 'acc-stop-animations',
        'text-large': 'acc-text-large',
        'text-spacing': 'acc-text-spacing',
        'line-height': 'acc-line-height'
    };

    class AccessibilityPlugin {
        constructor(options = {}) {
            this.options = Object.assign({
                position: 'bottom-right',
                primaryColor: '#0056b3',
                defaultLanguage: 'en',
                iconShape: 'circle'
            }, options);

            this.currentLang = this.options.defaultLanguage;
            this.isDisclaimerAccepted = localStorage.getItem('acc_disclaimer_accepted') === 'true';

            this.init();
        }

        init() {
            this.createDOM();
            this.bindEvents();
        }

        createDOM() {
            this.triggerBtn = document.createElement('button');
            this.triggerBtn.className = 'acc-trigger-btn ' + this.options.position + ' ' + this.options.iconShape;
            this.triggerBtn.style.backgroundColor = this.options.primaryColor;
            this.triggerBtn.innerHTML = '&#9855;';
            this.triggerBtn.setAttribute('aria-label', 'Open Accessibility Options');
            document.body.appendChild(this.triggerBtn);

            this.panel = document.createElement('div');
            this.panel.className = 'acc-main-panel ' + this.options.position;
            if (this.currentLang === 'he') this.panel.classList.add('rtl');

            this.renderContent();
            document.body.appendChild(this.panel);
        }

        renderContent() {
            const t = translations[this.currentLang];

            if (!this.isDisclaimerAccepted) {
                this.panel.innerHTML = `
                    <div class="acc-header" style="background-color: ${this.options.primaryColor}">
                        <h3>${t.disclaimerTitle}</h3>
                        <button class="acc-close-btn" aria-label="${t.close}">&times;</button>
                    </div>
                    <div class="acc-body disclaimer-body">
                        <p>${t.disclaimerText}</p>
                        <button class="acc-accept-btn" style="background-color: ${this.options.primaryColor}">${t.acceptBtn}</button>
                    </div>
                `;
            } else {
                this.panel.innerHTML = `
                    <div class="acc-header" style="background-color: ${this.options.primaryColor}">
                        <h3>${t.title}</h3>
                        <button class="acc-close-btn" aria-label="${t.close}">&times;</button>
                    </div>
                    <div class="acc-language-selector">
                        <select id="acc-lang-select" aria-label="Language">
                            <option value="en" ${this.currentLang === 'en' ? 'selected' : ''}>English</option>
                            <option value="he" ${this.currentLang === 'he' ? 'selected' : ''}>עברית</option>
                            <option value="es" ${this.currentLang === 'es' ? 'selected' : ''}>Español</option>
                            <option value="fr" ${this.currentLang === 'fr' ? 'selected' : ''}>Français</option>
                        </select>
                    </div>
                    <div class="acc-body grid-layout">
                        <button class="acc-feature-btn" data-action="contrast" aria-pressed="false">&#127793; <span>${t.contrast}</span></button>
                        <button class="acc-feature-btn" data-action="monochrome" aria-pressed="false">&#9899; <span>${t.monochrome}</span></button>
                        <button class="acc-feature-btn" data-action="cursor" aria-pressed="false">&#127991; <span>${t.bigCursor}</span></button>
                        <button class="acc-feature-btn" data-action="animations" aria-pressed="false">&#9208;&#65039; <span>${t.stopAnimations}</span></button>
                        <button class="acc-feature-btn" data-action="text-large" aria-pressed="false">&#128269; <span>${t.textLarge}</span></button>
                        <button class="acc-feature-btn" data-action="text-spacing" aria-pressed="false">&#8596;&#65039; <span>${t.textSpacing}</span></button>
                        <button class="acc-feature-btn" data-action="line-height" aria-pressed="false">&#8597;&#65039; <span>${t.lineHeight}</span></button>
                    </div>
                    <div class="acc-footer">
                        <button class="acc-reset-btn">${t.reset}</button>
                    </div>
                `;
            }
        }

        bindEvents() {
            this.triggerBtn.addEventListener('click', () => {
                this.panel.classList.toggle('active');
            });

            this.panel.addEventListener('click', (e) => {
                if (e.target.classList.contains('acc-close-btn')) {
                    this.panel.classList.remove('active');
                    return;
                }

                if (e.target.classList.contains('acc-accept-btn')) {
                    localStorage.setItem('acc_disclaimer_accepted', 'true');
                    this.isDisclaimerAccepted = true;
                    this.renderContent();
                    return;
                }

                const featureBtn = e.target.closest('.acc-feature-btn');
                if (featureBtn) {
                    const action = featureBtn.getAttribute('data-action');
                    this.toggleFeature(action, featureBtn);
                    return;
                }

                if (e.target.classList.contains('acc-reset-btn')) {
                    this.resetAll();
                }
            });

            this.panel.addEventListener('change', (e) => {
                if (e.target.id === 'acc-lang-select') {
                    this.currentLang = e.target.value;
                    this.panel.classList.toggle('rtl', this.currentLang === 'he');
                    this.renderContent();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.panel.classList.remove('active');
                }
            });
        }

        toggleFeature(action, btn) {
            btn.classList.toggle('active');
            const pressed = btn.classList.contains('active');
            btn.setAttribute('aria-pressed', String(pressed));

            const cls = FEATURE_CLASSES[action];
            if (cls) {
                document.documentElement.classList.toggle(cls, pressed);
            }
        }

        resetAll() {
            document.querySelectorAll('.acc-feature-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            const html = document.documentElement;
            Object.values(FEATURE_CLASSES).forEach(cls => html.classList.remove(cls));

            const activeBtn = this.panel.querySelector('.acc-feature-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
        }
    }

    window.AccessibilityPlugin = AccessibilityPlugin;
})();
