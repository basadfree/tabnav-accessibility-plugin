/**
 * TabNav Custom Accessibility Plugin
 * Fully customizable and open-source.
 * Icons: inline SVG (universal accessibility symbol + feature glyphs).
 */
(function () {
    // ---------- Inline SVG icons (well-known glyphs: Material Design + Lucide/Feather) ----------
    const ICONS = {
        // Material Design "accessible" icon (person with outstretched arms)
        main: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>',
        // Feather "globe"
        globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        // Feather "circle" half-filled (high contrast)
        contrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"/></svg>',
        // Feather "circle" half-filled opposite (monochrome)
        monochrome: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" stroke="none"/></svg>',
        // Lucide "mouse-pointer" (thick tail to look like a real cursor)
        cursor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6" stroke-width="4"/></svg>',
        // Feather "pause" (stop animations)
        pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
        // Feather "type" (enlarge text)
        textLarge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
        // Text spacing (horizontal arrows)
        textSpacing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="12" x2="3" y2="12"/><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/></svg>',
        // Line height (vertical arrows)
        lineHeight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="21" x2="12" y2="3"/><path d="M8 17l4 4 4-4"/><path d="M8 7l4-4 4 4"/></svg>',
        // Feather "rotate-ccw" (reset)
        reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>'
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
