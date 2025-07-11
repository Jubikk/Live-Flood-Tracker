import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

export async function fetchPagasaData() {
  try {
    const response = await axios.get('https://bagong.pagasa.dost.gov.ph/flood');
    const $ = cheerio.load(response.data);
    const levels = [];

    $('table tr').each((i, row) => {
      const tds = $(row).find('td');
      if (tds.length >= 3) {
        levels.push({
          area: $(tds[0]).text().trim(),
          level: $(tds[1]).text().trim(),
          timestamp: $(tds[2]).text().trim()
        });
      }
    });
    return levels;
  } catch (err) {
    console.error("Error fetching PAGASA data:", err);
    return [];
  }
}
