import { Card, Stack, Button, Container, Typography } from "@mui/material";
// import Iconify from "src/components/iconify";
import {useState, useEffect } from "react";
import * as BackupRecovery from '../../services/api/BackupRecoveryService'
import { toast } from "react-toastify";
import ModalSimple from "src/ui/ModalSimple";

function BackupRecoveryView(props) {
    const [open, setOpen] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    useEffect(() => {
        
    }, []);

    const handleResetSystem = async () => {
        await BackupRecovery.resetSystem();
        closeModal();
        toast.success("Khôi phục cài đặt gốc thành công !");
    }

    return (
        <Container>
            <Typography variant="h4">Sao lưu & Khôi phục</Typography>
            <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="center" gap={8} mt={12} mb={5}>
                    <Button variant="contained" color="inherit" >
                        Sao lưu
                    </Button>
                    <Button variant="contained" color="inherit" >
                        Khôi phục
                    </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
                    <Button variant="contained" color="warning" onClick={openModal}>
                        Khôi phục cài đặt gốc
                    </Button>
                </Stack>
            </Card>
            <ModalSimple isOpen={isModalOpen} onClose={closeModal} title={"Khôi phục cài đặt gốc"} content="Toàn bộ dữ liệu xóa bị xóa hết, bạn thật sự muốn khôi phục cài đặt gốc !" submit={handleResetSystem}  />
        </Container>
    );
}

export default BackupRecoveryView;