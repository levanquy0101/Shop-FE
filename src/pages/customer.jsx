import { Helmet } from 'react-helmet-async';
import CustomerList  from 'src/sections/customer/view/CustomerList';
import { NameApp } from 'src/data';
// ----------------------------------------------------------------------

export default function Profile() {
    
  return (
    <>
      <Helmet>
        <title> Khách hàng | {NameApp} </title>
      </Helmet>

      <CustomerList />
    </>
  );
}
