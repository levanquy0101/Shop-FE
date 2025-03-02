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

import * as CustomerService from 'src/services/api/CustomerService';
import { Avatar, IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, Popover, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import TableNoData from '../table-no-data';
import ModalDelete from 'src/ui/ModalSimple';
// import { Active, Banned } from 'src/ui/Status';
import { toast } from 'react-toastify';

function CustomerList() {

    const [customers, setCustomers] = useState([])

  const [itemOption, setItemOption] = useState([])
  const [open, setOpen] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    getAllCustomers()
  }, []);

  const handleSubmit = async () => {
    await CustomerService.removeCustomer(itemOption.id)
    setItemOption([])
    toast.success("Đã xóa khách hàng thành công ")
    closeModal();
    getAllCustomers()
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
    navigate("/dashboard/customer/edit/" + itemOption.id);
    setItemOption([])
  };

  const getAllCustomers = async () => {
    const response = await CustomerService.getAllCustomer()
    console.table(response);
    setCustomers(response);
  }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Quản lý khách hàng</Typography>

                <Button variant="contained" color="inherit" component={Link} to="/dashboard/customer/create" startIcon={<Iconify icon="eva:plus-fill" />}>
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
                        placeholder="Tìm kiếm khách hàng ..."
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
                                    <TableCell>Mã khách hàng</TableCell>
                                    <TableCell>Tên khách hàng</TableCell>
                                    <TableCell>Giới tính</TableCell>
                                    <TableCell>Điểm</TableCell>
                                    <TableCell>Bậc</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers?.map((row, index) => (
                                    <>
                                        <TableRow key={row.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {<Avatar src={row?.avatarUrl} alt={row.name} sx={{ width: 36, height: 36, }}> {row.name?.charAt(0).toUpperCase()}</Avatar>}
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.gender === 0 ? "Nam" : row.gender === 1 ? "Nữ" : "Khác"}</TableCell>
                                            <TableCell>{row.points}</TableCell>
                                            <TableCell>{row?.customerLevel?.name}</TableCell>
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
                        {customers?.length === 0 && <TableNoData />}
                    </TableContainer>
                </Scrollbar>
            </Card>
            <ModalDelete isOpen={isModalOpen}
                onClose={closeModal} title={"Xóa khách hàng"}
                content={<>
                    <span>Bạn có chắc xóa khách hàng tên: {itemOption.name}</span>
                    <br />
                    <span>và có mã: {itemOption.code}</span>
                </>
                }
                submit={handleSubmit} />
        </Container>
    );
}

export default CustomerList;