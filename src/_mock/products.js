import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Áo sơ mi trắng nam',
  'Đầm hoa dài tay nữ',
  'Quần tây công sở nam',
  'Áo khoác dạ nữ',
  'Áo len nam cổ lọ',
  'Váy đi tiệc nữ',
  'Quần jeans nam',
  'Áo khoác bomber unisex',
  'Đầm body nữ',
  'Áo khoác da nam',
  'Áo thun trơn nữ',
  'Quần baggy nam',
  'Áo hoodie nữ',
  'Quần culottes nữ',
  'Áo vest nam',
  'Váy xòe nữ',
  'Áo phông nam',
  'Đầm suông nữ',
  'Quần short nam',
  'Áo khoác gió nữ',
  'Áo ba lỗ nam',
  'Đầm công sở nữ',
  'Quần thể thao nam',
  'Áo khoác khoác ngoài nữ'
];

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: faker.image.fashion(),
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});
