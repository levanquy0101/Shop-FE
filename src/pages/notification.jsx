import { Helmet } from 'react-helmet-async';
import { NotificationView } from 'src/sections/notification';
import { NameApp } from 'src/data';
// ----------------------------------------------------------------------

export default function Profile() {
    
  return (
    <>
      <Helmet>
        <title>Đăng thông báo | {NameApp} </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
