import { Helmet } from 'react-helmet-async';
import { AppView } from 'src/sections/overview/view';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>Tổng quan | {NameApp}</title>
      </Helmet>

      <AppView />
    </>
  );
}
