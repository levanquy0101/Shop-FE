import { Button, Card, CardContent, Container, Grid, TextField } from "@mui/material";

function Payment(props) {
    return (
        <Container>
            <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 2 }} >
                <CardContent >
                    <form>
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            margin="normal"
                            label="Mã hóa đơn"
                            required
                            sx={{maxWidth: 500, display: "block"}}
                        // InputLabelProps={{ shrink: true }}

                        />
                        <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            margin="normal"
                            label="Mã khách hàng"
                            required
                            sx={{maxWidth: 500, display: "block"}}
                        // InputLabelProps={{ shrink: true }}

                        />
                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            margin="normal"
                            label="Ngày thanh toán"
                            required
                            sx={{maxWidth: 500, display: "block"}}
                            InputLabelProps={{ shrink: true }}

                        />
                        <Grid container spacing={2} direction="row" alignItems="center">
                            <Grid item >
                                <TextField
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    label="Mã hàng"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    label="Số lượng"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    // sx={{ marginTop: 2 }}
                                    >
                                    Nhập
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Payment;