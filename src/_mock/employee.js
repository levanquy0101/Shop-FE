import { sample } from 'lodash';
import { en, vi, Faker } from '@faker-js/faker';

const faker = new Faker({
  locale: [vi, en],
});
// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Nhân viên bán hàng',
    'Nhân viên kho',
  ]),
}));
