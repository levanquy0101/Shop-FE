import { Stack, Button, Container, Typography, Card, Box, IconButton, TextField, CardContent, Grid, InputLabel, Select, MenuItem, FormControl, FormControlLabel, FormGroup, Checkbox, ListItemText } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import * as ProductSizesColorsService from '../../../services/api/ProductSizesColorsService'
import * as ProductService from '../../../services/api/ProductService'
import * as ColorService from '../../../services/api/ColorService'
import * as SizeService from '../../../services/api/SizeService'
import { NameApp } from 'src/data';
import { useUploadImage } from "src/firebase";

function ProductCreate() {
    document.title = `Thêm mới sản phẩm | ${NameApp}`

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [image, setImage] = useState(null);
    const [imagesByColor, setImagesByColor] = useState({});
    const [codeAuto, setCodeAuto] = useState("");
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const { uploadImage, uploading, error } = useUploadImage();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        getCodeProductAuto();
        getAllColor();
        getAllSizes();
    }, []);

    const getAllColor = async () => {
        const response = await ColorService.getAll();
        setColors(response);
    };

    const getAllSizes = async () => {
        const response = await SizeService.getAll();
        setSizes(response);
    };

    const getCodeProductAuto = async () => {
        const response = await ProductService.getCodeAuto();
        setCodeAuto(response);
    };

    const handleChangeColor = (event) => {
        setSelectedOptions(event.target.value);
    };

    const handleImageColorChange = async (colorId, event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const uploadedImageUrls = [];

            for (const file of filesArray) {
                await new Promise((resolve) => {
                    uploadImage(file, (url) => {
                        uploadedImageUrls.push(url);
                        resolve();
                    });
                });
            }

            setImagesByColor(prevImages => ({
                ...prevImages,
                [colorId]: uploadedImageUrls
            }));
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleRemoveImage = (colorId, imgSrc) => {
        setImagesByColor(prevImages => ({
            ...prevImages,
            [colorId]: prevImages[colorId].filter(img => img !== imgSrc)
        }));
    };

    const onSubmit = async (data) => {
        try {
            const selectedSizes = sizes.filter(size => data.sizes[size.id]).map(size => ({
                id: size.id,
                name: size.name,
                sizeType: size.sizeType
            }));
            data.product.imgCoverUrl = image;
            data.product.code = codeAuto;
            data.sizes = selectedSizes;
            const productImageColors = data.productImageColors.map(item => {
                const color = JSON.parse(item);
                return {
                    color: color,
                    productImages: imagesByColor[color.id].map((url, index) => ({
                        urlName: url
                    }))
                };
            });
            data.productImageColors = productImageColors;
            console.log(data);
            await ProductSizesColorsService.create(data);
            reset();
            navigate("/dashboard/products");
            toast.success("Thêm mới sản phẩm thành công");
        } catch (e) {
            toast.error("Thêm mới sản phẩm thất bại");
            console.log(e);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Thêm mới sản phẩm</Typography>
            <Grid container fullWidth spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ p: 4, mt: 4 }}>
                        <Box sx={{
                            maxWidth: "240px",
                            width: 1,
                            aspectRatio: "4/5",
                            borderRadius: '8px',
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
                                        borderRadius: "8px",
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
                            <input
                                accept="image/*"
                                type="file"
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    width: '240px',
                                    height: '240px',
                                    cursor: 'pointer',
                                }}
                                onChange={handleImageChange}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary" mt={4} align="center">
                                Thêm ảnh bìa sản phẩm (<small>Bắt buộc</small>)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mt={1} align="center">
                                Chấp nhận *.jpeg, *.jpg, *.png, *.gif
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Card fullWidth sx={{ margin: 'auto', mt: 4 }}>
                        <CardContent fullWidth>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField fullWidth label="" type="hidden" {...register("product.imgCoverUrl", {})} sx={{ display: "none" }} />
                                <Grid container spacing={2} fullWidth>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Mã sản phẩm" {...register("product.code", {})} value={codeAuto} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Tên sản phẩm" {...register("product.name", {})} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {sizes.map((size) => (
                                                <FormControlLabel
                                                    key={size.id}
                                                    sx={{ width: '44%' }}
                                                    control={
                                                        <Checkbox
                                                            {...register(`sizes.${size?.id}`)}
                                                            value={JSON.stringify(size)}
                                                        />
                                                    }
                                                    label={size.name}
                                                />
                                            ))}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="checkbox-dropdown-label">Màu sắc *</InputLabel>
                                            <Select
                                                {...register('productImageColors', { required: 'Vui lòng chọn ít nhất một màu sắc' })}
                                                labelId="checkbox-dropdown-label"
                                                id="checkbox-dropdown"
                                                multiple
                                                label="Màu sắc*"
                                                value={selectedOptions}
                                                onChange={handleChangeColor}
                                                error={!!errors.colors}
                                                helperText={errors.colors && errors.colors.message}
                                                renderValue={(selectedOptions) => (
                                                    selectedOptions.map(option => JSON.parse(option).name).join(', ')
                                                )}
                                            >
                                                {colors.map((item) => (
                                                    <MenuItem key={item.id} value={JSON.stringify(item)} sx={{ position: "relative" }}>
                                                        <ListItemText primary={item.name} />
                                                        {selectedOptions.includes(JSON.stringify(item)) && (
                                                            <Box sx={{
                                                                position: "absolute",
                                                                right: 10,
                                                                padding: "4px 0",
                                                                maxWidth: "44px",
                                                                height: "80%",
                                                                marginTop: "auto",
                                                                borderRadius: '8px',
                                                                backgroundColor: '#f0f0f0',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                margin: "auto",
                                                                border: '2px solid #ccc',
                                                            }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <FaCameraRetro size={28} />
                                                                <input
                                                                    accept="image/*"
                                                                    multiple
                                                                    type="file"
                                                                    style={{
                                                                        opacity: 0,
                                                                        position: 'absolute',
                                                                        cursor: 'pointer',
                                                                        inset: "0",
                                                                    }}
                                                                    onChange={(event) => handleImageColorChange(item.id, event)}
                                                                />
                                                                {/* <UploadOneImage
                                                                    className={"input-img"}
                                                                    getDisabled={(e) => setDisabled(e)}
                                                                    onImageUrlChange={(url) => handleOneImageUrlChange(url, "newsImgUrl")} /> */}
                                                            </Box>
                                                        )}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Giá: ( VND )" {...register("product.price", {})} required />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: "flex", gap: "10px" }}>
                                    <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: 2 }}>
                                        Thêm sản phẩm
                                    </Button>
                                    <Button type="submit" variant="contained" component={Link} to="/dashboard/products" color="warning" sx={{ marginTop: 2 }}>
                                        Hủy thêm
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* Hiển thị ảnh theo màu sắc đã chọn */}
            <Box sx={{ mt: 4 }}>
                {selectedOptions.map(option => {
                    const colorId = JSON.parse(option).id;
                    const images = imagesByColor[colorId] || [];

                    return (
                        <Box key={colorId} sx={{ mb: 4 }}>
                            <Typography variant="h6">Màu {JSON.parse(option).name}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {images.map((imgSrc, index) => (
                                    <Box key={index} sx={{ position: 'relative', margin: 1 }}>
                                        <img
                                            src={imgSrc}
                                            alt={`Color ${colorId}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <IconButton
                                            sx={{ position: 'absolute', top: 4, right: 4, color: 'red' }}
                                            onClick={() => handleRemoveImage(colorId, imgSrc)}
                                        >
                                            <MdDeleteOutline />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
}

export default ProductCreate;
