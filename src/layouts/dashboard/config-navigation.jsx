import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfigManager = [
  {
    title: 'Tổng quan',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Thông tin cá nhân',
    path: '/dashboard/me',
    icon: icon('ic_profile'),
  },
  {
    title: 'Sản phẩm kho',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Nhập liệu',
    path: '/dashboard/import-products',
    icon: icon('ic_report'),
  },
  {
    title: 'Nhân viên',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'Khách hàng',
    path: '/dashboard/customers',
    icon: icon('ic_user'),
  },
  {
    title: 'Xem báo cáo',
    path: '/dashboard/report',
    icon: icon('ic_report'),
  },
  {
    title: 'Đăng thông báo',
    path: '/dashboard/notification',
    icon: icon('ic_noti'),
  },
  {
    title: 'Tin tức',
    path: '/dashboard/news',
    icon: icon('ic_blog'),
  },
  {
    title: 'Sao lưu | Khôi phục',
    path: '/dashboard/backup-recovery',
    icon: icon('ic_backup_recovery'),
  },

  {
    title: 'Trang chủ',
    path: '/',
    icon: icon('ic_home'),
  },
];

export const navConfigSalesMan = [
  {
    title: 'Tổng quan',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Thông tin cá nhân',
    path: '/dashboard/me',
    icon: icon('ic_profile'),
  },
  {
    title: 'Sản phẩm kho',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Khách hàng',
    path: '/dashboard/customers',
    icon: icon('ic_user'),
  },
  {
    title: 'Thanh toán',
    path: '/dashboard/payment',
    icon: icon('ic_report'),
  },
  {
    title: 'Thống kê',
    path: '/dashboard/statistical',
    icon: icon('ic_statistical'),
  },
  {
    title: 'Xem thông báo',
    path: '/dashboard/view-notification',
    icon: icon('ic_noti'),
  },
  {
    title: 'Trang chủ',
    path: '/',
    icon: icon('ic_home'),
  },
];
export const navConfigWareHouse = [
  {
    title: 'Tổng quan',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Thông tin cá nhân',
    path: '/dashboard/me',
    icon: icon('ic_profile'),
  },
  {
    title: 'Sản phẩm kho',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Nhập liệu',
    path: '/dashboard/import-products',
    icon: icon('ic_report'),
  },
  {
    title: 'Thống kê',
    path: '/dashboard/statistical',
    icon: icon('ic_statistical'),
  },
  {
    title: 'Xem thông báo',
    path: '/dashboard/view-notification',
    icon: icon('ic_noti'),
  },
  {
    title: 'Trang chủ',
    path: '/',
    icon: icon('ic_home'),
  },
];

