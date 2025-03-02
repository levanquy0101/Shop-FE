import { Card,Radio, Button, Container,TextField, RadioGroup,Typography, CardContent, FormControlLabel } from '@mui/material';

function NotificationView(props) {
    const currentDate = new Date().toISOString().split('T')[0];
    return (
        <Container>
            <Typography variant="h4">Đăng thông báo</Typography>
            <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 2 }} >
                <CardContent >
                    <form style={{ maxWidth: "500px", margin: "auto" }}>
                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            margin="normal"
                            label="Ngày đăng"
                            value={currentDate}
                            required
                            InputLabelProps={{ shrink: true }}

                        />
                        <TextField
                            fullWidth
                            label="Topic"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Nội dung"
                            variant="outlined"
                            multiline
                            rows={5}
                            margin="normal"
                            required
                        />
                        <RadioGroup
                            aria-label="options"
                            name="options"
                            // value={selectedValue}
                            // onChange={handleChange}
                        >
                            <FormControlLabel value="option1" control={<Radio />} label="Tất cả" />
                            <FormControlLabel value="option2" control={<Radio />} label="Quản kho" />
                            <FormControlLabel value="option3" control={<Radio />} label="Nhân viên bán hàng" />
                        </RadioGroup>
                        <Button type="submit" size="large" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                            Đăng thông báo
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </Container>
    );
}

export default NotificationView;