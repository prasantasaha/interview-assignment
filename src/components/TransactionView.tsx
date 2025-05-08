import { useState, useCallback } from "react";

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
} from "@mui/material";
import { useUserMessage } from "./UserMessageContext";
import { useBankContext } from "./BankContext";
import type { TransactionViewType, ViewType } from "../constants";

const TransactionView = ({
  view,
  setView,
}: {
  view: TransactionViewType;
  setView: (v: ViewType) => void;
}) => {
  const { addTransaction, balance } = useBankContext();
  const { setMessage } = useUserMessage();
  const [amount, setAmount] = useState("");
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const handleAmountChange = useCallback(
    debounce((value: string) => setAmount(value), 100),
    [],
  );

  const isValidAmount = () => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!isValidAmount()) {
      setMessage("Please enter a valid amount.");
      return;
    }
    if (view === "withdraw" && num > balance) {
      setMessage(
        `Insufficient balance. You only have $${balance.toFixed(2)} available.`,
      );
      return;
    }
    const result = addTransaction(num, view);
    if (result) {
      setMessage(
        `Thank you. $${num.toFixed(2)} has been ${
          view === "deposit" ? "deposited to" : "withdrawn from"
        } your account.`,
      );
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
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Current Balance: ${balance.toFixed(2)}
      </Typography>
      <TextField
        fullWidth
        label={`Please enter amount to ${view}:`}
        defaultValue={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        type="number"
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={
          !isValidAmount() ||
          (view === "withdraw" && parseFloat(amount) > balance)
        }
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>

      <Dialog
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
      >
        <DialogTitle>Cancel Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have entered an amount. Are you sure you want to cancel and
            discard your input?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmOpen(false)}>No</Button>
          <Button
            onClick={() => {
              setCancelConfirmOpen(false);
              navigateToMenu();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionView;
