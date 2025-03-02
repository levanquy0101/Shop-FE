import { Helmet } from 'react-helmet-async';
import { ProductsView } from 'src/sections/products/view';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Sản phẩm | {NameApp} </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
