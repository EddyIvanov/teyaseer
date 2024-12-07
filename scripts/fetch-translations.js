/* eslint-disable */
const { createClient } = require('contentful');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
});

async function fetchTranslations() {
  try {
    const locales = ['en', 'ar'];

    for (const locale of locales) {
      const assets = await client.getEntries({
        content_type: 'appKey',
        locale,
        limit: 1000,
      });
      const translations = {};

      assets.items.forEach(item => {
        translations[item.fields.key] = item.fields.displayText;
      });

      const dirPath = path.join(
        __dirname,
        '..',
        'src/localization/locales',
        locale
      );
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const filePath = path.join(dirPath, 'common.json');
      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
    }
  } catch (error) {
    console.error('Error fetching translations', error);
  }
}

fetchTranslations();

/* eslint-enable */
