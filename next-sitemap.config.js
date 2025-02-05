/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://uku.kg', // Адрес сайта
  generateRobotsTxt: true,  // Генерация robots.txt
  sitemapSize: 5000,        // Максимальное количество ссылок в одном файле sitemap
  changefreq: 'daily',      // Частота обновления страниц (опционально)
  priority: 0.7,            // Приоритет страниц (опционально)\
  async additionalPaths(config) {
    const res = await fetch('https://uku.kg/api/v1/publication/search/?format=json'); // Укажи свой API для получения всех публикаций
    const data = await res.json();

    // Создаём пути для карты сайта
    return data.results.map((item) => ({
      loc: `/detail/${item.id}`, // Путь к странице
      lastmod: item.updated_at || new Date().toISOString(), // Последнее обновление (если есть)
    }));
  },
};