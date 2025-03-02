import { Helmet } from 'react-helmet-async';
import { StatisticalView } from 'src/sections/statistical';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function Report() {
    
  return (
    <>
      <Helmet>
        <title> Thống kê | {NameApp} </title>
      </Helmet>
      <StatisticalView />
    </>
  );
}
