import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Container, Card, CardContent, Grid, Box } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import { fCurrency } from 'src/utils/format-number';
import { account } from 'src/_mock/account';
import { useForm } from 'react-hook-form';
import * as ProductSizesColorsService from '../../services/api/ProductSizesColorsService'
import { toast } from 'react-toastify';
import * as InventoryService from '../../services/api/InventoryService'

function ProductInventory(props) {
    const currentDate = new Date().toISOString().split('T')[0];
    const [codeAuto, setCodeAuto] = useState(()=> generateRandomNumericCode(0))
    const [productSizesColors, setProductSizesColors] = useState([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const initialRow = { id: Date.now()};
    const [rows, setRows] = useState([initialRow]);

    const handleChange = (e, id, field) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, [field]: e.target.value } : row
        );
        setRows(updatedRows);
        setProductSizesColors(updatedRows)
    };

    const handleChangeCode = async (e, id, field) => {
        const codeValue = e.target.value;
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, [field]: codeValue } : row
        );
        setRows(updatedRows);

        try {
            if (!codeValue.startsWith("PSC")) {
                const newRows = updatedRows.map(row =>
                    row.id === id ? { ...row, name: '', quantity: '', color: '',size: '', price: '' } : row
                );
                setRows(newRows);
                toast.dismiss()
                toast.warn("Mã hàng phải bắt đầu là: PSC")
                return;
            }

            const isDuplicateCode = updatedRows.some(row => row.id !== id && row.code === codeValue);
            if (isDuplicateCode) {
                const newRows = updatedRows.map(row =>
                    row.id === id ? { ...row, name: '', quantity: '', color: '', size: '', price: '' } : row
                );
                setRows(newRows);
                toast.dismiss()
                toast.warn("Mã hàng đã tồn tại trong danh sách");
                return;
            }

            const details = await ProductSizesColorsService.getByCode(codeValue);
            if (details) {
                const { product, sizes, colors , quantity } = details;
                const updatedRow = { ...updatedRows.find(row => row.id === id) };
                updatedRow.name = product?.name;
                updatedRow.quantity = quantity;
                updatedRow.size = sizes?.name;
                updatedRow.color = colors?.name;
                updatedRow.price = product?.price;
                const newRows = updatedRows.map(row =>
                    row.id === id ? updatedRow : row
                );
                console.log(newRows);
                setProductSizesColors(newRows)
                setRows(newRows);
            }
            toast.dismiss()
            toast.success("Đã tìm thấy mã sản phẩm");
        } catch (error) {
            const newRows = updatedRows.map(row =>
                row.id === id ? { ...row, name: '', quantity: '', color: '',size: '', price: '' } : row
            );
            setRows(newRows);
            console.error("Error fetching details:", error);
            toast.dismiss()
            toast.warn("Không tìm thấy mã sản phẩm");
        }

        
    };

    const handleAddRow = () => {
        setRows([...rows, { ...initialRow, id: Date.now() }]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    const handleCancel = () => {
        setRows([{ id: Date.now()}]); // Khôi phục lại dữ liệu ban đầu
    };

    function generateRandomNumericCode(length) {
        const timestamp = Date.now().toString(); // Sử dụng timestamp hiện tại
        const randomNum = Math.random().toString().substr(2, length); // Sử dụng một số ngẫu nhiên
        return timestamp + randomNum;
    }


    const handleSave = () => {
        // Xử lý lưu dữ liệu khi người dùng nhấn nút Save
        console.log('Rows after save:', rows);
    };

    const onSubmit = async (data) => {
        try {
            const inventoryDetails = productSizesColors?.map(detail => ({
                codeProductSizesColors: detail.code,
                newQuantity: detail.quantity
            }));
            if (!inventoryDetails || inventoryDetails.length === 0) {
                toast.warn("Vui lòng điền đầy đủ thông tin cho từng mã hàng !")
                return;
            }
            // console.log(inventoryDetails);
            data.inventoryDetails = inventoryDetails;
            console.log(data);
            await InventoryService.create(data)
            setRows([initialRow]);
            reset();
            // navigate("/dashboard/customers");
            toast.success("Nhập kho thành công")
        } catch (e) {
            // if(e.response.data.error){
            //     toast.error(e.response.data.error)
            //     return;
            // }
            // toast.error("Nhập kho thất bại")
            console.log(e)
            return;
        }
    };
    return (
        <Container>
            <Card>
                <CardContent >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                label="Mã phiếu"
                                type="text"
                                variant="outlined"
                                margin="normal"
                                value={codeAuto}
                                required
                                {...register("code", {})}
                            />
                            <TextField
                                fullWidth
                                label="Mã người nhập"
                                type="text"
                                variant="outlined"
                                margin="normal"
                                value={account.codeUser}
                                required
                                {...register("codeEmployee", {})}
                            />
                            <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                margin="normal"
                                label="Ngày nhập hàng"
                                value={currentDate}
                                required
                                InputLabelProps={{ shrink: true }}
                                {...register("date", {})}

                            />
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Mã hàng</TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Đơn giá ( VND )</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell sx={{minWidth: 120}}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    value={row.code}
                                                    onChange={(e) => handleChangeCode(e, row.id, 'code')}
                                                    // {...register("codeProductSizesColors", {})}
                                                />
                                            </TableCell>
                                            <TableCell sx={{minWidth: 320}}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    value={`${row?.name || ''}${row?.name && row?.color ? ' màu ' : ''}${row?.color || ''}`}
                                                    // value={row.name}
                                                    disabled
                                                // onChange={(e) => handleChange(e, row.id, 'phone')}
                                                />
                                            </TableCell>
                                            <TableCell sx={{minWidth: 100}}>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    variant="outlined"
                                                    value={row.quantity}
                                                    onChange={(e) => handleChange(e, row.id, 'quantity')}
                                                />
                                            </TableCell>
                                            <TableCell sx={{minWidth: 100}}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    value={row.size}
                                                    disabled
                                                // onChange={(e) => handleChange(e, row.id, 'city')}
                                                />
                                            </TableCell>
                                            <TableCell sx={{minWidth: 120}}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    value={row.price ? fCurrency(row.price) : ''}
                                                    disabled
                                                // onChange={(e) => handleChange(e, row.id, 'country')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="text" onClick={() => handleDeleteRow(row.id)}>
                                                    <AiOutlineDelete size={24} color="red" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button variant="contained" color="primary" onClick={handleAddRow} sx={{ marginTop: 1 }}>
                                Thêm hàng mới
                            </Button>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: 2 }}>
                                    Nhập vào kho
                                </Button>
                                <Button variant="contained" color="warning" sx={{ marginTop: 2 }} onClick={handleCancel}>
                                    Hủy nhập
                                </Button>
                            </Box>
                        </TableContainer>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductInventory;