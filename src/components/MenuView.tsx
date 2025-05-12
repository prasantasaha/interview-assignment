import { Box, Typography, Button } from "@mui/material";
import { type ViewType } from "../constants";
import { Stack } from "@mui/system";
import UserMessage from "./UserMessage";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import Print from "@mui/icons-material/Print";
import AttachMoney from "@mui/icons-material/AttachMoney";

const MenuView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const handleQuit = () => {
    setView("quit");
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        What would you like to do?
      </Typography>

      <Stack sx={{ rowGap: 1 }}>
        <Button fullWidth variant="contained" onClick={() => setView("deposit")} startIcon={<AttachMoney />}>
          Deposit
        </Button>
        <Button fullWidth variant="contained" onClick={() => setView("withdraw")} startIcon={<AccountBalanceWallet />}>
          Withdraw
        </Button>
        <Button fullWidth variant="contained" onClick={() => setView("statement")} startIcon={<Print />}>
          Print Statement
        </Button>

        <UserMessage />
        <Button fullWidth variant="outlined" onClick={handleQuit}>
          Quit
        </Button>
      </Stack>
    </Box>
  );
};

export default MenuView;
