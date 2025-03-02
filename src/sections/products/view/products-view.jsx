import { useState, useEffect } from 'react';

import { Button, Card, InputAdornment, OutlinedInput, Pagination, Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';

import { Link } from 'react-router-dom';
import * as ProductSizesColorsService from 'src/services/api/ProductSizesColorsService';



// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [productSizesColors, setProductSizesColors] = useState([]);

  useEffect(() => {
    getAllProductSizesColors()
  }, []);

  const getAllProductSizesColors = async () => {
    const response = await ProductSizesColorsService.getAll();
    setProductSizesColors(response.content);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sản phẩm kho</Typography>

        <Button variant="contained" color="inherit" component={Link} to="/dashboard/product/create" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm mới
        </Button>
      </Stack>
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          // flexWrap="wrap-reverse"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Toolbar sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
          }} >
            <OutlinedInput
              placeholder="Tìm kiếm sản phẩm ..."
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
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilters
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />

            <ProductSort />
          </Stack>
        </Stack>

        <Grid container spacing={3} p={2}>
          {productSizesColors?.map((productSizeColor) => (
            <Grid key={productSizeColor.id} item xs={6} sm={4} md={3} lg={2.4} xl={2}>
              <ProductCard productSizeColor={productSizeColor} />
              {/* {console.log(productSizeColor)} */}
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ mt: 2 ,p:2}}>
                <Pagination
                    count={5}
                    page={2}
                    // onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
        </Stack>
      </Card>

    </Container>
  );
}
