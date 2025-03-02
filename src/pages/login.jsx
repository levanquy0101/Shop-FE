import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Đăng nhập | {NameApp} </title>
      </Helmet>

      <LoginView />
    </>
  );
}
