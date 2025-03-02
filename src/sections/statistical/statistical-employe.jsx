import { Paper, Stack, Table,Button, TableRow, Container, TableBody, TableCell, TableHead,TextField, Typography , ToggleButton, ToggleButtonGroup } from '@mui/material';


function StatisticalEmployee(props) {
    const datas = [
        { id: 1, codeName: 'H-001', name: "Áo sơ mi Nam", number: 3, totalPrice: 100 },
        { id: 2, codeName: 'H-002', name: "Váy nữ", number: 4, totalPrice: 20000 },
        { id: 3, codeName: 'H-003', name: "Quần bò nam", number: 9, totalPrice: 10100 },
        { id: 3, codeName: 'H-004', name: "Quần tây nam", number: 1, totalPrice: 48480 },
    ];

    return (
        <Container>
            <Typography variant="h4">Tạo thống kê</Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <ToggleButtonGroup
                >
                    <ToggleButton value="left">
                        Theo ngày
                    </ToggleButton>
                    <ToggleButton value="center">
                        Theo tháng
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ maxWidth: 600, mt: 2 }}>
                <Typography variant="p" sx={{ marginRight: 6 }}>Ngày/tháng/năm: </Typography>
                <TextField type='month' fullWidth />
            </Stack>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã hàng</TableCell>
                            <TableCell>Tên hàng</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Tổng tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{row.codeName}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.number}</TableCell>
                                <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ maxWidth: "100%", mt: 2 }}>
                <Typography variant="p" sx={{ marginRight: 2 }}>Tổng&nbsp;thu: </Typography>
                <TextField label="" variant="outlined" fullWidth disabled />
                <Typography variant="p" sx={{ marginRight: 2, marginLeft: 6 }}>Tổng&nbsp;chi: </Typography>
                <TextField label="" variant="outlined" fullWidth disabled />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" mb={5} sx={{ gap: "20px" }}>
                <Button type="submit" size="large" variant="contained" color="success" >
                    In thống kê
                </Button>
            </Stack>
        </Container>
    );
}

export default StatisticalEmployee;