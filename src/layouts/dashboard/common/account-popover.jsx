import { useState } from 'react';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Trang chủ',
    icon: 'eva:home-fill',
  },
  {
    label: 'Trang cá nhân',
    icon: 'eva:person-fill',
  },
  {
    label: 'Cài đặt',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogOut = () => {
    setOpen(null);
    localStorage.removeItem('user');
    navigate("/login");
    toast.success('Đăng xuất thành công!');
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
