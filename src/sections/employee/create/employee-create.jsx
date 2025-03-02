import { Stack, Button, Container, Typography, Card, Box, IconButton, TextField, CardContent, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import * as RoleService from '../../../services/api/RoleService'
import * as UserService from '../../../services/api/UserService'
import { NameApp } from 'src/data';
import { UploadOneImage } from "src/firebase/UploadImage";

function EmployeeCreate() {
    document.title = `Thêm mới nhân viên | ${NameApp}`
    const [roles, setRoles] = useState([]);
    const [codeAuto, setCodeAuto] = useState("");
    const [disabled,setDisabled]= useState(true);
    const [image, setImage] = useState(null);
    const { register, handleSubmit, setValue ,reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        getRoleNotIn()
    }, []);


    const getRoleNotIn = async () => {
        const response = await UserService.getCodeAutoAndRoles()
        console.log(response);
        setCodeAuto(response.codeAuto)
        setRoles(response.roles)
    }

    const onSubmit = async (data) => {
        try {
            data.code = codeAuto;
            data.role = JSON.parse(data.role)
            await UserService.createEmployee(data)
            console.log(data);
            navigate("/dashboard/employees")
            reset();
            toast.success("Thêm mới nhân viên thành công")
        } catch (e) {
            toast.error("Thêm mới nhân viên thất bại")
            console.log(e)
            return;
        }
    };

    const handleOneImageUrlChange = async (url, fieldName) => {
        setImage(url)
        setValue(fieldName, url);
    }

    return (
        <Container>
            <Typography variant="h4">Thêm mới nhân viên</Typography>
            <Grid container fullWidth spacing={2} >
                <Grid item xs={12} sm={4}>
                    <Card sx={{ p: 4, mt: 4 }}>
                        <Box sx={{
                            position: "relative",
                            maxWidth: "240px",
                            width: 1,
                            aspectRatio: "1/1",
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
                                    <FaCameraRetro size={28} />
                                    <Typography variant="p" color="text.secondary" mt={1}>
                                        Thêm ảnh
                                    </Typography>
                                </>
                            )}
                            <UploadOneImage
                                className={"imgOneUpload"}
                                getDisabled={(e) => setDisabled(e)}
                                onImageUrlChange={(url) => handleOneImageUrlChange(url, "avatarUrl")} />
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2} fullWidth>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Mã nhân viên" {...register("code", {})} value={codeAuto} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Họ tên" {...register("name", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Ngày sinh" {...register("dob", {})} type="date" required InputLabelProps={{ shrink: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Địa chỉ" {...register("address", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Tên người dùng" {...register("username", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="gender-label" >Giới tính *</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender-select"
                                                variant="outlined"
                                                label="Giới tính *"
                                                {...register("gender", {})}
                                                required
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
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="role-label">Phân quyền *</InputLabel>
                                            <Select
                                                labelId="role-label"
                                                id="role-select"
                                                // value={role}
                                                // onChange={handleChange}
                                                variant="outlined"
                                                label="Phân quyền *"
                                                {...register("role", {})}
                                                required
                                            // displayEmpty
                                            >
                                                <MenuItem value="" disabled>Phân quyền</MenuItem>

                                                {
                                                    roles.map((role) => (
                                                        <MenuItem key={role.id} value={JSON.stringify(role)}>
                                                            {role.id == 3 ? "Nhân viên bán hàng" : role.id == 4 ? "Nhân viên quản kho" : ""}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Mật khẩu" {...register("password", {})} required />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: "flex", gap: "10px" }}>
                                    <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: 2 }}>
                                        Thêm nhân viên
                                    </Button>
                                    <Button type="button" variant="contained" component={Link} to="/dashboard/employees" color="warning" sx={{ marginTop: 2 }} >
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

export default EmployeeCreate;