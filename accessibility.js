/**
 * TabNav Custom Accessibility Plugin
 * Fully customizable and open-source.
 * Icons: inline SVG (universal accessibility symbol + feature glyphs).
 */
(function () {
    // ---------- Inline SVG icon set (stroke-based, inherits currentColor) ----------
    const ICONS = {
        // Universal accessibility symbol (person in a circle)
        main: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.6"/><circle cx="12" cy="5.6" r="2" fill="currentColor" stroke="none"/><path d="M12 8.4v6.6M12 12.6l-4.8 4.4M12 12.6l4.8 4.4M6.8 10.2h10.4"/></svg>',
        globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.5 3.9 5.6 3.9 9s-1.3 6.5-3.9 9c-2.6-2.5-3.9-5.6-3.9-9s1.3-6.5 3.9-9z"/></svg>',
        contrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>',
        monochrome: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none"/></svg>',
        cursor: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l15 8-6.5 1.8L10.6 19 8 16.4 4 18z"/></svg>',
        pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 5v14M15 5v14"/></svg>',
        textLarge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21l4-12 4 12M9.5 17h5"/><path d="M19 5v3M17.5 6.5h3"/></svg>',
        textSpacing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3-3 3 3M3 16l3 3 3-3M4 12h16M21 8l-3-3-3 3M21 16l-3 3-3-3M20 12h-16"/></svg>',
        lineHeight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l4-4 4 4M8 18l4 4 4-4M12 2v20"/></svg>',
        reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg>'
    };

    // ---------- Translations (English, Hebrew, Spanish, French) ----------
    const translations = {
        en: {
            title: "Accessibility Menu",
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

    const FEATURE_ICONS = {
        contrast: 'contrast',
        monochrome: 'monochrome',
        cursor: 'cursor',
        animations: 'pause',
        'text-large': 'textLarge',
        'text-spacing': 'textSpacing',
        'line-height': 'lineHeight'
    };

    class AccessibilityPlugin {
        constructor(options = {}) {
            this.options = Object.assign({
                position: 'bottom-right',
                primaryColor: '#0056b3',
                defaultLanguage: 'en',
                autoDetectLanguage: true,
                iconShape: 'circle'
            }, options);

            this.currentLang = this.resolveLanguage();
            this.init();
        }

        // Detects browser language automatically when enabled.
        resolveLanguage() {
            const supported = Object.keys(translations);
            const fallback = this.options.defaultLanguage;

            if (this.options.autoDetectLanguage) {
                const nav = navigator.language || navigator.userLanguage || '';
                const lang = String(nav).toLowerCase().split('-')[0];
                if (supported.indexOf(lang) !== -1) return lang;
            }
            return supported.indexOf(fallback) !== -1 ? fallback : 'en';
        }

        init() {
            this.createDOM();
            this.bindEvents();
        }

        createDOM() {
            this.triggerBtn = document.createElement('button');
            this.triggerBtn.className = 'acc-trigger-btn ' + this.options.position + ' ' + this.options.iconShape;
            this.triggerBtn.style.backgroundColor = this.options.primaryColor;
            this.triggerBtn.innerHTML = ICONS.main;
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
            const headerStyle = 'background: linear-gradient(135deg, ' + this.options.primaryColor + ' 0%, ' + this.shade(this.options.primaryColor, -25) + ' 100%)';

            this.panel.innerHTML = `
                <div class="acc-header" style="${headerStyle}">
                    <h3><span class="acc-header-icon">${ICONS.main}</span>${t.title}</h3>
                    <button class="acc-close-btn" aria-label="${t.close}">&times;</button>
                </div>
                <div class="acc-language-selector">
                    <span class="acc-globe">${ICONS.globe}</span>
                    <select id="acc-lang-select" aria-label="Language">
                        <option value="en" ${this.currentLang === 'en' ? 'selected' : ''}>English</option>
                        <option value="he" ${this.currentLang === 'he' ? 'selected' : ''}>עברית</option>
                        <option value="es" ${this.currentLang === 'es' ? 'selected' : ''}>Español</option>
                        <option value="fr" ${this.currentLang === 'fr' ? 'selected' : ''}>Français</option>
                    </select>
                </div>
                <div class="acc-body grid-layout">
                    ${Object.keys(FEATURE_CLASSES).map(action => `
                        <button class="acc-feature-btn" data-action="${action}" aria-pressed="false">
                            <span class="acc-ico">${ICONS[FEATURE_ICONS[action]]}</span>
                            <span>${t[this.translationKey(action)]}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="acc-footer">
                    <button class="acc-reset-btn"><span class="acc-reset-icon">${ICONS.reset}</span>${t.reset}</button>
                </div>
            `;
        }

        translationKey(action) {
            const map = {
                contrast: 'contrast',
                monochrome: 'monochrome',
                cursor: 'bigCursor',
                animations: 'stopAnimations',
                'text-large': 'textLarge',
                'text-spacing': 'textSpacing',
                'line-height': 'lineHeight'
            };
            return map[action];
        }

        bindEvents() {
            this.triggerBtn.addEventListener('click', () => {
                this.panel.classList.toggle('active');
            });

            this.panel.addEventListener('click', (e) => {
                if (e.target.closest('.acc-close-btn')) {
                    this.panel.classList.remove('active');
                    return;
                }

                const featureBtn = e.target.closest('.acc-feature-btn');
                if (featureBtn) {
                    const action = featureBtn.getAttribute('data-action');
                    this.toggleFeature(action, featureBtn);
                    return;
                }

                if (e.target.closest('.acc-reset-btn')) {
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

        openMenu() {
            this.panel.classList.add('active');
        }

        closeMenu() {
            this.panel.classList.remove('active');
        }

        shade(hex, percent) {
            const num = parseInt(hex.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const r = Math.max(0, Math.min(255, (num >> 16) + amt));
            const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
            const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
            return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
            this.panel.querySelectorAll('.acc-feature-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            const html = document.documentElement;
            Object.values(FEATURE_CLASSES).forEach(cls => html.classList.remove(cls));
        }
    }

    window.AccessibilityPlugin = AccessibilityPlugin;
})();
