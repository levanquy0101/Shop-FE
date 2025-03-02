import { Helmet } from 'react-helmet-async';
import { ProfileView } from 'src/sections/profile';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function Profile() {
    
  return (
    <>
      <Helmet>
        <title> Name | {NameApp} </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
