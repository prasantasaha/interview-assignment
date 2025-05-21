import { useCallback, useState, type FormEvent } from "react";
import { debounce, Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useUserMessage } from "./UserMessageContext";
import { useBankContext } from "./BankContext";
import { useTheme } from "@mui/material/styles";
import ConfirmationDialog from "./ConfirmationDialog";
import type { TransactionViewType, ViewType } from "../types";

const TransactionView = ({ view, setView }: { view: TransactionViewType; setView: (v: ViewType) => void }) => {
  const theme = useTheme();
  const { addTransaction, balance } = useBankContext();
  const { setUserMessage } = useUserMessage();
  const [amount, setAmount] = useState("");
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const isValidAmount = () => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const num = parseFloat(amount);
      const result = addTransaction(num, view);
      if (result) {
        setUserMessage({
          message: `Thank you. $${num.toFixed(2)} has been ${view === "deposit" ? "deposited to" : "withdrawn from"} your account.`,
          severity: "success",
        });
        setView("menu");
      }
      // TODO: Handle error cases
      // setUserMessage({ message: "Insufficient balance. You only have $50.00 available.", severity: "error" });
    },
    [addTransaction, amount, setUserMessage, setView, view]
  );

  const handleCancelClick = useCallback(() => {
    if (amount.trim()) {
      setCancelConfirmOpen(true);
    } else {
      setView("menu");
    }
    setUserMessage({ message: "" });
  }, [amount, setView, setUserMessage]);

  const navigateToMenu = useCallback(() => {
    setAmount("");
    setCancelConfirmOpen(false);
    setView("menu");
  }, [setView]);

  return (
    <Box mt={2} sx={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: theme.palette.text.primary }}>
        Current Balance: ${balance.toFixed(2)}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
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
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: view === "deposit" ? theme.palette.success.main : theme.palette.info.main }}
          disabled={!isValidAmount() || (view === "withdraw" && parseFloat(amount) > balance)}
        >
          Submit
        </Button>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 1, color: theme.palette.error.main, borderColor: theme.palette.error.main }}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>

      <ConfirmationDialog
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        onConfirm={navigateToMenu}
        message="Are you sure you want to cancel this transaction? Any entered amount will be discarded."
        title="Cancel Transaction"
      />
    </Box>
  );
};

export default TransactionView;
