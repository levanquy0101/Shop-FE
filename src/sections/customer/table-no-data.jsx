import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData() {
  return (
    <TableRow>
      <TableCell align="center" sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" >
            Không có dữ liệu nha bạn !
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
