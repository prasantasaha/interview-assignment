import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  debounce,
  InputAdornment,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useUserMessage } from "./UserMessageContext";
import { useBankContext } from "./BankContext";
import { useTheme } from "@mui/material/styles";
import type { TransactionViewType, ViewType } from "../constants";

const TransactionView = ({ view, setView }: { view: TransactionViewType; setView: (v: ViewType) => void }) => {
  const theme = useTheme();
  const { addTransaction, balance } = useBankContext();
  const { setMessage } = useUserMessage();
  const [amount, setAmount] = useState("");
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const isValidAmount = () => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleSubmit = () => {
    const num = parseFloat(amount);
    const result = addTransaction(num, view);
    if (result) {
      setMessage(`Thank you. $${num.toFixed(2)} has been ${view === "deposit" ? "deposited to" : "withdrawn from"} your account.`);
      setView("menu");
    }
  };

  const handleCancelClick = () => {
    if (amount.trim()) {
      setCancelConfirmOpen(true);
    } else {
      setView("menu");
    }
  };

  const navigateToMenu = () => {
    setAmount("");
    setCancelConfirmOpen(false);
    setView("menu");
  };

  return (
    <Box mt={2} sx={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: theme.palette.text.primary }}>
        Current Balance: ${balance.toFixed(2)}
      </Typography>
      <TextField
        fullWidth
        label={`Please enter amount to ${view}:`}
        placeholder="Enter amount"
        defaultValue={amount}
        onChange={debounce((event) => setAmount(event.target.value), 100)}
        type="number"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mt: 2, borderColor: theme.palette.divider }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: view === "deposit" ? theme.palette.success.main : theme.palette.info.main }}
        onClick={handleSubmit}
        disabled={!isValidAmount() || (view === "withdraw" && parseFloat(amount) > balance)}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 1, color: theme.palette.error.main, borderColor: theme.palette.error.main }}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>

      <Dialog open={cancelConfirmOpen} onClose={() => setCancelConfirmOpen(false)}>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Cancel Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            Are you sure you want to cancel this transaction? Any entered amount will be discarded.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmOpen(false)} sx={{ color: theme.palette.info.main }}>
            No
          </Button>
          <Button
            onClick={() => {
              setCancelConfirmOpen(false);
              navigateToMenu();
            }}
            autoFocus
            sx={{ color: theme.palette.error.main }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionView;
