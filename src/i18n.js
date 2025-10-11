import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: {},
        en: {}
    }
});

export default i18n;
