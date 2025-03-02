import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShopProductCard({ productSizeColor }) {
  const renderStatus = (
    <Label
      variant="filled"
      // color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {/* {product.status} */}
    </Label>
  );
  const selectedImage = productSizeColor.productImageColor.productImages[0];
  const renderImg = (
    <Box
      component="img"
      alt={selectedImage?.name || productSizeColor.product?.name}
      src={selectedImage?.urlName || productSizeColor.product?.imgCoverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        // background: productSizeColor.productImageColor.color.hexCode,
        // aspectRatio: "4/5",
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );
  const renderPrice = (
    <Typography variant="body2" sx={{color: "red"}}>
      <Typography
        component="span"
        variant="body2"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {productSizeColor.product.price && fCurrency(productSizeColor.product.price)} */}
      </Typography>
      {fCurrency(productSizeColor.product.price)}&nbsp;VND
    </Typography>
  );

  const renderCode = (
    <Typography
      component="span"
      variant="body2"
    >
      Mã: {productSizeColor.code}
    </Typography>
  )

  const quantity = (
    <Typography variant="body2" sx={{marginRight: 1}}>
      <Badge badgeContent={productSizeColor.quantity ? productSizeColor.quantity : "0"} color="secondary"></Badge>
    </Typography>
  );


  return (
    <Card sx={{ borderRadius: 1 }}>
      <Box sx={{ pt: '100%', position: 'relative', aspectRatio: "4/5" }}>
        {/* {product.status && renderStatus} */}

        {renderImg}
      </Box>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {productSizeColor.product?.name}
          &nbsp;
          {productSizeColor.sizes?.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
          {quantity}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderCode}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
