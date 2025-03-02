import { Helmet } from 'react-helmet-async';
import { BackupRecoveryView } from 'src/sections/backup-recovery';
import { NameApp } from 'src/data';



// ----------------------------------------------------------------------

export default function BackupRecoveryPage() {
  return (
    <>
      <Helmet>
        <title>Sao lưu & Khôi phục | {NameApp} </title>
      </Helmet>

      <BackupRecoveryView />
    </>
  );
}
