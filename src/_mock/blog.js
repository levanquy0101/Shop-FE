import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Mẫu bảng vẽ trắng bởi các lãnh đạo ngành công nghiệp',
  'Nhà trại lều xếp Tesla được lấy cảm hứng từ Tesla Cybertruck dành cho các fan không thể chờ đợi thêm!',
  'Thiết kế trang Landing của Designify Agency',
  '✨Những gì đã qua rồi thì đã qua rồi ✨',
  'Hoàng tử tươi mới',
  'Six Socks Studio',
  'Sự kiện crossing over của Vincenzo De Cotiis thể hiện một nghiên cứu về sự ô nhiễm',
  'Hướng dẫn tạo hiệu ứng đơn giản, đẹp trong dự án của bạn | Hướng dẫn video',
  '40 phông chữ Serif miễn phí dành cho các nhà thiết kế số',
  'Khám phá sự tiến hóa của khách hàng thiết kế web điển hình',
  'Katie Griffin yêu thích sự nghệ thuật mang lại cảm giác nhà cửa',
  'Giấc mơ Mỹ qua lại qua đồ họa đường sắt thế kỷ trung',
  'Thiết kế hệ thống minh họa',
  'Ứng dụng CarZio-Delivery Driver App Đăng nhập/Đăng ký',
  'Làm thế nào để tạo ra một ứng dụng Jamstack không cần máy chủ sử dụng Netlify, Gatsby và Fauna',
  'Tylko Sắp xếp một cách dễ dàng - Thiết kế 3D & Động',
  'RAYO ?? Một danh tính lễ hội nghệ thuật mở rộng',
  'Anthony Burrill và Andrew Diprose của tạp chí Wired thảo luận về cách họ làm nên bìa Change Everything của tháng Một',
  'Bên trong tâm trí của Samuel Day',
  'Đánh giá Portfolio: Liệu portfolio này có quá sáng tạo không?',
  'Akkers van Margraten',
  'Biểu tượng vé Gradient',
  'Đây là một ý tưởng xe máy Dyson không ',
  'Làm thế nào để tạo hiệu ứng động cho SVG với border-image',
];


export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
