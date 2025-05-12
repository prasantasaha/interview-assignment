import { useUserMessage } from "./UserMessageContext";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

const UserMessage = () => {
  const {
    userMessage: { message, severity },
  } = useUserMessage();

  if (!message) {
    return null;
  }

  const getIcon = () => {
    switch (severity) {
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return <CheckIcon />;
    }
  };

  return (
    <Alert severity={severity} icon={getIcon()} sx={{ fontSize: "1.2rem", mb: 2, mt: 2 }}>
      {message}
    </Alert>
  );
};

export default UserMessage;
