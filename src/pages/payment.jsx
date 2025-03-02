import { Helmet } from 'react-helmet-async';
import { PaymentView } from 'src/sections/payment'
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Tin tức | {NameApp} </title>
      </Helmet>

      <PaymentView />
    </>
  );
}
