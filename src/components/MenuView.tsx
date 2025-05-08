import { Box, Typography, Button } from "@mui/material";
import { type ViewType } from "../constants";
import { useUserMessage } from "./UserMessageContext";
import { Stack } from "@mui/system";
import UserMessage from "./UserMessage";

const MenuView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const { setMessage } = useUserMessage();

  const handleQuit = () => {
    setMessage("Thank you for banking with AwesomeGIC Bank.\nHave a nice day!");
    setView("quit");
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        What would you like to do?
      </Typography>

      <Stack sx={{ rowGap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setView("deposit")}
        >
          Deposit
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setView("withdraw")}
        >
          Withdraw
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setView("statement")}
        >
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
