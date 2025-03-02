import { Helmet } from 'react-helmet-async';
import { ImportProductsView } from 'src/sections/product-inventory';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Nhập liệu | {NameApp} </title>
      </Helmet>

      <ImportProductsView />
    </>
  );
}
