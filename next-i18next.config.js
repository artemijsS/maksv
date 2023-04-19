const path = require('path')

module.exports = {
    i18n: {
        locales: ['lv', 'ru', 'en'],
        defaultLocale: 'lv',
        localeDetection: false,
    },
    localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : './public/locales',
}
