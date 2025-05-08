import { Button } from "@mui/material";
import type { ViewType } from "../constants";
import UserMessage from "./UserMessage";
import { Stack } from "@mui/system";
import { useUserMessage } from "./UserMessageContext";

const QuitView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const { setMessage } = useUserMessage();
  const handleBackToHome = () => {
    setMessage("");
    setView("menu");
  };

  return (
    <Stack sx={{ mt: 2, rowGap: 2 }}>
      <UserMessage />
      <Button variant="outlined" fullWidth onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Stack>
  );
};

export default QuitView;
