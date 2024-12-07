/* eslint-disable */
const fs = require('fs');
const path = require('path');
const iconsPath = path.join(__dirname, '..', 'src/assets/icons');

const main = () => {
  reCreateIcons();
  fs.watch(iconsPath, (eventType, filename) => {
    console.log('Local icons updated');
    reCreateIcons();
  });
};

const reCreateIcons = () => {
  let icons = fs.readdirSync(iconsPath);
  const constPath = path.join(
    __dirname,
    '..',
    'src/components/atoms/Icon/const.ts'
  );
  icons = icons.map(icon => {
    const split = icon.split('.');
    if (split[split.length - 1] === 'svg') {
      return split[0];
    }
  });

  fs.writeFileSync(constPath, '');
  icons.forEach(icon => {
    if (icon) {
      const newConst = `export { default as ${icon} } from '@/assets/icons/${icon}.svg';\n`;
      fs.appendFileSync(constPath, newConst);
    }
  });
};

main();

// on proccess stop it should stop watching
process.on('SIGINT', () => {
  console.log('Stopping watch-icons script');
  fs.unwatchFile(iconsPath);
  process.exit();
});
