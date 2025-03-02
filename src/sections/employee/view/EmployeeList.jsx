import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Moment from 'moment';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';


// import UserTableToolbar from '../user-table-toolbar';
import * as EmployeeService from 'src/services/api/EmloyeeService';
import { Avatar, IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, Popover, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import TableNoData from '../table-no-data';
import ModalDelete from 'src/ui/ModalSimple';
import { Active, Banned } from 'src/ui/Status';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

function EmployeeList() {

  const [employees, setEmployees] = useState([])

  const [itemOption, setItemOption] = useState([])
  const [open, setOpen] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    getAllEmployees()
  }, []);

  const handleSubmit = async () => {
    await EmployeeService.removeEmployee(itemOption.id)
    setItemOption([])
    toast.success("Đã xóa nhân viên thành công ")
    closeModal();
    getAllEmployees()
  };

  const handleOpenMenu = (event, itemChoose) => {
    setItemOption(itemChoose)
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
    setItemOption([])
  };
  const handleCloseMenuDel = () => {
    setModalOpen(true)
    setOpen(null);
    // setItemOption([])
  };

  const handleCloseMenuEdit = () => {
    setOpen(null);
    navigate("/dashboard/employee/edit/" + itemOption.id);
    setItemOption([])
  };

  const getAllEmployees = async () => {
    const response = await EmployeeService.getAllEmployee()
    console.table(response);
    setEmployees(response)
  }



  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý nhân viên</Typography>

        <Button variant="contained" color="inherit" component={Link} to="/dashboard/employee/create" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm mới
        </Button>
      </Stack>

      <Card>
        <Toolbar sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
        }} >
          <OutlinedInput
            placeholder="Tìm kiếm nhân viên ..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </Toolbar>
        <Scrollbar>
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã nhân viên</TableCell>
                  <TableCell>Tên nhân viên</TableCell>
                  <TableCell>Vị trí</TableCell>
                  <TableCell>Giới tính</TableCell>
                  <TableCell>Ngày sinh</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.map((row, index) => (
                  <>
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {<Avatar src={row?.avatarUrl} alt={row.name} sx={{ width: 36, height: 36, }}> {row.name?.charAt(0).toUpperCase()}</Avatar>}
                        {row.name}
                      </TableCell>
                      <TableCell>{row.role.id == 3 ? "Nhân viên bán hàng" : row.role.id === 4 ? "Nhân viên quản kho" : ""}</TableCell>
                      <TableCell>{row.gender === 0 ? "Nam" : row.gender === 1 ? "Nữ" : "Khác"}</TableCell>
                      <TableCell>{Moment(row.dob).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.enabled ? <Active /> : <Banned />}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={e => handleOpenMenu(e, row)} >
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <Popover
                      open={!!open}
                      anchorEl={open}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: { width: 140 },
                      }}
                    >
                      <MenuItem onClick={handleCloseMenuEdit}>
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Sửa
                      </MenuItem>

                      <MenuItem onClick={handleCloseMenuDel} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                        Xóa
                      </MenuItem>
                    </Popover>
                  </>
                ))}
              </TableBody>
            </Table>
            {employees.length === 0 && <TableNoData />}
          </TableContainer>
        </Scrollbar>
      </Card>
      <ModalDelete isOpen={isModalOpen}
        onClose={closeModal} title={"Xóa nhân viên"}
        content={<>
          <span>Bạn có chắc xóa nhân viên tên: {itemOption.name}</span>
          <br />
          <span>và có mã: {itemOption.code}</span>
        </>
        }
        submit={handleSubmit} />
    </Container>
  );
}

export default EmployeeList;