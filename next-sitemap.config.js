module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.maksv.lv',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://www.maksv.lv/server-sitemap.xml',
        ],
    },
};
