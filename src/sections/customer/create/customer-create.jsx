import { Stack, Button, Container, Typography, Card, Box, IconButton, TextField, CardContent, Grid, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from'react-hook-form';
import { useState, useEffect } from "react";
import { FaCameraRetro } from "react-icons/fa";
import {toast} from "react-toastify";
import * as CustomerService from '../../../services/api/CustomerService'
import { NameApp } from 'src/data';
// import Iconify from "src/components/iconify";

function CustomerCreate() {
    document.title = `Thêm mới khách hàng | ${NameApp}`

    const [image, setImage] = useState(null);
    const [codeAuto, setCodeAuto] = useState("");
    const { register, handleSubmit, reset ,formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        getCodeCustomerAuto()

    }, []);

    const getCodeCustomerAuto = async () => {
        const response = await CustomerService.getCodeAuto();
        console.log(response);
        setCodeAuto(response)
    }


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const onSubmit = async (data) => {
        try {
            data.avatarUrl = image;
            data.code = codeAuto;
            await CustomerService.createCustomer(data)
            console.log(data);
            navigate("/dashboard/customers");
            // reset();
            toast.success("Thêm mới khách hàng thành công")
        } catch (e) {
            toast.error("Thêm mới khách hàng thất bại")
            console.log(e)
            return;
        }
    };
    return (
        <Container>
            <Typography variant="h4">Thêm mới khách hàng</Typography>
            <Grid container fullWidth spacing={2} >
                <Grid item xs={12} sm={4}>
                <Card sx={{ p: 4, mt: 4 }}>
                        <Box sx={{
                            maxWidth: "240px",
                            width: 1,
                            aspectRatio : "1/1",
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: "auto",
                            border: '2px solid #ccc',
                        }}>
                            {image ? (
                                <img
                                    src={image}
                                    alt="Avatar"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <>
                                    <FaCameraRetro size={28}/>
                                    <Typography variant="p" color="text.secondary" mt={1}>
                                        Thêm ảnh
                                    </Typography>
                                </>
                            )}
                            <input
                                accept="image/*"
                                type="file"
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: "50%",
                                    cursor: 'pointer',
                                }}
                                onChange={handleImageChange}
                            />
                        </Box>
                        <Box >
                            <Typography variant="body1" color="text.secondary" mt={4} align="center">
                                Thêm ảnh đại diện (<small>Không bắt buộc</small>)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mt={1} align="center">
                                Chấp nhận *.jpeg, *.jpg, *.png, *.gif
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} >
                    <Card fullWidth sx={{ margin: 'auto', mt: 4 }}>
                        <CardContent fullWidth >
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <TextField fullWidth label="" type="hidden" {...register("avatarUrl", {})} sx={{display: "none"}} />
                                <Grid container spacing={2} fullWidth>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Mã khách hàng" {...register("code", {})} value={codeAuto} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Họ tên" {...register("name", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Ngày sinh" type="date" {...register("dob", {})} required InputLabelProps={{shrink: true, }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Địa chỉ" {...register("address", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                            <InputLabel id="gender-label">Giới tính *</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender-select"
                                                // value={gender}
                                                // onChange={handleChange}
                                                variant="outlined"
                                                label="Giới tính *"
                                                {...register("gender", {})}
                                                // displayEmpty
                                            >
                                                <MenuItem value="" disabled>Giới tính</MenuItem>
                                                <MenuItem value={0}>Nam</MenuItem>
                                                <MenuItem value={1}>Nữ</MenuItem>
                                                <MenuItem value={2}>Khác</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Số điện thoại" {...register("phone", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Email" {...register("email", {})} required />
                                    </Grid>
                                </Grid>
                                <Box sx={{display: "flex",gap: "10px"}}>
                                    <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: 2 }}>
                                        Thêm khách hàng
                                    </Button>
                                    <Button type="submit" variant="contained" component={Link} to="/dashboard/customers" color="warning" sx={{ marginTop: 2 }}>
                                        Hủy thêm
                                    </Button>
                                </Box>
                            </form>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>


        </Container>
    );
}

export default CustomerCreate