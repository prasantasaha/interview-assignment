import { useUserMessage } from "./UserMessageContext";
import { Typography } from "@mui/material";

const UserMessage = () => {
  const { message } = useUserMessage();
  return (
    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
      {message}
    </Typography>
  );
};

export default UserMessage;
