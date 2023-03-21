import { Box, Typography, ButtonGroup, Button, Modal } from "@mui/material";

const ConfirmModal = ({ isOpen, title, onClose, onConfirm }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Are you sure you want to delete
          <span style={{ color: "red" }}> {title} </span>?
        </Typography>
        <Box display='flex' justifyContent='center' marginTop='3rem'>
          <ButtonGroup variant='contained' aria-label='outlined primary button group'>
            <Button variant='outlined' onClick={onClose}>
              cancel
            </Button>
            <Button onClick={onConfirm}>confirm</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
