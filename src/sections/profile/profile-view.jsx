import { useState, useEffect } from "react";
import Moment from "moment";
import { Card, Grid, Stack, Button, Avatar, Container, TextField, Typography, CardContent, InputAdornment, IconButton } from "@mui/material";
import { useForm } from 'react-hook-form';

import * as UserService from '../../services/api/UserService';
import { account } from 'src/_mock/account';
import { toast } from "react-toastify";
import Iconify from "src/components/iconify";
import { NameApp } from 'src/data';

function ProfileView(props) {

    const [user, setUser] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        const response = await UserService.getProfile(account?.username)
        const name = response?.name;
        document.title = `${name} | ${NameApp}`
        setUser(response)
    }

    const onSubmit = async (data) => {
        try {
            await UserService.changePassWord(user?.id, data);
            console.log(data);
            reset();
            toast.success("Sửa mật khẩu thành công")
        } catch (e) {
            toast.error("Sửa mật khẩu thất bại")
            console.log(e)
            return;
        }
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Thông tin cá nhân</Typography>
            </Stack>
            <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 2 }}>
                <CardContent>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            <Avatar sx={{ width: 240, height: 240, fontSize: '4rem' }} src={user?.avatarUrl}>
                                {user && user.name ? user.name[0] : ''}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" sx={{ marginBottom: 1 }}>{user?.name} </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Mã người dùng: </b>{user?.code}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Vị trí: </b>{user?.role?.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Ngày sinh: </b> {user?.dob ? Moment(user.dob).format('DD/MM/YYYY') : ''}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Giới tính: </b>{user?.gender === 0 ? "Nam" : user?.gender === 1 ? "Nữ" : "Khác"}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Email: </b>{user?.email}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Địa chỉ: </b>{user?.address}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                <b>Số điện thoại: </b>{user?.phone}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 4 }}>
                <CardContent >
                    <Typography variant="h5" align="left" gutterBottom>
                        Thay đổi mật khẩu
                    </Typography>
                    <form style={{ maxWidth: "500px" }} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label="Mật khẩu cũ"
                            variant="outlined"
                            margin="normal"
                            required
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                            {...register("oldPassword", {})}

                        />
                        <TextField
                            fullWidth
                            label="Mật khẩu mới"
                            variant="outlined"
                            margin="normal"
                            required
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("newPassword", {})}
                        />
                        <TextField
                            fullWidth
                            label="Nhập lại mật khẩu mới"
                            variant="outlined"
                            margin="normal"
                            required
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("confirmPassword", {})}
                        />
                        <Button type="submit" size="large" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                            Đổi mật khẩu
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </Container>
    );
}

export default ProfileView;