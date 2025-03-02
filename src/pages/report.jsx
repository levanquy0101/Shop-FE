import { Helmet } from 'react-helmet-async';
import { ReportView } from 'src/sections/report';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function Report() {
    
  return (
    <>
      <Helmet>
        <title> Xem báo cáo | {NameApp} </title>
      </Helmet>

      <ReportView />
    </>
  );
}
