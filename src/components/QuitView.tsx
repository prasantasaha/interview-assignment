import { Button, Typography } from "@mui/material";
import type { ViewType } from "../constants";
import { Stack } from "@mui/system";

const QuitView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const handleBackToHome = () => {
    setView("menu");
  };

  return (
    <Stack sx={{ mt: 2, rowGap: 2 }}>
      <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
        Thank you for banking with AwesomeGIC Bank.
        <br />
        Have a nice day!
      </Typography>
      <Button variant="outlined" fullWidth onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Stack>
  );
};

export default QuitView;
