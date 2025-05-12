import { type FC } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm, message }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: theme.palette.text.primary }}>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: theme.palette.text.secondary }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.info.main }}>
          No
        </Button>
        <Button onClick={onConfirm} autoFocus sx={{ color: theme.palette.error.main }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
