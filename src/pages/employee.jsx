import { Helmet } from 'react-helmet-async';
import EmployeeList  from 'src/sections/employee/view/EmployeeList';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Nhân viên | {NameApp} </title>
      </Helmet>

      <EmployeeList />
    </>
  );
}
