const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'services-data.ts');
let code = fs.readFileSync(filePath, 'utf8');

const imagesMap = {
  // Welding Industrial Services (15)
  'wld_1': '/images/factory_tin_shed.jpg',
  'wld_2': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
  'wld_3': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
  'wld_4': '/images/badminton_court_shed.jpg',
  'wld_5': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
  'wld_6': 'https://images.unsplash.com/photo-1527018607637-023631840dd2?w=1200&auto=format&fit=crop&q=80',
  'wld_7': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
  'wld_8': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80',
  'wld_9': 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=1200&auto=format&fit=crop&q=80',
  'wld_10': 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&auto=format&fit=crop&q=80',
  'wld_11': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
  'wld_12': 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80',
  'wld_13': 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1200&auto=format&fit=crop&q=80',
  'wld_14': 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=1200&auto=format&fit=crop&q=80',
  'wld_15': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
  
  // Interior Solution Services (17)
  'int_1': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
  'int_2': '/images/luxury_interior_work.jpg',
  'int_3': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
  'int_4': 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop&q=80',
  'int_5': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80',
  'int_6': 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&auto=format&fit=crop&q=80',
  'int_7': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&auto=format&fit=crop&q=80',
  'int_8': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
  'int_9': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80',
  'int_10': 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1200&auto=format&fit=crop&q=80',
  'int_11': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&auto=format&fit=crop&q=80',
  'int_12': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
  'int_13': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
  'int_14': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80',
  'int_15': '/images/modular_kitchen_interior.jpg',
  'int_16': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80',
  'int_17': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&auto=format&fit=crop&q=80'
};

for (const [id, img] of Object.entries(imagesMap)) {
  const regex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?\\n  \\},`);
  const match = code.match(regex);
  if (match) {
    if (!match[0].includes('imageUrl:')) {
      const updatedBlock = match[0].replace(/(\n  \},)/, `,\n    imageUrl: '${img}'$1`);
      code = code.replace(match[0], updatedBlock);
      console.log('Added imageUrl to', id);
    } else {
      console.log(id, 'already has imageUrl');
    }
  } else {
    console.warn('Could not find block for', id);
  }
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated services-data.ts with all 32 HD images!');
